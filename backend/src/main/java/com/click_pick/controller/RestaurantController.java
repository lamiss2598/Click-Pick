package com.click_pick.controller;

import com.click_pick.dto.ApiResponse;
import com.click_pick.dto.CreneauResponse;
import com.click_pick.dto.MenuResponse;
import com.click_pick.dto.RestaurantResponse;
import com.click_pick.service.CreneauService;
import com.click_pick.service.RestaurantService;
import org.springframework.format.annotation.DateTimeFormat;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import java.time.LocalDate;
import java.util.List;

/** Routes PUBLIQUES de consultation : accueil, menu d'un restaurant, créneaux (US04, US05, US07). */
@RestController
@RequestMapping("/api/restaurants")
public class RestaurantController {

    private final RestaurantService restaurantService;
    private final CreneauService creneauService;

    public RestaurantController(RestaurantService restaurantService, CreneauService creneauService) {
        this.restaurantService = restaurantService;
        this.creneauService = creneauService;
    }

    /** GET /api/restaurants?categorie=Pizza : cartes de l'accueil, filtrables par catégorie. */
    @GetMapping
    public ApiResponse<List<RestaurantResponse>> lister(
            @RequestParam(name = "categorie", required = false) String categorie) {
        return ApiResponse.ok(restaurantService.lister(categorie));
    }

    /** GET /api/restaurants/categories : catégories existantes (pour les boutons de filtre). */
    @GetMapping("/categories")
    public ApiResponse<List<String>> categories() {
        return ApiResponse.ok(restaurantService.categories());
    }

    /** GET /api/restaurants/{id} */
    @GetMapping("/{id}")
    public ApiResponse<RestaurantResponse> detail(@PathVariable("id") Long id) {
        return ApiResponse.ok(restaurantService.detail(id));
    }

    /** GET /api/restaurants/{id}/menu : plats disponibles regroupés par catégorie. */
    @GetMapping("/{id}/menu")
    public ApiResponse<MenuResponse> menu(@PathVariable("id") Long id) {
        return ApiResponse.ok(restaurantService.menu(id));
    }

    /** GET /api/restaurants/{id}/creneaux?date=2026-11-18 : créneaux du jour (par défaut aujourd'hui). */
    @GetMapping("/{id}/creneaux")
    public ApiResponse<List<CreneauResponse>> creneaux(
            @PathVariable("id") Long id,
            @RequestParam(name = "date", required = false)
            @DateTimeFormat(iso = DateTimeFormat.ISO.DATE) LocalDate date) {
        return ApiResponse.ok(creneauService.lister(id, date));
    }
}
