import { Restaurant } from './liste-restaurant.models';

/**
 * SOURCE UNIQUE des restaurants.
 * L'id doit correspondre à `restaurantId` dans menu.component.ts
 * (la route /menu/:id affiche les plats de ce restaurant).
 * Les logos sont dans src/assets/logo_rest/.
 */
export const RESTAURANTS: Restaurant[] = [
  { id: 1, nom: 'La Bella Vita', category: 'Pizza',
    description: 'Cuisine italienne authentique : pizzas, pâtes et spécialités maison.',
    adresse: 'Tunis, Lac 1', imageUrl: 'assets/logo_rest/La_Bella_Vita.jpg',
    rate: [4.8], status: 'Ouvert', prepTime: '20–30 min' },
  { id: 2, nom: 'Borcelle', category: 'Burger',
    description: 'Burgers gourmands, sandwichs et délicieux repas rapides.',
    adresse: 'Tunis, Centre Ville', imageUrl: 'assets/logo_rest/Borcelle.png',
    rate: [4.7], status: 'Ouvert', prepTime: '10–15 min' },
  { id: 3, nom: 'Sushi House', category: 'Sushi',
    description: 'Découvrez les saveurs japonaises et nos sushis préparés avec soin.',
    adresse: 'Tunis, Les Berges du Lac', imageUrl: 'assets/logo_rest/sushi_house.jpg',
    rate: [4.6], status: 'Ouvert', prepTime: '20–25 min' },
  { id: 4, nom: 'Bab Al Madina', category: 'Plats',
    description: 'Une cuisine tunisienne traditionnelle avec des recettes généreuses.',
    adresse: 'Tunis, La Marsa', imageUrl: 'assets/logo_rest/BAB_Al_Madina.jpg',
    rate: [4.9], status: 'Ouvert', prepTime: '25–30 min' },
  { id: 5, nom: 'Tacos Factory', category: 'Tacos',
    description: 'Tacos, tenders et sauces maison pour tous les goûts.',
    adresse: 'Ariana, Ennasr', imageUrl: 'assets/logo_rest/tacos.jpg',
    rate: [4.5], status: 'Ouvert', prepTime: '15–20 min' },
  { id: 6, nom: 'Green Garden', category: 'Salades',
    description: 'Salades fraîches, bowls équilibrés et cuisine végétarienne.',
    adresse: 'Tunis, Mutuelleville', imageUrl: 'assets/logo_rest/green garden.jpg',
    rate: [4.7], status: 'Ouvert', prepTime: '10–15 min' },
  { id: 7, nom: 'Sweet Corner', category: 'Desserts',
    description: 'Pâtisseries, crêpes, gaufres et desserts gourmands.',
    adresse: 'Tunis, Centre Urbain Nord', imageUrl: 'assets/logo_rest/sweet_corner.jpg',
    rate: [4.8], status: 'Ouvert', prepTime: '10–15 min' },
  { id: 8, nom: 'Grill House', category: 'Grillades',
    description: 'Viandes grillées, brochettes et spécialités au barbecue.',
    adresse: 'Tunis, Manar', imageUrl: 'assets/logo_rest/GrillHouse.png',
    rate: [4.6], status: 'Ouvert', prepTime: '25–35 min' },
  { id: 9, nom: 'Corner Café', category: 'Café',
    description: 'Un café chaleureux proposant cafés, boissons fraîches et pâtisseries.',
    adresse: 'Tunis, La Marsa', imageUrl: 'assets/logo_rest/corner_café.png',
    rate: [4.8], status: 'Ouvert', prepTime: '5–10 min' },
  { id: 10, nom: 'Coffee Lab', category: 'Café',
    description: 'Un espace moderne pour déguster du café et des spécialités gourmandes.',
    adresse: 'Tunis, Les Berges du Lac', imageUrl: 'assets/logo_rest/coffee_lab.jpg',
    rate: [4.7], status: 'Ouvert', prepTime: '5–10 min' },
  { id: 11, nom: 'Gathered', category: 'Café',
    description: 'Un café convivial avec des petits-déjeuners et des desserts maison.',
    adresse: 'Tunis, Centre Ville', imageUrl: 'assets/logo_rest/gathered.png',
    rate: [4.9], status: 'Nouveau', prepTime: '10–15 min' },
];
