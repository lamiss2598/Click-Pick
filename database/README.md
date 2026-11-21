# Click&Pick : base de données (V1, Oracle 11g)

| Fichier | Contenu |
|---|---|
| `01_schema_11g.sql` | Supprime puis recrée les tables, contraintes, index, séquences et triggers. |
| `02_seed_11g.sql` | Jeu de données de démo, rejouable : 13 comptes, 11 restaurants, 33 plats, créneaux du jour. |

**Ces deux fichiers remplacent `tables.sql`, `Creneaux.sql`, `inserer_donnees.sql` et `oracle11g_sequences.sql`.**
Ne pas les exécuter en plus : le schéma de l'API est différent (voir ci-dessous).

## Mise en place (SQL Developer, connecté en CLICKPICK)

1. Arrêter Spring Boot.
2. Ouvrir `01_schema_11g.sql` puis « Exécuter le script » (F5). Les anciennes tables sont supprimées.
3. Ouvrir `02_seed_11g.sql` puis F5. La dernière requête doit afficher : 13 utilisateurs, 11 restaurants, 11 menus, 33 produits, 110 créneaux.
4. Redémarrer Spring Boot, vérifier `http://localhost:8081/api/health` (`"database":"UP"`).

À relancer `02_seed_11g.sql` avant chaque démo : les créneaux sont créés pour la date du jour.

## Comptes de test (mot de passe : `Test@1234`)

- Restaurateur : `restaurateur@clickpick.tn` (La Bella Vita), `resto2@clickpick.tn` à `resto11@clickpick.tn`
- Client : `client@clickpick.tn`, `client2@clickpick.tn`

Chez La Bella Vita, le créneau 12:00 est presque complet (1 place) et 13:00 est complet, pour tester le refus.

## Pourquoi votre ancien schéma ne fonctionnait pas avec l'API

- `CRENEAU` n'avait ni restaurant, ni places prises, et ses colonnes (`HEURE_DEBUT`, `CAPACITE`...) ne correspondaient pas au code ; `Creneaux.sql` échouait même sur `COMMANDE.ID_CRENEAU`, colonne inexistante.
- `RESTAURANT` n'avait pas `HORAIRES`, `OUVERT`, `TEMPS_PREPARATION` ; `COMMANDE` n'avait pas `ID_CRENEAU`.
- Les 11 restaurants appartenaient au même restaurateur : l'API en prévoit un seul par compte.
- Les séquences s'appelaient `UTILISATEUR_SEQ`... alors que le code utilise `SEQ_UTILISATEUR`...
- Le mot de passe du compte de démo n'était pas un vrai hash BCrypt.
