# Click&Pick : API backend (V1)

Spring Boot 4 · Java 21 · Oracle · authentification par jeton JWT.
Couvre les US01 à US09 et le socle T02 (structure) et T03 (authentification).

## Démarrer

1. Créer la base avec les scripts du dossier `database/` (voir son README), puis charger le jeu de données.
2. Copier `.env.example` en `.env` et renseigner `DB_URL`, `DB_USER`, `DB_PASSWORD`, `JWT_SECRET`. Le fichier `.env` est dans le `.gitignore` : ne jamais le pousser.
3. Lancer : `mvn spring-boot:run` (ou depuis l'IDE : classe `ClickPickApplication`).
4. Tester : `GET http://localhost:8081/api/health` doit répondre `"api":"UP"` et `"database":"UP"`.

Les tests unitaires du jeton : `mvn test`.

## Organisation du code (`src/main/java/com/click_pick`)

| Dossier | Rôle |
|---|---|
| `controller/` | Routes HTTP. Aucune logique : appellent un service. `HealthController` est l'exemple documenté à copier. |
| `service/` | Règles métier (inscription, commande, créneaux...). |
| `repository/` | Accès base (Spring Data JPA). |
| `entity/` | Une classe par table. |
| `dto/` | Corps des requêtes (avec validation) et des réponses. |
| `security/` | Middlewares : `@Authenticated`, `@RequireRole`, `AuthInterceptor`, `JwtService`. |
| `exception/` | `ApiException` et gestion centralisée des erreurs. |
| `config/` | CORS (Angular sur `localhost:4200`), BCrypt, horloge. |

## Format de réponse commun

```json
{ "success": true,  "message": "OK", "data": { }, "errors": null }
{ "success": false, "message": "Cet e-mail est déjà utilisé", "data": null, "errors": null }
{ "success": false, "message": "Le prix doit être supérieur à 0", "data": null, "errors": { "prix": "Le prix doit être supérieur à 0" } }
```

`message` est toujours affichable tel quel à l'utilisateur. `errors` (champ → message) n'existe que pour les erreurs de formulaire (400).

## Authentification

`POST /api/auth/register` et `POST /api/auth/login` renvoient un `token`. Angular l'envoie ensuite sur chaque appel protégé :

```
Authorization: Bearer <token>
```

Le jeton contient l'identifiant et le rôle, il expire après 8 h (`clickpick.jwt.expiration-minutes`). Il n'y a pas de route de déconnexion : se déconnecter = supprimer le jeton côté Angular. `GET /api/auth/me` permet de restaurer la session au rechargement de la page.

Codes d'erreur : `401` jeton absent, invalide ou expiré (ou mauvais identifiants) · `403` mauvais rôle · `409` conflit (e-mail pris, créneau complet) · `400` données invalides · `404` introuvable.

## Routes V1

| US | Méthode et chemin | Accès | Rôle |
|---|---|---|---|
| T02 | `GET /api/health` | public | test API + base |
| US01 | `POST /api/auth/register` | public | crée un CLIENT ou un RESTAURATEUR |
| US02 | `POST /api/auth/login` | public | |
| US02 | `GET /api/auth/me` | connecté | session courante |
| US04 | `GET /api/restaurants?categorie=Pizza` | public | cartes de l'accueil, filtre facultatif |
| US04 | `GET /api/restaurants/categories` | public | catégories pour les boutons de filtre |
| US05 | `GET /api/restaurants/{id}` | public | |
| US05 | `GET /api/restaurants/{id}/menu` | public | plats disponibles regroupés par catégorie |
| US07 | `GET /api/restaurants/{id}/creneaux?date=AAAA-MM-JJ` | public | défaut : aujourd'hui, avec places restantes |
| US03 | `POST /api/restaurateur/produits` | RESTAURATEUR | ajoute un plat à **son** restaurant |
| US03 | `GET /api/restaurateur/produits` | RESTAURATEUR | tous ses plats |
| US03 | `GET /api/restaurateur/restaurant` | RESTAURATEUR | son restaurant |
| US08 | `POST /api/commandes` | CLIENT | valide le panier (paiement simulé) |
| US09 | `GET /api/restaurateur/commandes` | RESTAURATEUR | commandes de **son** restaurant, par heure de retrait |

### Exemples de corps

Inscription (le restaurateur peut préciser son restaurant ; sinon des valeurs par défaut sont créées) :
```json
{ "nom": "Ben Salah", "prenom": "Karim", "email": "karim@mail.tn", "motDePasse": "Test@1234",
  "telephone": "20123456", "role": "restaurateur",
  "restaurantNom": "Chez Karim", "adresse": "Tunis, Lac 2", "categorie": "Plats" }
```
Mot de passe : 8 caractères minimum, une majuscule, une minuscule, un chiffre, un caractère spécial (mêmes règles que le formulaire Angular). Le rôle est insensible à la casse (`client` ou `restaurateur`).

Ajout d'un plat :
```json
{ "nom": "Pizza Margherita", "description": "Tomate, mozzarella", "prix": 18.5, "categorie": "Plat" }
```

Commande (le panier reste dans Angular, il est envoyé une seule fois ; **le total est recalculé par le serveur** à partir des prix en base) :
```json
{ "restaurantId": 1, "creneauId": 14, "lignes": [ { "produitId": 3, "quantite": 2 }, { "produitId": 6, "quantite": 1 } ] }
```
Réponse `201` avec le numéro de commande (`data.numero`) et le statut `RECUE`.

## Règles métier à connaître

- **Créneaux (US07)** : règle simple de la V1, un nombre maximum de commandes par créneau (`CAPACITE_MAX`). Une commande prend une place ; le décompte est atomique côté base, donc deux clients ne peuvent pas prendre la dernière place ensemble. Créneau complet : `409` « Ce créneau est complet... », rien n'est enregistré.
- Quand un restaurant n'a aucun créneau pour un jour demandé (aujourd'hui à +7 jours), des créneaux par défaut sont créés automatiquement (11:00 à 20:00, capacité 5, voir `clickpick.creneaux.*` dans `application.properties`). Un restaurateur qui vient de s'inscrire peut donc recevoir des commandes sans préparation.
- Un restaurateur a **un seul** restaurant, créé à son inscription. Toutes ses routes travaillent sur le restaurant de son jeton, il ne peut pas voir ni modifier ceux des autres (US09 critère 3).
- Un restaurant fermé (`OUVERT = 0`) refuse les commandes.
- Paiement simulé en V1 : la commande est acceptée directement (US16 pour le paiement réel).

