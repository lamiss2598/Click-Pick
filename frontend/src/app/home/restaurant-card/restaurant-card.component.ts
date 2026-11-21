import { Component, Input } from '@angular/core';

import { Restaurant } from '../../models/restaurant.model';

@Component({
  selector: 'app-restaurant-card',
  templateUrl: './restaurant-card.component.html',
  styleUrls: ['./restaurant-card.component.css'],
})
export class RestaurantCardComponent {
  @Input() restaurant!: Restaurant;

  // « Bab Al Madina » -> « BA » (affiché quand le restaurant n'a pas d'image)
  get initiales(): string {
    return this.restaurant.nom
      .split(' ')
      .filter((mot: string) => mot.length > 2)
      .slice(0, 2)
      .map((mot: string) => mot[0].toUpperCase())
      .join('');
  }
}
