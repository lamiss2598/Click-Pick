import { Component } from '@angular/core';
import { Restaurant } from './liste-restaurant.models';
import { RESTAURANTS } from './restaurants.data';
@Component({
  selector: 'app-liste-restaurant',
  templateUrl: './liste-restaurant.component.html',
  styleUrls: ['./liste-restaurant.component.css']
})
export class ListeRestaurantComponent {
  restaurants: Restaurant[] = RESTAURANTS;

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
