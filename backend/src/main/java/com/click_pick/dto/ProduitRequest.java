package com.click_pick.dto;

import jakarta.validation.constraints.DecimalMin;
import jakarta.validation.constraints.Digits;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Size;

import java.math.BigDecimal;

/** Corps de POST /api/restaurateur/produits (US03). */
public record ProduitRequest(
        @NotBlank(message = "Le nom du plat est obligatoire")
        @Size(max = 100, message = "Le nom ne doit pas dépasser 100 caractères")
        String nom,

        @Size(max = 500, message = "La description ne doit pas dépasser 500 caractères")
        String description,

        @NotNull(message = "Le prix est obligatoire")
        @DecimalMin(value = "0", inclusive = false, message = "Le prix doit être supérieur à 0")
        @Digits(integer = 7, fraction = 3, message = "Prix invalide (3 décimales maximum)")
        BigDecimal prix,

        @NotBlank(message = "La catégorie est obligatoire")
        @Size(max = 100, message = "La catégorie ne doit pas dépasser 100 caractères")
        String categorie,

        @Size(max = 255, message = "Le lien de l'image est trop long")
        String image) {
}
