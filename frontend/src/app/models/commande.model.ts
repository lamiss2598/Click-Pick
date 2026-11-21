export type StatutCommande = 'RECUE' | 'EN_PREPARATION' | 'PRETE' | 'RECUPEREE' | 'LIVREE' | 'ANNULEE';
export type ModeReception = 'RETRAIT';

export const STATUTS: { valeur: StatutCommande; libelle: string }[] = [
  { valeur: 'RECUE', libelle: 'Reçue' },
  { valeur: 'EN_PREPARATION', libelle: 'En préparation' },
  { valeur: 'PRETE', libelle: 'Prête' },
  { valeur: 'RECUPEREE', libelle: 'Récupérée' },
  { valeur: 'LIVREE', libelle: 'Livrée' },
  { valeur: 'ANNULEE', libelle: 'Annulée' },
];

export interface LigneCommande {
  produitId: number;
  produitNom: string;
  quantite: number;
  prixUnitaire: number;
}

export interface Commande {
  id: number;
  dateCommande: string;
  dateRetrait: string;
  heureRetrait: string;
  statut: StatutCommande;
  modeReception: ModeReception;
  montantTotal: number;
  clientId: number;
  clientNom: string;
  restaurantId: number;
  lignes: LigneCommande[];
}

/** Format exact attendu par POST /api/commandes. Le prix est recalculé par le serveur. */
export interface NouvelleCommande {
  restaurantId: number;
  creneauId: number;
  lignes: { produitId: number; quantite: number }[];
}
