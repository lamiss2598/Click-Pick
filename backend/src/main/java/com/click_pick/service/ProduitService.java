package com.click_pick.service;

import com.click_pick.dto.ProduitRequest;
import com.click_pick.dto.ProduitResponse;
import com.click_pick.dto.RestaurantResponse;
import com.click_pick.entity.Produit;
import com.click_pick.entity.Restaurant;
import com.click_pick.exception.ApiException;
import com.click_pick.repository.ProduitRepository;
import com.click_pick.repository.RestaurantRepository;
import com.click_pick.security.AuthUser;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;

/** Espace restaurateur : son restaurant et son menu (US03). */
@Service
public class ProduitService {

    private final RestaurantRepository restaurants;
    private final ProduitRepository produits;

    public ProduitService(RestaurantRepository restaurants, ProduitRepository produits) {
        this.restaurants = restaurants;
        this.produits = produits;
    }

    @Transactional(readOnly = true)
    public RestaurantResponse monRestaurant(AuthUser user) {
        return RestaurantResponse.from(restaurantDe(user));
    }

    @Transactional(readOnly = true)
    public List<ProduitResponse> monMenu(AuthUser user) {
        Restaurant r = restaurantDe(user);
        return produits.findByRestaurantIdOrderByCategorieAscNomAsc(r.getId())
                .stream().map(ProduitResponse::from).toList();
    }

    /** Le plat est TOUJOURS lié au restaurant du restaurateur connecté (jamais choisi par le client HTTP). */
    @Transactional
    public ProduitResponse ajouter(AuthUser user, ProduitRequest req) {
        Restaurant r = restaurantDe(user);
        Produit p = new Produit();
        p.setNom(req.nom().trim());
        p.setDescription(AuthService.videVersNull(req.description()));
        p.setPrix(req.prix());
        p.setCategorie(req.categorie().trim());
        p.setImage(AuthService.videVersNull(req.image()));
        p.setDisponible(true);
        p.setRestaurantId(r.getId());
        return ProduitResponse.from(produits.save(p));
    }

    Restaurant restaurantDe(AuthUser user) {
        return restaurants.findByRestaurateurId(user.id())
                .orElseThrow(() -> ApiException.notFound("Aucun restaurant n'est associé à ce compte"));
    }
}
