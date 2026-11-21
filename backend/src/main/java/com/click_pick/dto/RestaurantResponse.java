package com.click_pick.dto;

import com.click_pick.entity.Restaurant;

import java.math.BigDecimal;

/** Carte de restaurant (accueil, US04) et en-tête de la page menu (US05). */
public record RestaurantResponse(Long id, String nom, String description, String adresse, String telephone,
                                 BigDecimal rate, String categorie, String imageUrl, String horaires,
                                 boolean ouvert, String statut, String tempsPreparation) {

    public static RestaurantResponse from(Restaurant r) {
        return new RestaurantResponse(r.getId(), r.getNom(), r.getDescription(), r.getAdresse(),
                r.getTelephone(), r.getRate(), r.getCategorie(), r.getImageUrl(), r.getHoraires(),
                r.isOuvert(), r.isOuvert() ? "Ouvert" : "Fermé", r.getTempsPreparation());
    }
}
