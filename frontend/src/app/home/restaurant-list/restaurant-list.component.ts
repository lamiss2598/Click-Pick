import { Component, Input } from '@angular/core';
import { Restaurant } from '../../models/restaurant.model';
import { RestaurantService } from '../../services/restaurant.service';

@Component({
  selector: 'app-restaurant-list',
  templateUrl: './restaurant-list.component.html',
  styleUrls: ['./restaurant-list.component.scss'],
})
export class RestaurantListComponent {
  // null = aucune catégorie choisie : on affiche tout
  @Input() category: string | null = null;

  constructor(private service: RestaurantService) {}

  get restaurants(): Restaurant[] {
    const all = this.service.getAll();
    return this.category
      ? all.filter((r: Restaurant) => r.category === this.category)
      : all;
  }

  trackById(_index: number, restaurant: Restaurant): number {
    return restaurant.id;
  }
}
