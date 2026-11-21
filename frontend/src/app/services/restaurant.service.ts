import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, map } from 'rxjs';

import { API_URL, ENDPOINTS } from '../core/api.config';
import { versRestaurant, versProduit } from '../core/api.mappers';
import { Restaurant } from '../models/restaurant.model';
import { Produit } from '../models/produit.model';

@Injectable({ providedIn: 'root' })
export class RestaurantService {
  constructor(private http: HttpClient) {}

  getAll(): Observable<Restaurant[]> {
    return this.http.get<unknown[]>(API_URL + ENDPOINTS.restaurants).pipe(map((liste) => (liste ?? []).map(versRestaurant)));
  }

  getById(id: number): Observable<Restaurant> {
    return this.http.get<unknown>(API_URL + ENDPOINTS.restaurant(id)).pipe(map(versRestaurant));
  }

  /** Le backend associe un seul restaurant au compte restaurateur. */
  getMesRestaurants(): Observable<Restaurant[]> {
    return this.http.get<unknown>(API_URL + ENDPOINTS.monRestaurant).pipe(map((r) => [versRestaurant(r)]));
  }

  getMenu(id: number): Observable<{ restaurant: Restaurant; produits: Produit[] }> {
    return this.http.get<any>(API_URL + ENDPOINTS.menuRestaurant(id)).pipe(
      map((menu) => ({
        restaurant: versRestaurant(menu.restaurant),
        produits: (menu.categories ?? []).flatMap((c: any) => (c.produits ?? []).map(versProduit)),
      }))
    );
  }
}