## Correspondance avec les modèles Angular actuels

| Angular (`Restaurant`) | API |
|---|---|
| `name` | `nom` |
| `category` | `categorie` |
| `area` | `adresse` |
| `rating` | `rate` |
| `status` | `statut` (`Ouvert` / `Fermé`) |
| `prepTime` | `tempsPreparation` |
| `imageUrl` | `imageUrl` |

## Ajouter une route (modèle à suivre)

1. Dans `dto/` : un `record` pour le corps (avec `@NotBlank`, `@Min`... et un message en français) et un pour la réponse.
2. Dans `service/` : la logique ; erreurs via `ApiException.notFound("...")`, `badRequest`, `conflict`...
3. Dans `controller/` : une méthode qui appelle le service et renvoie `ApiResponse.ok(...)`. Protéger avec `@RequireRole(Role.CLIENT)` ou `@Authenticated`, et déclarer le paramètre `AuthUser user` pour connaître l'utilisateur.
4. Prévenir le groupe avant de modifier un fichier partagé (`WebConfig`, `application.properties`).

## Limites connues de cette V1

- Le panier n'est pas stocké côté serveur (US06 : conservé par Angular).
- Aucun créneau passé du jour n'est refusé : seul un jour déjà écoulé l'est.
- Le jeton est implémenté sans bibliothèque externe (HMAC-SHA256 du JDK, signature et expiration vérifiées, algorithme unique). Si le groupe préfère, `JwtService` peut être remplacé par jjwt sans toucher au reste.
