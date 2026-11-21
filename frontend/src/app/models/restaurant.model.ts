export interface Restaurant {
  id: number;
  nom: string;
  description: string;
  adresse: string;
  telephone: string;
  rate: number;
  categorie: string;
  imageUrl: string;
  restaurateurId: number;
  horaires: string;
  ouvert: boolean;
  statut: string;
  tempsPreparation: string;
}
