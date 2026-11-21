package com.click_pick.security;

import com.click_pick.exception.ApiException;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import org.springframework.core.annotation.AnnotatedElementUtils;
import org.springframework.stereotype.Component;
import org.springframework.web.method.HandlerMethod;
import org.springframework.web.servlet.HandlerInterceptor;

import java.lang.annotation.Annotation;
import java.util.Arrays;

/**
 * Middleware d'authentification, exécuté avant chaque contrôleur de /api/**.
 *
 * Il ne fait rien pour les routes publiques. Si la route (ou son contrôleur) porte
 * {@link Authenticated} ou {@link RequireRole}, il lit l'en-tête "Authorization: Bearer <jeton>",
 * vérifie le jeton puis le rôle, et dépose l'{@link AuthUser} dans la requête.
 * Les erreurs sont des {@link ApiException} : elles sortent en JSON via GlobalExceptionHandler.
 */
@Component
public class AuthInterceptor implements HandlerInterceptor {

    public static final String ATTRIBUTE = "clickpick.authUser";

    private final JwtService jwtService;

    public AuthInterceptor(JwtService jwtService) {
        this.jwtService = jwtService;
    }

    @Override
    public boolean preHandle(HttpServletRequest request, HttpServletResponse response, Object handler) {
        if (!(handler instanceof HandlerMethod method) || "OPTIONS".equalsIgnoreCase(request.getMethod())) {
            return true;
        }
        RequireRole requireRole = find(method, RequireRole.class);
        Authenticated authenticated = find(method, Authenticated.class);
        if (requireRole == null && authenticated == null) {
            return true; // route publique
        }

        String header = request.getHeader("Authorization");
        if (header == null || !header.regionMatches(true, 0, "Bearer ", 0, 7)) {
            throw ApiException.unauthorized("Authentification requise");
        }
        AuthUser user = jwtService.parse(header.substring(7).trim());

        if (requireRole != null && !Arrays.asList(requireRole.value()).contains(user.role())) {
            throw ApiException.forbidden("Accès refusé : cette action n'est pas autorisée pour votre rôle");
        }
        request.setAttribute(ATTRIBUTE, user);
        return true;
    }

    /** Cherche l'annotation sur la méthode, sinon sur la classe du contrôleur. */
    private static <A extends Annotation> A find(HandlerMethod method, Class<A> type) {
        A annotation = AnnotatedElementUtils.findMergedAnnotation(method.getMethod(), type);
        return annotation != null
                ? annotation
                : AnnotatedElementUtils.findMergedAnnotation(method.getBeanType(), type);
    }
}
