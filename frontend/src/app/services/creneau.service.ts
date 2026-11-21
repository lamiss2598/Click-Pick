import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, map } from 'rxjs';

import { API_URL, ENDPOINTS } from '../core/api.config';
import { versCreneau } from '../core/api.mappers';
import { Creneau } from '../models/creneau.model';

@Injectable({ providedIn: 'root' })
export class CreneauService {
  constructor(private http: HttpClient) {}

  getDisponibles(restaurantId: number, date: string): Observable<Creneau[]> {
    return this.http.get<unknown[]>(API_URL + ENDPOINTS.creneaux(restaurantId, date))
      .pipe(map((liste) => (liste ?? []).map(versCreneau)));
  }
}
