import { Injectable } from '@angular/core';
import { Restaurant } from '../models/restaurant.model';

@Injectable({ providedIn: 'root' })
export class RestaurantService {
  // Données d'exemple : à remplacer plus tard par un appel à l'API (US04)
  private readonly restaurants: Restaurant[] = [
    { id: 1, name: 'Dar El Burger', category: 'Burgers', area: 'Lac 2, Tunis', rating: 4.7, status: 'Ouvert', prepTime: '10–15 min', color: '#E8A87C' },
    { id: 2, name: 'Tacos House', category: 'Tacos', area: 'Menzah 6, Tunis', rating: 4.6, status: 'Ouvert', prepTime: '15–20 min', color: '#F2C46D' },
    { id: 3, name: 'Café Bloom', category: 'Café', area: 'Berges du Lac, Tunis', rating: 4.5, status: 'Ouvert', prepTime: '5–10 min', color: '#A9C5A0' },
    { id: 4, name: 'Pizza Nostra', category: 'Pizza', area: 'Centre Ville, Tunis', rating: 4.8, status: 'Nouveau', prepTime: '20–30 min', color: '#E58F7F' },
  ];

  getAll(): Restaurant[] {
    return this.restaurants;
  }
}
