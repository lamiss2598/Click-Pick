package com.click_pick.controller;

import com.click_pick.dto.ApiResponse;
import com.click_pick.dto.CommandeResponse;
import com.click_pick.dto.ProduitRequest;
import com.click_pick.dto.ProduitResponse;
import com.click_pick.dto.RestaurantResponse;
import com.click_pick.security.AuthUser;
import com.click_pick.security.RequireRole;
import com.click_pick.security.Role;
import com.click_pick.service.CommandeService;
import com.click_pick.service.ProduitService;
import jakarta.validation.Valid;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseStatus;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

/**
 * Espace restaurateur (US03, US09). Tout le contrôleur est réservé au rôle RESTAURATEUR, et chaque
 * route travaille uniquement sur le restaurant du jeton : un restaurateur ne voit que ses données.
 */
@RestController
@RequestMapping("/api/restaurateur")
@RequireRole(Role.RESTAURATEUR)
public class RestaurateurController {

    private final ProduitService produitService;
    private final CommandeService commandeService;

    public RestaurateurController(ProduitService produitService, CommandeService commandeService) {
        this.produitService = produitService;
        this.commandeService = commandeService;
    }

    /** GET /api/restaurateur/restaurant : mon restaurant. */
    @GetMapping("/restaurant")
    public ApiResponse<RestaurantResponse> monRestaurant(AuthUser user) {
        return ApiResponse.ok(produitService.monRestaurant(user));
    }

    /** GET /api/restaurateur/produits : tous mes plats. */
    @GetMapping("/produits")
    public ApiResponse<List<ProduitResponse>> monMenu(AuthUser user) {
        return ApiResponse.ok(produitService.monMenu(user));
    }

    /** POST /api/restaurateur/produits : ajoute un plat à mon menu (visible aussitôt côté client). */
    @PostMapping("/produits")
    @ResponseStatus(HttpStatus.CREATED)
    public ApiResponse<ProduitResponse> ajouterProduit(AuthUser user, @Valid @RequestBody ProduitRequest request) {
        return ApiResponse.ok("Plat ajouté au menu", produitService.ajouter(user, request));
    }

    /** GET /api/restaurateur/commandes : commandes reçues, classées par heure de retrait. */
    @GetMapping("/commandes")
    public ApiResponse<List<CommandeResponse>> commandes(AuthUser user) {
        return ApiResponse.ok(commandeService.commandesDuRestaurateur(user));
    }
}
