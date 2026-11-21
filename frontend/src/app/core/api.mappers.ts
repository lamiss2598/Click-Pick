import { Commande, LigneCommande, StatutCommande } from '../models/commande.model';
import { Creneau } from '../models/creneau.model';
import { Produit } from '../models/produit.model';
import { Restaurant } from '../models/restaurant.model';
import { Session, Utilisateur } from '../models/utilisateur.model';

type Brut = any;

function premier(b: Brut, ...cles: string[]): any {
  for (const cle of cles) if (b?.[cle] !== undefined && b[cle] !== null) return b[cle];
  return undefined;
}

export function versRestaurant(b: Brut): Restaurant {
  return {
    id: Number(premier(b, 'id', 'idRestaurant', 'id_restaurant')),
    nom: premier(b, 'nom', 'name') ?? '',
    description: premier(b, 'description') ?? '',
    adresse: premier(b, 'adresse', 'address') ?? '',
    telephone: premier(b, 'telephone') ?? '',
    rate: Number(premier(b, 'rate', 'note') ?? 0),
    categorie: premier(b, 'categorie', 'category') ?? '',
    imageUrl: premier(b, 'imageUrl', 'imageurl', 'image_url') ?? '',
    restaurateurId: Number(premier(b, 'restaurateurId', 'idRestaurateur', 'id_restaurateur') ?? 0),
    horaires: premier(b, 'horaires') ?? '',
    ouvert: premier(b, 'ouvert') ?? true,
    statut: premier(b, 'statut') ?? '',
    tempsPreparation: premier(b, 'tempsPreparation') ?? '',
  };
}

export function versProduit(b: Brut): Produit {
  return {
    id: Number(premier(b, 'id', 'idProduit', 'id_produit')),
    nom: premier(b, 'nom', 'name') ?? '',
    description: premier(b, 'description') ?? '',
    prix: Number(premier(b, 'prix', 'price') ?? 0),
    image: premier(b, 'image', 'imageUrl') ?? '',
    categorie: premier(b, 'categorie', 'categorieP', 'categorie_p') ?? '',
    menuId: null,
    restaurantId: Number(premier(b, 'restaurantId', 'idRestaurant', 'id_restaurant') ?? 0),
    disponible: premier(b, 'disponible', 'available') === true || premier(b, 'disponible', 'available') === 1,
  };
}

export function versUtilisateur(b: Brut): Utilisateur {
  return {
    id: Number(premier(b, 'id', 'idUtilisateur', 'id_utilisateur')),
    nom: premier(b, 'nom') ?? '',
    prenom: premier(b, 'prenom') ?? '',
    email: premier(b, 'email') ?? '',
    telephone: premier(b, 'telephone') ?? '',
    role: String(premier(b, 'role') ?? 'CLIENT').toUpperCase() as Utilisateur['role'],
  };
}

export function versSession(b: Brut): Session {
  return { token: premier(b, 'token', 'accessToken', 'jwt') ?? '', utilisateur: versUtilisateur(b.utilisateur ?? b.user ?? b) };
}

export function versCreneau(b: Brut): Creneau {
  return {
    id: Number(b.id),
    date: b.date ?? '',
    heure: b.heure ?? '',
    capaciteMax: Number(b.capaciteMax ?? 0),
    placesPrises: Number(b.placesPrises ?? 0),
    placesRestantes: Number(b.placesRestantes ?? 0),
    complet: Boolean(b.complet),
  };
}

function versLigne(b: Brut): LigneCommande {
  return {
    produitId: Number(premier(b, 'produitId', 'idProduit') ?? 0),
    produitNom: premier(b, 'nom', 'produitNom', 'nomProduit') ?? '',
    quantite: Number(premier(b, 'quantite') ?? 0),
    prixUnitaire: Number(premier(b, 'prixUnitaire', 'prix_unitaire') ?? 0),
  };
}

export function versCommande(b: Brut): Commande {
  return {
    id: Number(premier(b, 'numero', 'id', 'idCommande', 'id_commande')),
    dateCommande: premier(b, 'dateCommande', 'date_commande') ?? '',
    dateRetrait: premier(b, 'dateRetrait', 'date_retrait') ?? '',
    heureRetrait: premier(b, 'heureRetrait', 'heure_retrait') ?? '',
    statut: String(premier(b, 'statut') ?? 'RECUE').toUpperCase() as StatutCommande,
    modeReception: 'RETRAIT',
    montantTotal: Number(premier(b, 'montantTotal', 'montant_total') ?? 0),
    clientId: 0,
    clientNom: premier(b, 'clientNom') ?? 'Client',
    restaurantId: Number(premier(b, 'restaurantId', 'idRestaurant', 'id_restaurant') ?? 0),
    lignes: ((premier(b, 'lignes') ?? []) as Brut[]).map(versLigne),
  };
}
