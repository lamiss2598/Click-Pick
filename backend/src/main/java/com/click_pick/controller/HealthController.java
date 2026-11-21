package com.click_pick.controller;

import com.click_pick.dto.ApiResponse;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import javax.sql.DataSource;
import java.sql.Connection;
import java.time.Instant;
import java.util.LinkedHashMap;
import java.util.Map;

/**
 * EXEMPLE DOCUMENTÉ D'UNE ROUTE (T02) : copiez ce contrôleur pour ajouter les routes de votre US.
 *
 * Recette :
 *   1. Un contrôleur = une classe @RestController avec un préfixe @RequestMapping("/api/...").
 *   2. Il ne contient aucune logique : il appelle un service (package service) et renvoie
 *      {@code ApiResponse.ok(donnees)}. Le JSON de sortie est donc toujours au même format.
 *   3. Les erreurs : lancer {@code ApiException.notFound("...")}, {@code badRequest(...)}, etc.
 *      GlobalExceptionHandler les convertit en JSON, pas de try/catch dans le contrôleur.
 *   4. Protection : @Authenticated (connecté) ou @RequireRole(Role.CLIENT / Role.RESTAURATEUR) sur la
 *      méthode ou sur la classe. Le paramètre {@code AuthUser user} donne alors l'identifiant et le rôle.
 *   5. Entrées : un record DTO avec des annotations de validation + {@code @Valid @RequestBody}.
 *
 * Test : GET http://localhost:8080/api/health  (route publique)
 */
@RestController
@RequestMapping("/api/health")
public class HealthController {

    private final DataSource dataSource;

    public HealthController(DataSource dataSource) {
        this.dataSource = dataSource;
    }

    /** Vérifie que l'API répond et que la connexion à la base Oracle fonctionne. */
    @GetMapping
    public ApiResponse<Map<String, Object>> health() {
        Map<String, Object> data = new LinkedHashMap<>();
        data.put("api", "UP");
        data.put("database", baseDisponible() ? "UP" : "DOWN");
        data.put("time", Instant.now().toString());
        return ApiResponse.ok(data);
    }

    private boolean baseDisponible() {
        try (Connection c = dataSource.getConnection()) {
            return c.isValid(2);
        } catch (Exception e) {
            return false;
        }
    }
}
