export interface Restaurant {
  id: number;
  nom: string;
  description: string;
  adresse: string;
  imageUrl: string;
  rate: number[];
  category: string;
  // Champs utilisés par la page d'accueil (valeurs de démonstration)
  status?: 'Ouvert' | 'Nouveau' | 'Fermé';
  prepTime?: string;
}
