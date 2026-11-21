import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

import { messageErreur } from '../core/erreurs';
import { Creneau } from '../models/creneau.model';
import { Produit } from '../models/produit.model';
import { Restaurant } from '../models/restaurant.model';
import { CartService, aujourdhui } from '../services/cart.service';
import { CreneauService } from '../services/creneau.service';
import { RestaurantService } from '../services/restaurant.service';

@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.css'],
})
export class MenuComponent implements OnInit {
  restaurantId = 0;
  restaurant: Restaurant | null = null;
  produits: Produit[] = [];
  creneaux: Creneau[] = [];
  chargement = true;
  chargementCreneaux = false;
  erreur = '';
  readonly aujourdhui = aujourdhui();

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private restaurants: RestaurantService,
    private creneauService: CreneauService,
    public panier: CartService
  ) {}

  ngOnInit(): void {
    this.restaurantId = Number(this.route.snapshot.paramMap.get('id'));
    this.restaurants.getMenu(this.restaurantId).subscribe({
      next: (menu) => {
        this.restaurant = menu.restaurant;
        this.produits = menu.produits;
        this.chargement = false;
      },
      error: (e) => {
        this.erreur = messageErreur(e, 'Impossible de charger le menu.');
        this.chargement = false;
      },
    });
    if (!this.panier.dateRetrait() || this.panier.dateRetrait() < this.aujourdhui) {
      this.panier.dateRetrait.set(this.aujourdhui);
    }
    this.chargerCreneaux();
  }

  get dateSelectionnee(): string { return this.panier.dateRetrait(); }
  set dateSelectionnee(valeur: string) {
    this.panier.dateRetrait.set(valeur || this.aujourdhui);
    this.panier.heureRetrait.set('');
    this.panier.creneauId.set(null);
    this.chargerCreneaux();
  }

  get heureSelectionnee(): string { return this.panier.heureRetrait(); }

  chargerCreneaux(): void {
    if (!this.restaurantId || !this.dateSelectionnee) return;
    this.chargementCreneaux = true;
    this.creneauService.getDisponibles(this.restaurantId, this.dateSelectionnee).subscribe({
      next: (liste) => { this.creneaux = liste; this.chargementCreneaux = false; },
      error: (e) => {
        this.creneaux = [];
        this.chargementCreneaux = false;
        this.erreur = messageErreur(e, 'Impossible de charger les créneaux de retrait.');
      },
    });
  }

  choisirHeure(creneau: Creneau): void {
    if (!creneau.complet && creneau.placesRestantes > 0) {
      this.panier.heureRetrait.set(creneau.heure);
      this.panier.creneauId.set(creneau.id);
    }
  }

  ajouterAuPanier(produit: Produit): void { this.panier.ajouter(produit); }

  get panierDuRestaurant(): boolean { return this.panier.restaurantId() === this.restaurantId; }

  validerCommande(): void {
    if (!this.panier.lignes().length) return;
    if (!this.panier.creneauId()) {
      this.erreur = 'Veuillez choisir un créneau de retrait disponible.';
      return;
    }
    this.router.navigate(['/panier']);
  }
}
