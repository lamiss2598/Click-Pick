package com.click_pick.exception;

import com.click_pick.dto.ApiResponse;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.dao.DataIntegrityViolationException;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.http.converter.HttpMessageNotReadableException;
import org.springframework.validation.FieldError;
import org.springframework.web.ErrorResponse;
import org.springframework.web.bind.MethodArgumentNotValidException;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.bind.annotation.RestControllerAdvice;
import org.springframework.web.method.annotation.MethodArgumentTypeMismatchException;

import java.util.LinkedHashMap;
import java.util.Map;

/**
 * Gestion centralisée des erreurs : toutes les erreurs de l'API sortent au même format JSON
 * (voir {@link ApiResponse}). Les contrôleurs n'ont donc jamais de try/catch à écrire.
 */
@RestControllerAdvice
public class GlobalExceptionHandler {

    private static final Logger log = LoggerFactory.getLogger(GlobalExceptionHandler.class);

    @ExceptionHandler(ApiException.class)
    public ResponseEntity<ApiResponse<Void>> handleApi(ApiException ex) {
        return ResponseEntity.status(ex.getStatus()).body(ApiResponse.error(ex.getMessage()));
    }

    /** Champs invalides (@Valid) : un message par champ, et le premier sert de message général. */
    @ExceptionHandler(MethodArgumentNotValidException.class)
    public ResponseEntity<ApiResponse<Void>> handleValidation(MethodArgumentNotValidException ex) {
        Map<String, String> errors = new LinkedHashMap<>();
        for (FieldError fe : ex.getBindingResult().getFieldErrors()) {
            errors.putIfAbsent(fe.getField(), fe.getDefaultMessage());
        }
        String message = errors.isEmpty() ? "Données invalides" : errors.values().iterator().next();
        return ResponseEntity.badRequest().body(ApiResponse.error(message, errors));
    }

    @ExceptionHandler(HttpMessageNotReadableException.class)
    public ResponseEntity<ApiResponse<Void>> handleUnreadable(HttpMessageNotReadableException ex) {
        return ResponseEntity.badRequest()
                .body(ApiResponse.error("Corps de la requête manquant ou JSON invalide"));
    }

    @ExceptionHandler(MethodArgumentTypeMismatchException.class)
    public ResponseEntity<ApiResponse<Void>> handleTypeMismatch(MethodArgumentTypeMismatchException ex) {
        return ResponseEntity.badRequest()
                .body(ApiResponse.error("Paramètre invalide : " + ex.getName()));
    }

    /** Filet de sécurité : une contrainte de la base (unicité, clé étrangère...) a été violée. */
    @ExceptionHandler(DataIntegrityViolationException.class)
    public ResponseEntity<ApiResponse<Void>> handleIntegrity(DataIntegrityViolationException ex) {
        log.warn("Violation de contrainte en base : {}", ex.getMostSpecificCause().getMessage());
        return ResponseEntity.status(HttpStatus.CONFLICT)
                .body(ApiResponse.error("Opération refusée : les données entrent en conflit avec l'existant"));
    }

    /** Tout le reste : 404 / 405 de Spring MVC gardent leur statut, le reste devient une erreur 500. */
    @ExceptionHandler(Exception.class)
    public ResponseEntity<ApiResponse<Void>> handleOther(Exception ex) {
        if (ex instanceof ErrorResponse er) {
            int code = er.getStatusCode().value();
            String message = switch (code) {
                case 404 -> "Ressource introuvable";
                case 405 -> "Méthode HTTP non autorisée";
                case 415 -> "Type de contenu non supporté";
                default -> "Requête invalide";
            };
            return ResponseEntity.status(code).body(ApiResponse.error(message));
        }
        log.error("Erreur interne non prévue", ex);
        return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR)
                .body(ApiResponse.error("Erreur interne du serveur"));
    }
}
