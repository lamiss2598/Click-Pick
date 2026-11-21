import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, map } from 'rxjs';

import { API_URL, ENDPOINTS } from '../core/api.config';
import { versCommande } from '../core/api.mappers';
import { Commande, NouvelleCommande } from '../models/commande.model';

@Injectable({ providedIn: 'root' })
export class CommandeService {
  constructor(private http: HttpClient) {}

  creer(commande: NouvelleCommande): Observable<Commande> {
    return this.http.post<unknown>(API_URL + ENDPOINTS.creerCommande, commande).pipe(map(versCommande));
  }

  getMesCommandes(): Observable<Commande[]> {
    return this.http.get<unknown[]>(API_URL + ENDPOINTS.commandesRestaurateur)
      .pipe(map((liste) => (liste ?? []).map(versCommande)));
  }
}
