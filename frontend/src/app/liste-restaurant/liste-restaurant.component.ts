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
    imageUrl: "assets/logo_rest/La_Bella_Vita.jpg",
    rate: [4.8],
    category: "Pizza",
  },
  {
    id: 2,
    nom: "Borcelle",
    description: "Burgers gourmands, sandwichs et délicieux repas rapides.",
    adresse: "📍 Tunis, Centre Ville",
    imageUrl: "assets/logo_rest/Borcelle.png",
    rate: [4.7],
    category: "Burger"
  },
  {
    id: 3,
    nom: "Sushi House",
    description: "Découvrez les saveurs japonaises et nos sushis préparés avec soin.",
    adresse: "📍 Tunis, Les Berges du Lac",
    imageUrl: "assets/logo_rest/sushi_house.jpg",
    rate: [4.6],
    category: "Sushi"
  },
  {
    id: 4,
    nom: "Bab Al Madina",
    description: "Une cuisine tunisienne traditionnelle avec des recettes généreuses.",
    adresse: "📍 Tunis, La Marsa",
    imageUrl: "assets/logo_rest/BAB_Al_Madina.jpg",
    rate: [4.9],
    category: "Plats"
  },
  {
    id: 5,
    nom: "Tacos Factory",
    description: "Tacos, tenders et sauces maison pour tous les goûts.",
    adresse: "📍 Ariana, Ennasr",
    imageUrl: "assets/logo_rest/tacos.jpg",
    rate: [4.5],
    category: "Tacos"
  },
  {
    id: 6,
    nom: "Green Garden",
    description: "Salades fraîches, bowls équilibrés et cuisine végétarienne.",
    adresse: "📍 Tunis, Mutuelleville",
    imageUrl: "assets/logo_rest/green garden.jpg",
    rate: [4.7],
    category: "Salades"
  },
  {
    id: 7,
    nom: "Sweet Corner",
    description: "Pâtisseries, crêpes, gaufres et desserts gourmands.",
    adresse: "📍 Tunis, Centre Urbain Nord",
    imageUrl: "assets/logo_rest/sweet_corner.jpg",
    rate: [4.8],
    category: "Desserts"
  },
  {
    id: 8,
    nom: "Grill House",
    description: "Viandes grillées, brochettes et spécialités au barbecue.",
    adresse: "📍 Tunis, Manar",
    imageUrl: "assets/logo_rest/GrillHouse.png",
    rate: [4.6],
    category: "Grillades"
  },
  {
  id: 9,
  nom: "Corner Café",
  description: "Un café chaleureux proposant cafés, boissons fraîches et pâtisseries.",
  adresse: "📍 Tunis, La Marsa",
  imageUrl: "assets/logo_rest/corner_café.png",
  rate: [4.8],
  category: "Café"
},
{
  id: 10,
  nom: "Coffee Lab",
  description: "Un espace moderne pour déguster du café et des spécialités gourmandes.",
  adresse: "📍 Tunis, Les Berges du Lac",
  imageUrl: "assets/logo_rest/coffee_lab.jpg",
  rate: [4.7],
  category: "Café"
},
{
  id: 11,
  nom: "Gathered",
  description: "Un café convivial avec des petits-déjeuners et des desserts maison.",
  adresse: "📍 Tunis, Centre Ville",
  imageUrl: "assets/logo_rest/gathered.png",
  rate: [4.9],
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
// Stocker la note choisie par le client pour chaque restaurant
rateUtilisateur: { [id: number]: number } = {};

// Ajouter ou modifier une note
noterRestaurant(id: number, note: number) {
  const restaurant = this.restaurants.find(r => r.id === id);

  if (restaurant) {

    const ancienneNote = this.rateUtilisateur[id];

    // Si le client a déjà noté, remplacer son ancienne note
    if (ancienneNote) {
      const index = restaurant.rate.indexOf(ancienneNote);

      if (index !== -1) {
        restaurant.rate.splice(index, 1);
      }
    }

    restaurant.rate.push(note);
    this.rateUtilisateur[id] = note;
  }
}

// Calculer la moyenne des rate
moyennerate(restaurant: Restaurant): number {
  const rate = restaurant.rate ;

  const somme = rate.reduce((total, note) => total + note, 0);

  return somme / rate.length;
}
}
