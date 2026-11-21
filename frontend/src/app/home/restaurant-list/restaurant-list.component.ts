import { Component, Input, OnInit } from '@angular/core';

import { messageErreur } from '../../core/erreurs';
import { Restaurant } from '../../models/restaurant.model';
import { RestaurantService } from '../../services/restaurant.service';

@Component({
  selector: 'app-restaurant-list',
  templateUrl: './restaurant-list.component.html',
  styleUrls: ['./restaurant-list.component.css'],
})
export class RestaurantListComponent implements OnInit {
  @Input() category: string | null = null;
  @Input() searchTerm = '';

  tous: Restaurant[] = [];
  chargement = true;
  erreur = '';

  constructor(private service: RestaurantService) {}

  ngOnInit(): void {
    this.service.getAll().subscribe({
      next: (liste) => {
        this.tous = liste;
        this.chargement = false;
      },
      error: (e) => {
        this.erreur = messageErreur(e, 'Impossible de charger les restaurants.');
        this.chargement = false;
      },
    });
  }

  get restaurants(): Restaurant[] {
    const recherche = this.searchTerm.trim().toLocaleLowerCase();
    return this.tous.filter((restaurant) => {
      const bonneCategorie = !this.category || restaurant.categorie === this.category;
      const texte = `${restaurant.nom} ${restaurant.categorie} ${restaurant.adresse}`.toLocaleLowerCase();
      return bonneCategorie && (!recherche || texte.includes(recherche));
    });
  }

  trackById(_index: number, restaurant: Restaurant): number {
    return restaurant.id;
  }
}
