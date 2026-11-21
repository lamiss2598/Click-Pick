import { Injectable, computed, effect, signal } from '@angular/core';
import { Produit } from '../models/produit.model';

export interface LignePanier {
  produit: Produit;
  quantite: number;
}

interface EtatPanier {
  restaurantId: number | null;
  lignes: LignePanier[];
  dateRetrait: string;
  heureRetrait: string;
  creneauId: number | null;
}

const CLE_PANIER = 'clickpick.panier';

export function aujourdhui(): string {
  const d = new Date();
  const mois = String(d.getMonth() + 1).padStart(2, '0');
  const jour = String(d.getDate()).padStart(2, '0');
  return `${d.getFullYear()}-${mois}-${jour}`;
}

/** Panier unique, partagé entre la page menu et la page panier, conservé après un rechargement. */
@Injectable({ providedIn: 'root' })
export class CartService {
  readonly restaurantId = signal<number | null>(null);
  readonly lignes = signal<LignePanier[]>([]);
  readonly dateRetrait = signal(aujourdhui());
  readonly heureRetrait = signal('');
  readonly creneauId = signal<number | null>(null);

  readonly nombreArticles = computed(() => this.lignes().reduce((n, l) => n + l.quantite, 0));
  readonly total = computed(() => this.lignes().reduce((t, l) => t + l.produit.prix * l.quantite, 0));

  constructor() {
    this.restaurer();
    effect(() => {
      const etat: EtatPanier = {
        restaurantId: this.restaurantId(),
        lignes: this.lignes(),
        dateRetrait: this.dateRetrait(),
        heureRetrait: this.heureRetrait(),
        creneauId: this.creneauId(),
      };
      try {
        localStorage.setItem(CLE_PANIER, JSON.stringify(etat));
      } catch {
        /* stockage indisponible : le panier reste simplement en mémoire */
      }
    });
  }

  /** Ajoute un plat. Un panier ne contient que les plats d'un seul restaurant. */
  ajouter(produit: Produit): boolean {
    if (!produit.disponible) {
      return false;
    }
    if (this.restaurantId() !== null && this.restaurantId() !== produit.restaurantId && this.lignes().length > 0) {
      const continuer = confirm('Votre panier contient des plats d\'un autre restaurant. Le vider et continuer ?');
      if (!continuer) {
        return false;
      }
      this.vider();
    }
    this.restaurantId.set(produit.restaurantId);
    this.lignes.update((liste) => {
      const existante = liste.find((l) => l.produit.id === produit.id);
      return existante
        ? liste.map((l) => (l.produit.id === produit.id ? { ...l, quantite: l.quantite + 1 } : l))
        : [...liste, { produit, quantite: 1 }];
    });
    return true;
  }

  augmenter(produitId: number): void {
    this.lignes.update((liste) =>
      liste.map((l) => (l.produit.id === produitId ? { ...l, quantite: l.quantite + 1 } : l))
    );
  }

  diminuer(produitId: number): void {
    this.lignes.update((liste) =>
      liste
        .map((l) => (l.produit.id === produitId ? { ...l, quantite: l.quantite - 1 } : l))
        .filter((l) => l.quantite > 0)
    );
    this.reinitialiserSiVide();
  }

  retirer(produitId: number): void {
    this.lignes.update((liste) => liste.filter((l) => l.produit.id !== produitId));
    this.reinitialiserSiVide();
  }

  vider(): void {
    this.lignes.set([]);
    this.restaurantId.set(null);
    this.heureRetrait.set('');
    this.creneauId.set(null);
  }

  private reinitialiserSiVide(): void {
    if (this.lignes().length === 0) {
      this.restaurantId.set(null);
    }
  }

  private restaurer(): void {
    try {
      const brut = localStorage.getItem(CLE_PANIER);
      if (!brut) {
        return;
      }
      const etat = JSON.parse(brut) as EtatPanier;
      this.restaurantId.set(etat.restaurantId ?? null);
      this.lignes.set(Array.isArray(etat.lignes) ? etat.lignes : []);
      // Une date de retrait passée n'est plus valable.
      this.dateRetrait.set(etat.dateRetrait && etat.dateRetrait >= aujourdhui() ? etat.dateRetrait : aujourdhui());
      this.heureRetrait.set(etat.heureRetrait ?? '');
      this.creneauId.set(etat.creneauId ?? null);
    } catch {
      /* contenu illisible : on repart d'un panier vide */
    }
  }
}
