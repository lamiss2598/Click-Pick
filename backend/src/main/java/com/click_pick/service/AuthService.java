package com.click_pick.service;

import com.click_pick.dto.AuthResponse;
import com.click_pick.dto.LoginRequest;
import com.click_pick.dto.RegisterRequest;
import com.click_pick.dto.UtilisateurResponse;
import com.click_pick.entity.Restaurant;
import com.click_pick.entity.Utilisateur;
import com.click_pick.exception.ApiException;
import com.click_pick.repository.RestaurantRepository;
import com.click_pick.repository.UtilisateurRepository;
import com.click_pick.security.AuthUser;
import com.click_pick.security.JwtService;
import com.click_pick.security.Role;
import org.springframework.dao.DataIntegrityViolationException;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.math.BigDecimal;
import java.nio.charset.StandardCharsets;
import java.time.Clock;
import java.time.LocalDateTime;
import java.time.temporal.ChronoUnit;
import java.util.Locale;

/** Inscription, connexion et profil courant (US01, US02). */
@Service
public class AuthService {

    private static final int BCRYPT_MAX_BYTES = 72;
    private static final String EMAIL_PRIS = "Cet e-mail est déjà utilisé";

    private final UtilisateurRepository utilisateurs;
    private final RestaurantRepository restaurants;
    private final PasswordEncoder passwordEncoder;
    private final JwtService jwtService;
    private final Clock clock;

    public AuthService(UtilisateurRepository utilisateurs, RestaurantRepository restaurants,
                       PasswordEncoder passwordEncoder, JwtService jwtService, Clock clock) {
        this.utilisateurs = utilisateurs;
        this.restaurants = restaurants;
        this.passwordEncoder = passwordEncoder;
        this.jwtService = jwtService;
        this.clock = clock;
    }

    @Transactional
    public AuthResponse register(RegisterRequest req) {
        String email = normaliserEmail(req.email());
        if (utilisateurs.existsByEmail(email)) {
            throw ApiException.conflict(EMAIL_PRIS);
        }
        if (req.motDePasse().getBytes(StandardCharsets.UTF_8).length > BCRYPT_MAX_BYTES) {
            throw ApiException.badRequest("Le mot de passe est trop long (72 octets maximum)");
        }

        Utilisateur u = new Utilisateur();
        u.setNom(req.nom().trim());
        u.setPrenom(videVersNull(req.prenom()));
        u.setEmail(email);
        u.setMotDePasse(passwordEncoder.encode(req.motDePasse()));
        u.setTelephone(videVersNull(req.telephone()));
        u.setRole(Role.valueOf(req.role().trim().toUpperCase(Locale.ROOT)));
        u.setDateCreation(LocalDateTime.now(clock).truncatedTo(ChronoUnit.SECONDS));
        try {
            u = utilisateurs.saveAndFlush(u);
        } catch (DataIntegrityViolationException e) {
            // deux inscriptions simultanées avec le même e-mail : la contrainte UQ_USER_EMAIL tranche
            throw ApiException.conflict(EMAIL_PRIS);
        }

        Long restaurantId = null;
        if (u.getRole() == Role.RESTAURATEUR) {
            restaurantId = restaurants.save(creerRestaurant(u, req)).getId();
        }
        return reponse(u, restaurantId);
    }

    @Transactional(readOnly = true)
    public AuthResponse login(LoginRequest req) {
        Utilisateur u = utilisateurs.findByEmail(normaliserEmail(req.email())).orElse(null);
        boolean ok = u != null
                && req.motDePasse().getBytes(StandardCharsets.UTF_8).length <= BCRYPT_MAX_BYTES
                && passwordEncoder.matches(req.motDePasse(), u.getMotDePasse());
        if (!ok) {
            // même message dans les deux cas : on ne révèle pas si l'e-mail existe
            throw ApiException.unauthorized("E-mail ou mot de passe incorrect");
        }
        return reponse(u, restaurantIdDe(u));
    }

    @Transactional(readOnly = true)
    public UtilisateurResponse moi(AuthUser auth) {
        Utilisateur u = utilisateurs.findById(auth.id())
                .orElseThrow(() -> ApiException.unauthorized("Compte introuvable, veuillez vous reconnecter"));
        return UtilisateurResponse.from(u, restaurantIdDe(u));
    }

    // ----------------------------------------------------------------------------------------

    /** Un restaurateur doit avoir un restaurant pour pouvoir ajouter des plats (US03). */
    private Restaurant creerRestaurant(Utilisateur proprietaire, RegisterRequest req) {
        Restaurant r = new Restaurant();
        String nom = videVersNull(req.restaurantNom());
        r.setNom(nom != null ? nom : "Restaurant " + proprietaire.getNom());
        String adresse = videVersNull(req.adresse());
        r.setAdresse(adresse != null ? adresse : "Adresse à renseigner");
        String categorie = videVersNull(req.categorie());
        r.setCategorie(categorie != null ? categorie : "Autre");
        r.setTelephone(proprietaire.getTelephone());
        r.setImageUrl("assets/logo_rest/default.png");
        r.setRate(BigDecimal.ZERO);
        r.setOuvert(true);
        r.setRestaurateurId(proprietaire.getId());
        return r;
    }

    private Long restaurantIdDe(Utilisateur u) {
        if (u.getRole() != Role.RESTAURATEUR) {
            return null;
        }
        return restaurants.findByRestaurateurId(u.getId()).map(Restaurant::getId).orElse(null);
    }

    private AuthResponse reponse(Utilisateur u, Long restaurantId) {
        String token = jwtService.generate(u.getId(), u.getRole());
        return new AuthResponse(token, "Bearer", jwtService.getExpirationSeconds(),
                UtilisateurResponse.from(u, restaurantId));
    }

    private static String normaliserEmail(String email) {
        return email.trim().toLowerCase(Locale.ROOT);
    }

    /** Oracle traite '' comme NULL : on normalise les champs facultatifs. */
    static String videVersNull(String s) {
        return s == null || s.isBlank() ? null : s.trim();
    }
}
