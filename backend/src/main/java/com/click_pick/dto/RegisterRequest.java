package com.click_pick.dto;

import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.Pattern;
import jakarta.validation.constraints.Size;

/**
 * Corps de POST /api/auth/register (US01).
 * Les champs restaurantNom / adresse / categorie ne servent que pour le rôle RESTAURATEUR
 * (ils servent à créer son restaurant ; valeurs par défaut sinon, modifiables en V2 via US14).
 */
public record RegisterRequest(
        @NotBlank(message = "Le nom est obligatoire")
        @Size(max = 50, message = "Le nom ne doit pas dépasser 50 caractères")
        String nom,

        @Size(max = 50, message = "Le prénom ne doit pas dépasser 50 caractères")
        String prenom,

        @NotBlank(message = "L'e-mail est obligatoire")
        @Size(max = 100, message = "L'e-mail ne doit pas dépasser 100 caractères")
        @Pattern(regexp = "^[^\\s@]+@[^\\s@]+\\.[^\\s@]+$", message = "Adresse e-mail invalide")
        String email,

        @NotBlank(message = "Le mot de passe est obligatoire")
        @Pattern(regexp = "^(?=.*[a-z])(?=.*[A-Z])(?=.*\\d)(?=.*[^A-Za-z0-9]).{8,72}$",
                message = "Le mot de passe doit contenir au moins 8 caractères, une majuscule, "
                        + "une minuscule, un chiffre et un caractère spécial")
        String motDePasse,

        @Pattern(regexp = "^$|^[0-9+ ().-]{6,20}$", message = "Numéro de téléphone invalide")
        String telephone,

        @NotBlank(message = "Le rôle est obligatoire")
        @Pattern(regexp = "(?i)^(client|restaurateur)$", message = "Le rôle doit être CLIENT ou RESTAURATEUR")
        String role,

        @Size(max = 100, message = "Le nom du restaurant ne doit pas dépasser 100 caractères")
        String restaurantNom,

        @Size(max = 200, message = "L'adresse ne doit pas dépasser 200 caractères")
        String adresse,

        @Size(max = 200, message = "La catégorie ne doit pas dépasser 200 caractères")
        String categorie) {
}
