import { Component, OnInit } from '@angular/core';

import { messageErreur } from '../core/erreurs';
import { Restaurant } from '../models/restaurant.model';
import { RestaurantService } from '../services/restaurant.service';

@Component({
  selector: 'app-liste-restaurant',
  templateUrl: './liste-restaurant.component.html',
  styleUrls: ['./liste-restaurant.component.css'],
})
export class ListeRestaurantComponent implements OnInit {
  restaurants: Restaurant[] = [];
  chargement = true;
  erreur = '';

  categorieSelectionnee = 'Tous';

  // Catégories proposées : la valeur est celle de la colonne CATEGORIE en base.
  categories = [
    { valeur: 'Tous', libelle: 'Tous' },
    { valeur: 'Pizza', libelle: 'Pizza' },
    { valeur: 'Burger', libelle: 'Burger' },
    { valeur: 'Sushi', libelle: 'Sushi' },
    { valeur: 'Plats', libelle: 'Traditionnel' },
    { valeur: 'Tacos', libelle: 'Tacos' },
    { valeur: 'Salades', libelle: 'Salades' },
    { valeur: 'Desserts', libelle: 'Desserts' },
    { valeur: 'Grillades', libelle: 'Grillades' },
    { valeur: 'Café', libelle: 'Café' },
  ];

  constructor(private service: RestaurantService) {}

  ngOnInit(): void {
    this.service.getAll().subscribe({
      next: (liste) => {
        this.restaurants = liste;
        this.chargement = false;
      },
      error: (e) => {
        this.erreur = messageErreur(e, 'Impossible de charger les restaurants.');
        this.chargement = false;
      },
    });
  }

  get restaurantsFiltres(): Restaurant[] {
    if (this.categorieSelectionnee === 'Tous') {
      return this.restaurants;
    }
    return this.restaurants.filter((r) => r.categorie === this.categorieSelectionnee);
  }

  filtrer(categorie: string): void {
    this.categorieSelectionnee = categorie;
  }
}
