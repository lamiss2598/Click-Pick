package com.click_pick.dto;

import java.util.Map;

/**
 * Format de réponse JSON commun à toute l'API.
 *
 * Succès : { "success": true,  "message": "...", "data": ...,  "errors": null }
 * Erreur : { "success": false, "message": "...", "data": null, "errors": { "champ": "message" } }
 *
 * "errors" n'est rempli que pour les erreurs de validation de formulaire.
 */
public record ApiResponse<T>(boolean success, String message, T data, Map<String, String> errors) {

    public static <T> ApiResponse<T> ok(T data) {
        return new ApiResponse<>(true, "OK", data, null);
    }

    public static <T> ApiResponse<T> ok(String message, T data) {
        return new ApiResponse<>(true, message, data, null);
    }

    public static <T> ApiResponse<T> error(String message) {
        return new ApiResponse<>(false, message, null, null);
    }

    public static <T> ApiResponse<T> error(String message, Map<String, String> errors) {
        return new ApiResponse<>(false, message, null, errors);
    }
}
