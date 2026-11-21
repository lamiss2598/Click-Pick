import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, map } from 'rxjs';

import { API_URL, ENDPOINTS } from '../core/api.config';
import { versProduit } from '../core/api.mappers';
import { Produit, ProduitForm } from '../models/produit.model';

@Injectable({ providedIn: 'root' })
export class ProduitService {
  constructor(private http: HttpClient) {}

  /** Liste privée du menu du restaurateur connecté. */
  getMesProduits(): Observable<Produit[]> {
    return this.http.get<unknown[]>(API_URL + ENDPOINTS.mesProduits)
      .pipe(map((liste) => (liste ?? []).map(versProduit)));
  }

  /** Le backend V1 expose uniquement l'ajout de plats côté restaurateur. */
  create(produit: ProduitForm): Observable<Produit> {
    return this.http.post<unknown>(API_URL + ENDPOINTS.mesProduits, {
      nom: produit.nom.trim(),
      description: produit.description.trim(),
      prix: produit.prix,
      categorie: produit.categorie.trim(),
      image: produit.image.trim(),
    }).pipe(map(versProduit));
  }
}
