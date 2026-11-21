import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

import { messageErreur } from '../core/erreurs';
import { Restaurant } from '../models/restaurant.model';
import { RestaurantService } from '../services/restaurant.service';

/**
 * Restaurant actuellement géré dans l'espace restaurateur.
 * Le backend actuel associe un restaurant au compte restaurateur.
 */
@Injectable({ providedIn: 'root' })
export class EspaceRestaurateurService {
  readonly restaurants$ = new BehaviorSubject<Restaurant[]>([]);
  readonly selection$ = new BehaviorSubject<Restaurant | null>(null);
  readonly erreur$ = new BehaviorSubject<string>('');

  constructor(private restaurantService: RestaurantService) {}

  charger(): void {
    this.restaurantService.getMesRestaurants().subscribe({
      next: (liste) => {
        this.restaurants$.next(liste);
        const courant = this.selection$.value;
        this.selection$.next(liste.find((r) => r.id === courant?.id) ?? liste[0] ?? null);
        this.erreur$.next(liste.length === 0 ? 'Aucun restaurant n\'est associé à votre compte.' : '');
      },
      error: (e) => this.erreur$.next(messageErreur(e, 'Impossible de charger vos restaurants.')),
    });
  }

  choisir(id: number): void {
    this.selection$.next(this.restaurants$.value.find((r) => r.id === id) ?? null);
  }

  /** Met à jour le restaurant sélectionné après une modification du profil. */
  remplacer(restaurant: Restaurant): void {
    this.restaurants$.next(this.restaurants$.value.map((r) => (r.id === restaurant.id ? restaurant : r)));
    this.selection$.next(restaurant);
  }
}
