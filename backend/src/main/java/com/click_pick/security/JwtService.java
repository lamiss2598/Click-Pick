package com.click_pick.security;

import com.click_pick.exception.ApiException;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;

import javax.crypto.Mac;
import javax.crypto.spec.SecretKeySpec;
import java.nio.charset.StandardCharsets;
import java.security.GeneralSecurityException;
import java.security.MessageDigest;
import java.time.Instant;
import java.util.Base64;
import java.util.regex.Matcher;
import java.util.regex.Pattern;

/**
 * Émission et vérification des jetons JWT (HS256).
 *
 * Contenu du jeton : sub = identifiant de l'utilisateur, role = CLIENT ou RESTAURATEUR,
 * iat / exp = dates d'émission et d'expiration (secondes).
 *
 * Implémentation volontairement limitée au JDK (HmacSHA256) : un seul algorithme accepté,
 * l'en-tête doit être exactement celui que nous émettons (pas de "alg: none"), signature
 * comparée en temps constant.
 */
@Service
public class JwtService {

    private static final Base64.Encoder B64 = Base64.getUrlEncoder().withoutPadding();
    private static final Base64.Decoder B64_DECODER = Base64.getUrlDecoder();
    private static final String HEADER = B64.encodeToString(
            "{\"alg\":\"HS256\",\"typ\":\"JWT\"}".getBytes(StandardCharsets.UTF_8));

    private static final Pattern SUB = Pattern.compile("\"sub\":\"(\\d{1,18})\"");
    private static final Pattern ROLE = Pattern.compile("\"role\":\"([A-Z_]+)\"");
    private static final Pattern EXP = Pattern.compile("\"exp\":(\\d{1,15})");

    private final byte[] secret;
    private final long expirationSeconds;

    public JwtService(@Value("${clickpick.jwt.secret}") String secret,
                      @Value("${clickpick.jwt.expiration-minutes:480}") long expirationMinutes) {
        byte[] bytes = secret.getBytes(StandardCharsets.UTF_8);
        if (bytes.length < 32) {
            throw new IllegalStateException(
                    "clickpick.jwt.secret (variable JWT_SECRET) doit faire au moins 32 caractères");
        }
        this.secret = bytes;
        this.expirationSeconds = expirationMinutes * 60;
    }

    public long getExpirationSeconds() {
        return expirationSeconds;
    }

    public String generate(Long userId, Role role) {
        return generate(userId, role, Instant.now(), expirationSeconds);
    }

    /** Variante avec dates explicites (utilisée par les tests). */
    String generate(Long userId, Role role, Instant issuedAt, long ttlSeconds) {
        String payloadJson = "{\"sub\":\"" + userId + "\",\"role\":\"" + role.name()
                + "\",\"iat\":" + issuedAt.getEpochSecond()
                + ",\"exp\":" + (issuedAt.getEpochSecond() + ttlSeconds) + "}";
        String payload = B64.encodeToString(payloadJson.getBytes(StandardCharsets.UTF_8));
        String signingInput = HEADER + "." + payload;
        return signingInput + "." + B64.encodeToString(hmac(signingInput));
    }

    /** @throws ApiException 401 si le jeton est mal formé, falsifié ou expiré. */
    public AuthUser parse(String token) {
        return parse(token, Instant.now());
    }

    AuthUser parse(String token, Instant now) {
        if (token == null) {
            throw invalid();
        }
        String[] parts = token.split("\\.", -1);
        if (parts.length != 3 || !HEADER.equals(parts[0])) {
            throw invalid();
        }
        byte[] givenSignature;
        try {
            givenSignature = B64_DECODER.decode(parts[2]);
        } catch (IllegalArgumentException e) {
            throw invalid();
        }
        byte[] expectedSignature = hmac(parts[0] + "." + parts[1]);
        if (!MessageDigest.isEqual(expectedSignature, givenSignature)) {
            throw invalid();
        }

        String payload;
        try {
            payload = new String(B64_DECODER.decode(parts[1]), StandardCharsets.UTF_8);
        } catch (IllegalArgumentException e) {
            throw invalid();
        }
        Long sub = extractLong(SUB, payload);
        Long exp = extractLong(EXP, payload);
        Matcher roleMatcher = ROLE.matcher(payload);
        if (sub == null || exp == null || !roleMatcher.find()) {
            throw invalid();
        }
        if (now.getEpochSecond() >= exp) {
            throw ApiException.unauthorized("Session expirée, veuillez vous reconnecter");
        }
        Role role;
        try {
            role = Role.valueOf(roleMatcher.group(1));
        } catch (IllegalArgumentException e) {
            throw invalid();
        }
        return new AuthUser(sub, role);
    }

    private static Long extractLong(Pattern pattern, String text) {
        Matcher m = pattern.matcher(text);
        return m.find() ? Long.valueOf(m.group(1)) : null;
    }

    private static ApiException invalid() {
        return ApiException.unauthorized("Jeton invalide");
    }

    private byte[] hmac(String data) {
        try {
            Mac mac = Mac.getInstance("HmacSHA256");
            mac.init(new SecretKeySpec(secret, "HmacSHA256"));
            return mac.doFinal(data.getBytes(StandardCharsets.UTF_8));
        } catch (GeneralSecurityException e) {
            throw new IllegalStateException("HmacSHA256 indisponible", e);
        }
    }
}
