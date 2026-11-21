package com.click_pick.security;

import java.lang.annotation.Documented;
import java.lang.annotation.ElementType;
import java.lang.annotation.Retention;
import java.lang.annotation.RetentionPolicy;
import java.lang.annotation.Target;

/**
 * Middleware "utilisateur connecté" : la route (ou tout le contrôleur) exige un jeton JWT valide,
 * quel que soit le rôle. Sans jeton, ou avec un jeton invalide/expiré : 401.
 */
@Documented
@Retention(RetentionPolicy.RUNTIME)
@Target({ElementType.METHOD, ElementType.TYPE})
public @interface Authenticated {
}
