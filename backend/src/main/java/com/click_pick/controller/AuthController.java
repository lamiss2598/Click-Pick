package com.click_pick.controller;

import com.click_pick.dto.ApiResponse;
import com.click_pick.dto.AuthResponse;
import com.click_pick.dto.LoginRequest;
import com.click_pick.dto.RegisterRequest;
import com.click_pick.dto.UtilisateurResponse;
import com.click_pick.security.AuthUser;
import com.click_pick.security.Authenticated;
import com.click_pick.service.AuthService;
import jakarta.validation.Valid;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseStatus;
import org.springframework.web.bind.annotation.RestController;

/**
 * Authentification (US01, US02). Il n'y a pas de route de déconnexion : le jeton est sans état,
 * la déconnexion consiste à le supprimer côté Angular.
 */
@RestController
@RequestMapping("/api/auth")
public class AuthController {

    private final AuthService authService;

    public AuthController(AuthService authService) {
        this.authService = authService;
    }

    /** POST /api/auth/register : crée un compte CLIENT ou RESTAURATEUR et renvoie un jeton. */
    @PostMapping("/register")
    @ResponseStatus(HttpStatus.CREATED)
    public ApiResponse<AuthResponse> register(@Valid @RequestBody RegisterRequest request) {
        return ApiResponse.ok("Compte créé avec succès", authService.register(request));
    }

    /** POST /api/auth/login : vérifie les identifiants et renvoie un jeton + l'utilisateur (avec son rôle). */
    @PostMapping("/login")
    public ApiResponse<AuthResponse> login(@Valid @RequestBody LoginRequest request) {
        return ApiResponse.ok("Connexion réussie", authService.login(request));
    }

    /** GET /api/auth/me : utilisateur du jeton courant (pour restaurer la session au rechargement). */
    @Authenticated
    @GetMapping("/me")
    public ApiResponse<UtilisateurResponse> me(AuthUser user) {
        return ApiResponse.ok(authService.moi(user));
    }
}
