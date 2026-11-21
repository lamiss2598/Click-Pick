package com.click_pick.dto;

import jakarta.validation.Valid;
import jakarta.validation.constraints.Max;
import jakarta.validation.constraints.Min;
import jakarta.validation.constraints.NotEmpty;
import jakarta.validation.constraints.NotNull;

import java.util.List;

/**
 * Corps de POST /api/commandes (US08) : le panier est géré côté Angular, il est envoyé en une fois.
 * Le total n'est PAS envoyé : il est recalculé côté serveur à partir des prix en base.
 */
public record CommandeRequest(
        @NotNull(message = "Le restaurant est obligatoire") Long restaurantId,
        @NotNull(message = "Le créneau de retrait est obligatoire") Long creneauId,
        @NotEmpty(message = "Votre panier est vide") @Valid List<LigneRequest> lignes) {

    public record LigneRequest(
            @NotNull(message = "Le plat est obligatoire") Long produitId,
            @NotNull(message = "La quantité est obligatoire")
            @Min(value = 1, message = "La quantité doit être d'au moins 1")
            @Max(value = 99, message = "La quantité maximale par plat est 99")
            Integer quantite) {
    }
}
