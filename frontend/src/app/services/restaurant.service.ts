import { Injectable } from '@angular/core';
import { Restaurant } from '../models/restaurant.model';
import { RESTAURANTS } from '../liste-restaurant/restaurants.data';

@Injectable({ providedIn: 'root' })
export class RestaurantService {
  // Les restaurants viennent de la source unique (liste-restaurant/restaurants.data.ts),
  // donc l'accueil et la page "liste" affichent les mêmes logos et les mêmes ids.
  getAll(): Restaurant[] {
    return RESTAURANTS.map((r) => ({
      id: r.id,
      name: r.nom,
      category: r.category,
      area: r.adresse,
      rating: r.rate.reduce((total, note) => total + note, 0) / r.rate.length,
      status: r.status ?? 'Ouvert',
      prepTime: r.prepTime ?? '',
      imageUrl: r.imageUrl,
    }));
  }
}
