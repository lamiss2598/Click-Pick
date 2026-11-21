package com.click_pick.security;

import com.click_pick.exception.ApiException;
import org.springframework.core.MethodParameter;
import org.springframework.web.bind.support.WebDataBinderFactory;
import org.springframework.web.context.request.NativeWebRequest;
import org.springframework.web.context.request.RequestAttributes;
import org.springframework.web.method.support.HandlerMethodArgumentResolver;
import org.springframework.web.method.support.ModelAndViewContainer;

/** Permet d'écrire simplement "AuthUser user" comme paramètre d'une méthode de contrôleur. */
public class CurrentUserArgumentResolver implements HandlerMethodArgumentResolver {

    @Override
    public boolean supportsParameter(MethodParameter parameter) {
        return AuthUser.class.equals(parameter.getParameterType());
    }

    @Override
    public Object resolveArgument(MethodParameter parameter, ModelAndViewContainer mavContainer,
                                  NativeWebRequest webRequest, WebDataBinderFactory binderFactory) {
        Object user = webRequest.getAttribute(AuthInterceptor.ATTRIBUTE, RequestAttributes.SCOPE_REQUEST);
        if (user == null) {
            // la route utilise AuthUser mais n'est pas protégée par @Authenticated / @RequireRole
            throw ApiException.unauthorized("Authentification requise");
        }
        return user;
    }
}
