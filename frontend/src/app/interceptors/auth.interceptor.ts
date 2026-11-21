import { HttpErrorResponse, HttpEvent, HttpHandler, HttpInterceptor, HttpRequest, HttpResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Observable, catchError, map, throwError } from 'rxjs';

import { API_URL, ENDPOINTS } from '../core/api.config';
import { AuthService } from '../services/auth.service';

/** Ajoute le JWT et extrait automatiquement le champ "data" des réponses ApiResponse. */
@Injectable()
export class AuthInterceptor implements HttpInterceptor {
  constructor(private auth: AuthService, private router: Router) {}

  intercept(req: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<unknown>> {
    const estAppelApi = req.url.startsWith(API_URL);
    const estAuth = req.url === API_URL + ENDPOINTS.login || req.url === API_URL + ENDPOINTS.register;
    const token = this.auth.token;
    const requete = estAppelApi && !estAuth && token
      ? req.clone({ setHeaders: { Authorization: `Bearer ${token}` } })
      : req;

    return next.handle(requete).pipe(
      map((event) => {
        if (event instanceof HttpResponse && estAppelApi) {
          const corps = event.body as { data?: unknown } | null;
          if (corps && typeof corps === 'object' && Object.prototype.hasOwnProperty.call(corps, 'data')) {
            return event.clone({ body: corps.data });
          }
        }
        return event;
      }),
      catchError((erreur: HttpErrorResponse) => {
        if (estAppelApi && !estAuth && erreur.status === 401 && token) {
          this.auth.logout();
          this.router.navigate(['/auth'], { queryParams: { returnUrl: this.router.url } });
        }
        return throwError(() => erreur);
      })
    );
  }
}
