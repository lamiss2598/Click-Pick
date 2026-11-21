package com.click_pick.dto;

/** Réponse de /register et /login : le jeton à renvoyer ensuite dans "Authorization: Bearer <token>". */
public record AuthResponse(String token, String tokenType, long expiresInSeconds, UtilisateurResponse utilisateur) {
}
