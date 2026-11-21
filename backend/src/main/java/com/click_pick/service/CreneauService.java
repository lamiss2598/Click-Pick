package com.click_pick.service;

import com.click_pick.dto.CreneauResponse;
import com.click_pick.entity.Creneau;
import com.click_pick.exception.ApiException;
import com.click_pick.repository.CreneauRepository;
import com.click_pick.repository.RestaurantRepository;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.dao.DataIntegrityViolationException;
import org.springframework.stereotype.Service;

import java.time.Clock;
import java.time.LocalDate;
import java.time.LocalTime;
import java.util.ArrayList;
import java.util.List;

/**
 * Créneaux de retrait (US07).
 *
 * Règle simple de la V1 : chaque créneau accepte un nombre maximum de commandes (CAPACITE_MAX).
 * Si un restaurant n'a aucun créneau pour un jour demandé (aujourd'hui ou les jours suivants),
 * des créneaux par défaut sont créés automatiquement (config clickpick.creneaux.*) : un restaurateur
 * qui vient de s'inscrire peut ainsi recevoir des commandes sans préparation supplémentaire.
 *
 * Volontairement SANS @Transactional au niveau de la méthode publique : si deux requêtes génèrent
 * les créneaux en même temps, l'une échoue sur UQ_CRENEAU et on relit simplement le résultat.
 */
@Service
public class CreneauService {

    private final CreneauRepository creneaux;
    private final RestaurantRepository restaurants;
    private final Clock clock;
    private final LocalTime ouverture;
    private final LocalTime fermeture;
    private final int pasMinutes;
    private final int capacite;
    private final int joursALAvance;

    public CreneauService(CreneauRepository creneaux, RestaurantRepository restaurants, Clock clock,
                          @Value("${clickpick.creneaux.ouverture:11:00}") String ouverture,
                          @Value("${clickpick.creneaux.fermeture:21:00}") String fermeture,
                          @Value("${clickpick.creneaux.pas-minutes:60}") int pasMinutes,
                          @Value("${clickpick.creneaux.capacite:5}") int capacite,
                          @Value("${clickpick.creneaux.jours-a-l-avance:7}") int joursALAvance) {
        this.creneaux = creneaux;
        this.restaurants = restaurants;
        this.clock = clock;
        this.ouverture = LocalTime.parse(ouverture);
        this.fermeture = LocalTime.parse(fermeture);
        this.pasMinutes = Math.max(15, pasMinutes);
        this.capacite = Math.max(1, capacite);
        this.joursALAvance = joursALAvance;
    }

    /** @param date jour demandé ; null = aujourd'hui */
    public List<CreneauResponse> lister(Long restaurantId, LocalDate date) {
        if (restaurants.findById(restaurantId).isEmpty()) {
            throw ApiException.notFound("Restaurant introuvable");
        }
        LocalDate aujourdhui = LocalDate.now(clock);
        LocalDate jour = date != null ? date : aujourdhui;

        boolean generable = !jour.isBefore(aujourdhui) && !jour.isAfter(aujourdhui.plusDays(joursALAvance));
        if (generable && !creneaux.existsByRestaurantIdAndDateCreneau(restaurantId, jour)) {
            genererParDefaut(restaurantId, jour);
        }
        return creneaux.findByRestaurantIdAndDateCreneauOrderByHeureAsc(restaurantId, jour)
                .stream().map(CreneauResponse::from).toList();
    }

    private void genererParDefaut(Long restaurantId, LocalDate jour) {
        List<Creneau> nouveaux = new ArrayList<>();
        for (LocalTime t = ouverture; t.isBefore(fermeture); t = t.plusMinutes(pasMinutes)) {
            Creneau c = new Creneau();
            c.setRestaurantId(restaurantId);
            c.setDateCreneau(jour);
            c.setHeure(t.toString()); // "HH:mm"
            c.setCapaciteMax(capacite);
            c.setPlacesPrises(0);
            nouveaux.add(c);
            if (t.plusMinutes(pasMinutes).isBefore(t)) {
                break; // dépassement minuit : on s'arrête
            }
        }
        try {
            creneaux.saveAll(nouveaux);
        } catch (DataIntegrityViolationException e) {
            // généré en parallèle par une autre requête : rien à faire, on relit
        }
    }
}
