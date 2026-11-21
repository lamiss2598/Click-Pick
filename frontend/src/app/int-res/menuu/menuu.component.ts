import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subject, filter, switchMap, takeUntil, tap } from 'rxjs';

import { messageErreur } from '../../core/erreurs';
import { Produit, ProduitForm } from '../../models/produit.model';
import { Restaurant } from '../../models/restaurant.model';
import { ProduitService } from '../../services/produit.service';
import { EspaceRestaurateurService } from '../espace-restaurateur.service';

@Component({
  selector: 'app-menuu',
  templateUrl: './menuu.component.html',
  styleUrls: ['./menuu.component.css'],
})
export class MenuuComponent implements OnInit, OnDestroy {
  restaurant: Restaurant | null = null;
  plats: Produit[] = [];
  chargement = false;
  envoi = false;
  erreur = '';
  message = '';
  nouveauPlat: ProduitForm = this.formulaireVide();
  private fin$ = new Subject<void>();

  constructor(private espace: EspaceRestaurateurService, private produits: ProduitService) {}

  ngOnInit(): void {
    this.espace.selection$
      .pipe(
        filter((r): r is Restaurant => r !== null),
        tap((r) => { this.restaurant = r; this.chargement = true; }),
        switchMap(() => this.produits.getMesProduits()),
        takeUntil(this.fin$)
      )
      .subscribe({
        next: (liste) => { this.plats = liste; this.chargement = false; },
        error: (e) => { this.erreur = messageErreur(e, 'Impossible de charger les plats.'); this.chargement = false; },
      });
  }

  ngOnDestroy(): void { this.fin$.next(); this.fin$.complete(); }

  get categories(): string[] { return [...new Set(this.plats.map((p) => p.categorie).filter(Boolean))]; }

  ajouterPlat(): void {
    this.erreur = '';
    this.message = '';
    if (!this.nouveauPlat.nom.trim() || !(this.nouveauPlat.prix > 0) || !this.nouveauPlat.categorie.trim()) {
      this.erreur = 'Le nom, un prix supérieur à 0 et la catégorie sont obligatoires.';
      return;
    }
    this.envoi = true;
    this.produits.create(this.nouveauPlat).subscribe({
      next: (plat) => {
        this.plats = [...this.plats, plat];
        this.nouveauPlat = this.formulaireVide();
        this.envoi = false;
        this.message = 'Le plat a été ajouté au menu.';
      },
      error: (e) => { this.envoi = false; this.erreur = messageErreur(e, 'Le plat n’a pas pu être ajouté.'); },
    });
  }

  private formulaireVide(): ProduitForm {
    return { nom: '', description: '', prix: 0, image: '', categorie: '', disponible: true };
  }
}
