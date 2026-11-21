package com.click_pick.dto;

import com.click_pick.entity.Produit;

import java.math.BigDecimal;

public record ProduitResponse(Long id, String nom, String description, BigDecimal prix, String image,
                              String categorie, boolean disponible, Long restaurantId) {

    public static ProduitResponse from(Produit p) {
        return new ProduitResponse(p.getId(), p.getNom(), p.getDescription(), p.getPrix(), p.getImage(),
                p.getCategorie(), p.isDisponible(), p.getRestaurantId());
    }
}
