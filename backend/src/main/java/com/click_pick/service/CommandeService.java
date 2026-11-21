package com.click_pick.service;

import com.click_pick.dto.CommandeRequest;
import com.click_pick.dto.CommandeResponse;
import com.click_pick.entity.Commande;
import com.click_pick.entity.Creneau;
import com.click_pick.entity.LigneCommande;
import com.click_pick.entity.Produit;
import com.click_pick.entity.Restaurant;
import com.click_pick.entity.StatutCommande;
import com.click_pick.exception.ApiException;
import com.click_pick.repository.CommandeRepository;
import com.click_pick.repository.CreneauRepository;
import com.click_pick.repository.ProduitRepository;
import com.click_pick.repository.RestaurantRepository;
import com.click_pick.repository.UtilisateurRepository;
import com.click_pick.security.AuthUser;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.math.BigDecimal;
import java.time.Clock;
import java.time.LocalDate;
import java.time.LocalDateTime;
import java.time.temporal.ChronoUnit;
import java.util.LinkedHashMap;
import java.util.List;
import java.util.Map;
import java.util.function.Function;
import java.util.stream.Collectors;

/** Validation d'une commande par le client (US08) et liste des commandes du restaurateur (US09). */
@Service
public class CommandeService {

    private static final int QUANTITE_MAX = 99;

    private final CommandeRepository commandes;
    private final RestaurantRepository restaurants;
    private final ProduitRepository produits;
    private final CreneauRepository creneaux;
    private final UtilisateurRepository utilisateurs;
    private final Clock clock;

    public CommandeService(CommandeRepository commandes, RestaurantRepository restaurants,
                           ProduitRepository produits, CreneauRepository creneaux,
                           UtilisateurRepository utilisateurs, Clock clock) {
        this.commandes = commandes;
        this.restaurants = restaurants;
        this.produits = produits;
        this.creneaux = creneaux;
        this.utilisateurs = utilisateurs;
        this.clock = clock;
    }

    /**
     * Enregistre la commande avec le statut RECUE. Tout se passe dans UNE transaction :
     * si quoi que ce soit échoue (créneau complet, plat invalide...), rien n'est enregistré
     * et aucune place n'est décomptée. Le paiement est simulé en V1 (US16 pour le paiement réel).
     */
    @Transactional
    public CommandeResponse creer(AuthUser client, CommandeRequest req) {
        Restaurant restaurant = restaurants.findById(req.restaurantId())
                .orElseThrow(() -> ApiException.notFound("Restaurant introuvable"));
        if (!restaurant.isOuvert()) {
            throw ApiException.conflict("Ce restaurant est actuellement fermé");
        }

        Creneau creneau = creneaux.findById(req.creneauId())
                .filter(c -> c.getRestaurantId().equals(restaurant.getId()))
                .orElseThrow(() -> ApiException.badRequest("Créneau invalide pour ce restaurant"));
        if (creneau.getDateCreneau().isBefore(LocalDate.now(clock))) {
            throw ApiException.badRequest("Ce créneau n'est plus disponible");
        }

        // Le même plat envoyé deux fois : on additionne les quantités
        Map<Long, Integer> quantites = new LinkedHashMap<>();
        for (CommandeRequest.LigneRequest l : req.lignes()) {
            quantites.merge(l.produitId(), l.quantite(), Integer::sum);
        }
        if (quantites.values().stream().anyMatch(q -> q > QUANTITE_MAX)) {
            throw ApiException.badRequest("La quantité maximale par plat est " + QUANTITE_MAX);
        }

        // Les plats viennent de la base (prix, disponibilité) : on ne fait jamais confiance au client
        Map<Long, Produit> trouves = produits.findByIdInAndRestaurantId(quantites.keySet(), restaurant.getId())
                .stream().collect(Collectors.toMap(Produit::getId, Function.identity()));
        if (trouves.size() != quantites.size()) {
            throw ApiException.badRequest("Un ou plusieurs plats n'existent pas dans ce restaurant");
        }

        Commande commande = new Commande();
        commande.setDateCommande(LocalDateTime.now(clock).truncatedTo(ChronoUnit.SECONDS));
        commande.setStatut(StatutCommande.RECUE);
        commande.setModeReception("RETRAIT");
        commande.setClient(utilisateurs.getReferenceById(client.id()));
        commande.setRestaurantId(restaurant.getId());
        commande.setCreneau(creneau);

        BigDecimal total = BigDecimal.ZERO;
        for (Map.Entry<Long, Integer> e : quantites.entrySet()) {
            Produit p = trouves.get(e.getKey());
            if (!p.isDisponible()) {
                throw ApiException.conflict("Le plat « " + p.getNom() + " » n'est plus disponible");
            }
            LigneCommande ligne = new LigneCommande();
            ligne.setProduit(p);
            ligne.setQuantite(e.getValue());
            ligne.setPrixUnitaire(p.getPrix());
            commande.addLigne(ligne);
            total = total.add(p.getPrix().multiply(BigDecimal.valueOf(e.getValue())));
        }
        commande.setMontantTotal(total);

        // En dernier, pour garder le verrou sur le créneau le moins longtemps possible
        if (creneaux.reserverPlace(creneau.getId()) == 0) {
            throw ApiException.conflict("Ce créneau est complet, veuillez en choisir un autre");
        }

        Commande enregistree = commandes.save(commande);
        return CommandeResponse.from(enregistree, restaurant.getNom(), false);
    }

    /** Commandes du restaurant du restaurateur connecté UNIQUEMENT (US09), triées par heure de retrait. */
    @Transactional(readOnly = true)
    public List<CommandeResponse> commandesDuRestaurateur(AuthUser restaurateur) {
        Restaurant restaurant = restaurants.findByRestaurateurId(restaurateur.id())
                .orElseThrow(() -> ApiException.notFound("Aucun restaurant n'est associé à ce compte"));
        return commandes.findByRestaurantOrderByRetrait(restaurant.getId()).stream()
                .map(c -> CommandeResponse.from(c, restaurant.getNom(), true))
                .toList();
    }
}
