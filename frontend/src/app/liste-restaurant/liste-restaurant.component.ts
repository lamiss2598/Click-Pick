import { Component } from '@angular/core';
import{Restaurant} from './liste-restaurant.models'
@Component({
  selector: 'app-liste-restaurant',
  templateUrl: './liste-restaurant.component.html',
  styleUrls: ['./liste-restaurant.component.css']
})
export class ListeRestaurantComponent {
  restaurants:Restaurant[];
  constructor(){
    this.restaurants = [
  {
    id: 1,
    nom: "La Bella Vita",
    description: "Cuisine italienne authentique : pizzas, pâtes et spécialités maison.",
    adresse: "📍 Tunis, Lac 1",
    imageUrl: "https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?w=800",
    rate: "⭐ 4.8 / 5",
    category: "Pizza"
  },
  {
    id: 2,
    nom: "Urban Food",
    description: "Burgers gourmands, sandwichs et délicieux repas rapides.",
    adresse: "📍 Tunis, Centre Ville",
    imageUrl: "https://images.unsplash.com/photo-1555396273-367ea4eb4db5?w=800",
    rate: "⭐ 4.7 / 5",
    category: "Sandwich"
  },
  {
    id: 3,
    nom: "Sushi House",
    description: "Découvrez les saveurs japonaises et nos sushis préparés avec soin.",
    adresse: "📍 Tunis, Les Berges du Lac",
    imageUrl: "https://images.unsplash.com/photo-1579027989536-b7b1f875659b?w=800",
    rate: "⭐ 4.6 / 5",
    category: "Sushi"
  },
  {
    id: 4,
    nom: "Le Gourmet",
    description: "Une cuisine tunisienne traditionnelle avec des recettes généreuses.",
    adresse: "📍 Tunis, La Marsa",
    imageUrl: "https://images.unsplash.com/photo-1414235077428-338989a2e8c0?w=800",
    rate: "⭐ 4.9 / 5",
    category: "Plats"
  },
  {
    id: 5,
    nom: "Tacos Factory",
    description: "Tacos, tenders et sauces maison pour tous les goûts.",
    adresse: "📍 Ariana, Ennasr",
    imageUrl: "https://images.unsplash.com/photo-1551504734-5ee1c4a1479b?w=800",
    rate: "⭐ 4.5 / 5",
    category: "Tacos"
  },
  {
    id: 6,
    nom: "Green Garden",
    description: "Salades fraîches, bowls équilibrés et cuisine végétarienne.",
    adresse: "📍 Tunis, Mutuelleville",
    imageUrl: "https://images.unsplash.com/photo-1512621776951-a57141f2eefd?w=800",
    rate: "⭐ 4.7 / 5",
    category: "Salades"
  },
  {
    id: 7,
    nom: "Sweet Corner",
    description: "Pâtisseries, crêpes, gaufres et desserts gourmands.",
    adresse: "📍 Tunis, Centre Urbain Nord",
    imageUrl: "https://images.unsplash.com/photo-1488477181946-6428a0291777?w=800",
    rate: "⭐ 4.8 / 5",
    category: "Desserts"
  },
  {
    id: 8,
    nom: "Grill House",
    description: "Viandes grillées, brochettes et spécialités au barbecue.",
    adresse: "📍 Tunis, Manar",
    imageUrl: "https://images.unsplash.com/photo-1544025162-d76694265947?w=800",
    rate: "⭐ 4.6 / 5",
    category: "Grillades"
  },
  {
  id: 9,
  nom: "Cafe Aroma",
  description: "Un café chaleureux proposant cafés, boissons fraîches et pâtisseries.",
  adresse: "📍 Tunis, La Marsa",
  imageUrl: "https://images.unsplash.com/photo-1445116572660-236099ec97a0?w=800",
  rate: "⭐ 4.8 / 5",
  category: "Café"
},
{
  id: 10,
  nom: "Coffee Lab",
  description: "Un espace moderne pour déguster du café et des spécialités gourmandes.",
  adresse: "📍 Tunis, Les Berges du Lac",
  imageUrl: "https://images.unsplash.com/photo-1501339847302-ac426a4a7cbb?w=800",
  rate: "⭐ 4.7 / 5",
  category: "Café"
},
{
  id: 11,
  nom: "Le Patio Café",
  description: "Un café convivial avec des petits-déjeuners et des desserts maison.",
  adresse: "📍 Tunis, Centre Ville",
  imageUrl: "https://images.unsplash.com/photo-1554118811-1e0d58224f24?w=800",
  rate: "⭐ 4.9 / 5",
  category: "Café"
}
];
  }
  categorieSelectionnee: string = "Tous";

get restaurantsFiltres() {
  if (this.categorieSelectionnee === "Tous") {
    return this.restaurants;
  }

  return this.restaurants.filter(
    restaurant => restaurant.category === this.categorieSelectionnee
  );
}

filtrer(categorie: string) {
  this.categorieSelectionnee = categorie;
}
}
