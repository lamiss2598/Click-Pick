export type RestaurantStatus = 'Ouvert' | 'Nouveau' | 'Fermé';

export interface Restaurant {
  id: number;
  name: string;
  category: string;
  area: string;
  rating: number;
  status: RestaurantStatus;
  prepTime: string;
  imageUrl: string;
}
