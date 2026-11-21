// Table PRODUIT (les plats d'un restaurant ; chaque restaurant a un MENU parent)
export interface Produit {
  id: number;
  nom: string;
  description: string;
  prix: number;
  image: string;
  categorie: string;     // CATEGORIE_P
  menuId: number | null;
  restaurantId: number;
  disponible: boolean;   // DISPONIBLE 0/1 côté base
}

/** Données envoyées pour créer ou modifier un plat. */
export interface ProduitForm {
  nom: string;
  description: string;
  prix: number;
  image: string;
  categorie: string;
  disponible: boolean;
}
