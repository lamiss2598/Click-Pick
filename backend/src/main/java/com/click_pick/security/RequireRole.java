package com.click_pick.security;

import java.lang.annotation.Documented;
import java.lang.annotation.ElementType;
import java.lang.annotation.Retention;
import java.lang.annotation.RetentionPolicy;
import java.lang.annotation.Target;

/**
 * Middleware "rôle" : la route exige un jeton valide ET l'un des rôles listés.
 * Jeton absent/invalide : 401. Mauvais rôle : 403.
 *
 *     @RequireRole(Role.RESTAURATEUR)   // routes du restaurateur
 *     @RequireRole(Role.CLIENT)         // routes du client
 */
@Documented
@Retention(RetentionPolicy.RUNTIME)
@Target({ElementType.METHOD, ElementType.TYPE})
public @interface RequireRole {
    Role[] value();
}
