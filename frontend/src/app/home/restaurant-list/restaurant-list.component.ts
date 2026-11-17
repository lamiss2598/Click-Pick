import { Component, Input } from '@angular/core';
import { Restaurant } from '../../models/restaurant.model';
import { RestaurantService } from '../../services/restaurant.service';

@Component({
  selector: 'app-restaurant-list',
  templateUrl: './restaurant-list.component.html',
  styleUrls: ['./restaurant-list.component.css'],
})
export class RestaurantListComponent {
  @Input() category: string | null = null;
  @Input() searchTerm = '';

  constructor(private service: RestaurantService) {}

  get restaurants(): Restaurant[] {
    const query = this.searchTerm.trim().toLocaleLowerCase();
    return this.service.getAll().filter((restaurant) => {
      const matchesCategory = !this.category || restaurant.category === this.category;
      const searchableText = `${restaurant.name} ${restaurant.category} ${restaurant.area}`.toLocaleLowerCase();
      const matchesSearch = !query || searchableText.includes(query);
      return matchesCategory && matchesSearch;
    });
  }

  trackById(_index: number, restaurant: Restaurant): number {
    return restaurant.id;
  }
}
