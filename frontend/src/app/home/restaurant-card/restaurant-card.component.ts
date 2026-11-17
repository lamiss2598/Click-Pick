import { Component, Input } from '@angular/core';
import { Restaurant } from '../../models/restaurant.model';

@Component({
  selector: 'app-restaurant-card',
  templateUrl: './restaurant-card.component.html',
  styleUrls: ['./restaurant-card.component.scss'],
})
export class RestaurantCardComponent {
  @Input() restaurant!: Restaurant;

  // "Dar El Burger" -> "DB" (en attendant de vraies photos)
  get initials(): string {
    return this.restaurant.name
      .split(' ')
      .filter((word: string) => word.length > 2)
      .slice(0, 2)
      .map((word: string) => word[0].toUpperCase())
      .join('');
  }
}
