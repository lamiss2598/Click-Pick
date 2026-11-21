package com.click_pick.dto;

import jakarta.validation.constraints.NotBlank;

/** Corps de POST /api/auth/login (US02). */
public record LoginRequest(
        @NotBlank(message = "L'e-mail est obligatoire") String email,
        @NotBlank(message = "Le mot de passe est obligatoire") String motDePasse) {
}
