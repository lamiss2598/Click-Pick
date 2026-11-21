package com.click_pick.security;

/**
 * Utilisateur authentifié, extrait du jeton JWT par l'intercepteur.
 * Se récupère directement comme paramètre d'une méthode de contrôleur :
 *
 *     @Authenticated
 *     @GetMapping("/me")
 *     public ... me(AuthUser user) { user.id(); user.role(); }
 */
public record AuthUser(Long id, Role role) {
}
