import { Component, OnInit, signal } from '@angular/core';
import { Router } from '@angular/router';

import { messageErreur } from '../core/erreurs';
import { NouvelleCommande } from '../models/commande.model';
import { Restaurant } from '../models/restaurant.model';
import { AuthService } from '../services/auth.service';
import { CartService } from '../services/cart.service';
import { CommandeService } from '../services/commande.service';
import { RestaurantService } from '../services/restaurant.service';

@Component({
  selector: 'app-panier',
  templateUrl: './panier.html',
  styleUrls: ['./panier.css'],
})
export class PanierComponent implements OnInit {
  restaurant: Restaurant | null = null;

  envoiEnCours = signal(false);
  commandePassee = signal(false);
  erreur = signal('');

  constructor(
    public panier: CartService,
    public auth: AuthService,
    private restaurants: RestaurantService,
    private commandes: CommandeService,
    private router: Router
  ) {}

  ngOnInit(): void {
    const id = this.panier.restaurantId();
    if (id !== null) {
      this.restaurants.getById(id).subscribe({
        next: (r) => (this.restaurant = r),
        error: () => (this.restaurant = null),
      });
    }
  }

  get utilisateur() {
    return this.auth.utilisateur;
  }

  get peutCommander(): boolean {
    return this.auth.aLeRole('CLIENT');
  }

  get retraitComplet(): boolean {
    return !!this.panier.creneauId();
  }

  get retraitAffiche(): string {
    return this.retraitComplet ? `${this.panier.dateRetrait()} à ${this.panier.heureRetrait()}` : 'Non choisi';
  }

  vider(): void {
    if (confirm('Supprimer tous les articles du panier ?')) {
      this.panier.vider();
    }
  }

  allerConnexion(): void {
    this.router.navigate(['/auth'], { queryParams: { returnUrl: '/panier' } });
  }

  confirmer(): void {
    this.erreur.set('');

    const restaurantId = this.panier.restaurantId();
    const client = this.auth.utilisateur;

    if (this.panier.lignes().length === 0 || restaurantId === null) {
      return;
    }
    if (!client) {
      this.allerConnexion();
      return;
    }
    if (!this.retraitComplet) {
      this.erreur.set('Veuillez choisir une date et une heure de retrait depuis le menu du restaurant.');
      return;
    }

    const commande: NouvelleCommande = {
      restaurantId,
      creneauId: this.panier.creneauId()!,
      lignes: this.panier.lignes().map((l) => ({ produitId: l.produit.id, quantite: l.quantite })),
    };

    this.envoiEnCours.set(true);
    this.commandes.creer(commande).subscribe({
      next: () => {
        this.envoiEnCours.set(false);
        this.commandePassee.set(true);
        this.panier.vider();
      },
      error: (e) => {
        this.envoiEnCours.set(false);
        this.erreur.set(messageErreur(e, 'La commande n\'a pas pu être enregistrée.'));
      },
    });
  }
}
