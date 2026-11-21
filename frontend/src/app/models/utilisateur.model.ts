// Table UTILISATEUR : ROLE IN ('CLIENT', 'RESTAURATEUR')
export type Role = 'CLIENT' | 'RESTAURATEUR';

export interface Utilisateur {
  id: number;
  nom: string;
  prenom: string;
  email: string;
  telephone: string;
  role: Role;
}

export interface Session {
  token: string;
  utilisateur: Utilisateur;
}

export interface LoginRequest {
  email: string;
  motDePasse: string;
}

export interface RegisterRequest {
  nom: string;
  prenom: string;
  email: string;
  motDePasse: string;
  telephone: string;
  role: Role;
  restaurantNom?: string;
  adresse?: string;
  categorie?: string;
}
