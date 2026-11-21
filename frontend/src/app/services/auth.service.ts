import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, tap } from 'rxjs';
import { map } from 'rxjs/operators';

import { versSession } from '../core/api.mappers';
import { API_URL, ENDPOINTS } from '../core/api.config';
import { LoginRequest, RegisterRequest, Role, Session, Utilisateur } from '../models/utilisateur.model';

const CLE_SESSION = 'clickpick.session';

@Injectable({ providedIn: 'root' })
export class AuthService {
  private readonly session$ = new BehaviorSubject<Session | null>(this.lireSession());
  readonly utilisateur$ = this.session$.pipe(map((s) => s?.utilisateur ?? null));

  constructor(private http: HttpClient) {}

  get token(): string | null {
    return this.session$.value?.token ?? null;
  }

  get utilisateur(): Utilisateur | null {
    return this.session$.value?.utilisateur ?? null;
  }

  get estConnecte(): boolean {
    return !!this.token;
  }

  aLeRole(role: Role): boolean {
    return this.utilisateur?.role === role;
  }

  login(demande: LoginRequest): Observable<Session> {
    return this.http.post(API_URL + ENDPOINTS.login, demande).pipe(
      map(versSession),
      tap((session) => this.enregistrer(session))
    );
  }

  /** Crée le compte puis connecte directement l'utilisateur. */
  register(demande: RegisterRequest): Observable<Session> {
    return this.http.post(API_URL + ENDPOINTS.register, demande).pipe(
      map((reponse) => {
        const session = versSession(reponse);
        // Si le backend ne renvoie pas de token à l'inscription, il faudra se connecter ensuite.
        return session;
      }),
      tap((session) => {
        if (session.token) {
          this.enregistrer(session);
        }
      })
    );
  }

  logout(): void {
    localStorage.removeItem(CLE_SESSION);
    this.session$.next(null);
  }

  private enregistrer(session: Session): void {
    localStorage.setItem(CLE_SESSION, JSON.stringify(session));
    this.session$.next(session);
  }

  private lireSession(): Session | null {
    try {
      const brut = localStorage.getItem(CLE_SESSION);
      return brut ? (JSON.parse(brut) as Session) : null;
    } catch {
      return null;
    }
  }
}
