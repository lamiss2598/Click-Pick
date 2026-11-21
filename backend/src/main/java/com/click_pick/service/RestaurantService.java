package com.click_pick.service;

import com.click_pick.dto.MenuResponse;
import com.click_pick.dto.ProduitResponse;
import com.click_pick.dto.RestaurantResponse;
import com.click_pick.entity.Produit;
import com.click_pick.entity.Restaurant;
import com.click_pick.exception.ApiException;
import com.click_pick.repository.ProduitRepository;
import com.click_pick.repository.RestaurantRepository;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.ArrayList;
import java.util.LinkedHashMap;
import java.util.List;
import java.util.Map;

/** Lecture publique des restaurants et de leur menu (US04, US05). */
@Service
@Transactional(readOnly = true)
public class RestaurantService {

    private final RestaurantRepository restaurants;
    private final ProduitRepository produits;

    public RestaurantService(RestaurantRepository restaurants, ProduitRepository produits) {
        this.restaurants = restaurants;
        this.produits = produits;
    }

    /** @param categorie filtre facultatif (insensible à la casse) ; null ou vide = tous les restaurants */
    public List<RestaurantResponse> lister(String categorie) {
        List<Restaurant> liste = (categorie == null || categorie.isBlank())
                ? restaurants.findAllByOrderByNomAsc()
                : restaurants.findByCategorieIgnoreCaseOrderByNomAsc(categorie.trim());
        return liste.stream().map(RestaurantResponse::from).toList();
    }

    public List<String> categories() {
        return restaurants.findCategories();
    }

    public RestaurantResponse detail(Long id) {
        return RestaurantResponse.from(trouver(id));
    }

    public MenuResponse menu(Long id) {
        Restaurant r = trouver(id);
        Map<String, List<ProduitResponse>> parCategorie = new LinkedHashMap<>();
        for (Produit p : produits.findByRestaurantIdAndDisponibleTrueOrderByCategorieAscNomAsc(id)) {
            parCategorie.computeIfAbsent(p.getCategorie(), k -> new ArrayList<>()).add(ProduitResponse.from(p));
        }
        List<MenuResponse.Categorie> categories = parCategorie.entrySet().stream()
                .map(e -> new MenuResponse.Categorie(e.getKey(), e.getValue()))
                .toList();
        return new MenuResponse(RestaurantResponse.from(r), categories);
    }

    private Restaurant trouver(Long id) {
        return restaurants.findById(id).orElseThrow(() -> ApiException.notFound("Restaurant introuvable"));
    }
}
