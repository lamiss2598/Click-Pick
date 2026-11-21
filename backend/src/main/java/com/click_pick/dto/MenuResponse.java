package com.click_pick.dto;

import java.util.List;

/**
 * Page menu d'un restaurant (US05) : plats regroupés par catégorie.
 * "categories" est vide si le restaurateur n'a encore ajouté aucun plat (message explicite côté Angular).
 */
public record MenuResponse(RestaurantResponse restaurant, List<Categorie> categories) {

    public record Categorie(String categorie, List<ProduitResponse> produits) {
    }
}
