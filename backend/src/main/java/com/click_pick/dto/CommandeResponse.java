package com.click_pick.dto;

import com.click_pick.entity.Commande;
import com.click_pick.entity.LigneCommande;

import java.math.BigDecimal;
import java.util.List;

/**
 * Commande vue par le client (confirmation, US08) ou par le restaurateur (liste, US09).
 * clientNom / clientTelephone ne sont renseignés que dans la liste du restaurateur.
 */
public record CommandeResponse(Long numero, String statut, String modeReception, BigDecimal montantTotal,
                               String dateCommande, Long restaurantId, String restaurantNom,
                               String dateRetrait, String heureRetrait, List<Ligne> lignes,
                               String clientNom, String clientTelephone) {

    public record Ligne(Long produitId, String nom, int quantite, BigDecimal prixUnitaire, BigDecimal sousTotal) {
    }

    public static CommandeResponse from(Commande c, String restaurantNom, boolean avecClient) {
        List<Ligne> lignes = c.getLignes().stream().map(CommandeResponse::ligne).toList();
        String clientNom = null;
        String clientTelephone = null;
        if (avecClient) {
            var client = c.getClient();
            clientNom = client.getPrenom() == null ? client.getNom() : client.getPrenom() + " " + client.getNom();
            clientTelephone = client.getTelephone();
        }
        return new CommandeResponse(c.getId(), c.getStatut().name(), c.getModeReception(), c.getMontantTotal(),
                c.getDateCommande().toString(), c.getRestaurantId(), restaurantNom,
                c.getCreneau().getDateCreneau().toString(), c.getCreneau().getHeure(), lignes,
                clientNom, clientTelephone);
    }

    private static Ligne ligne(LigneCommande l) {
        return new Ligne(l.getProduit().getId(), l.getProduit().getNom(), l.getQuantite(), l.getPrixUnitaire(),
                l.getPrixUnitaire().multiply(BigDecimal.valueOf(l.getQuantite())));
    }
}
