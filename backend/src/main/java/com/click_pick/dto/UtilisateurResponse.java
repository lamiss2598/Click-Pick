package com.click_pick.dto;

import com.click_pick.entity.Utilisateur;

/** Jamais de mot de passe dans une réponse. restaurantId n'est rempli que pour un restaurateur. */
public record UtilisateurResponse(Long id, String nom, String prenom, String email, String telephone,
                                  String role, Long restaurantId) {

    public static UtilisateurResponse from(Utilisateur u, Long restaurantId) {
        return new UtilisateurResponse(u.getId(), u.getNom(), u.getPrenom(), u.getEmail(),
                u.getTelephone(), u.getRole().name(), restaurantId);
    }
}
