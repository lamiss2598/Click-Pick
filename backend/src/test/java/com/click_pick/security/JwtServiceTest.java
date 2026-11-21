package com.click_pick.security;

import com.click_pick.exception.ApiException;
import org.junit.jupiter.api.Test;
import org.springframework.http.HttpStatus;

import java.time.Instant;

import static org.junit.jupiter.api.Assertions.assertEquals;
import static org.junit.jupiter.api.Assertions.assertThrows;

/** T03 : cas d'échec du jeton (absent, falsifié, expiré) et cas nominal. */
class JwtServiceTest {

    private static final String SECRET = "un-secret-de-test-d-au-moins-32-caracteres!";
    private final JwtService jwt = new JwtService(SECRET, 60);

    @Test
    void jetonValideRendIdentifiantEtRole() {
        String token = jwt.generate(42L, Role.RESTAURATEUR);
        AuthUser user = jwt.parse(token);
        assertEquals(42L, user.id());
        assertEquals(Role.RESTAURATEUR, user.role());
    }

    @Test
    void jetonExpireEstRefuse() {
        Instant emis = Instant.parse("2026-11-17T10:00:00Z");
        String token = jwt.generate(1L, Role.CLIENT, emis, 60);
        ApiException e = assertThrows(ApiException.class, () -> jwt.parse(token, emis.plusSeconds(61)));
        assertEquals(HttpStatus.UNAUTHORIZED, e.getStatus());
    }

    @Test
    void jetonFalsifieEstRefuse() {
        String token = jwt.generate(1L, Role.CLIENT);
        String[] p = token.split("\\.");
        // on remplace la charge utile par celle d'un restaurateur, en gardant l'ancienne signature
        String forgedPayload = java.util.Base64.getUrlEncoder().withoutPadding().encodeToString(
                "{\"sub\":\"1\",\"role\":\"RESTAURATEUR\",\"iat\":0,\"exp\":99999999999}".getBytes());
        String forged = p[0] + "." + forgedPayload + "." + p[2];
        ApiException e = assertThrows(ApiException.class, () -> jwt.parse(forged));
        assertEquals(HttpStatus.UNAUTHORIZED, e.getStatus());
    }

    @Test
    void jetonSigneAvecUnAutreSecretEstRefuse() {
        String token = new JwtService("un-tout-autre-secret-de-plus-de-32-caracteres", 60)
                .generate(1L, Role.CLIENT);
        assertThrows(ApiException.class, () -> jwt.parse(token));
    }

    @Test
    void jetonMalFormeOuAbsentEstRefuse() {
        assertThrows(ApiException.class, () -> jwt.parse(null));
        assertThrows(ApiException.class, () -> jwt.parse(""));
        assertThrows(ApiException.class, () -> jwt.parse("abc.def"));
        assertThrows(ApiException.class, () -> jwt.parse("a.b.c"));
    }

    @Test
    void secretTropCourtEstRefuseAuDemarrage() {
        assertThrows(IllegalStateException.class, () -> new JwtService("court", 60));
    }
}
