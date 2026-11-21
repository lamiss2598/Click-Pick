/**
 * URL du backend Spring Boot (server.port=8081 dans application.properties).
 */
export const API_URL = 'http://localhost:8081/api';

export const ENDPOINTS = {
  login: '/auth/login',
  register: '/auth/register',
  me: '/auth/me',
  restaurants: '/restaurants',
  restaurant: (id: number) => `/restaurants/${id}`,
  menuRestaurant: (id: number) => `/restaurants/${id}/menu`,
  creneaux: (id: number, date: string) => `/restaurants/${id}/creneaux?date=${encodeURIComponent(date)}`,
  monRestaurant: '/restaurateur/restaurant',
  mesProduits: '/restaurateur/produits',
  commandesRestaurateur: '/restaurateur/commandes',
  creerCommande: '/commandes',
};
