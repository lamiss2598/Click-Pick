-- =====================================================================
-- Click&Pick - Jeu de données de démonstration (T06)       SGBD : Oracle 11g
--
-- À lancer APRÈS 01_schema_11g.sql. REJOUABLE : vide les données puis les réinsère
-- (à relancer avant chaque démonstration, pour avoir des créneaux à la date du jour).
-- Fichier en UTF-8.
--
-- Comptes de test (mot de passe de TOUS les comptes : Test@1234)
--   Restaurateur : restaurateur@clickpick.tn -> La Bella Vita (id 1)
--                  resto2@clickpick.tn ... resto11@clickpick.tn -> restaurants 2 à 11
--   Client       : client@clickpick.tn  et  client2@clickpick.tn
--
-- Un restaurateur = un restaurant (comme l'exige l'API).
-- Créneaux : AUJOURD'HUI, 11:00 à 20:00, capacité 5 par créneau et par restaurant.
--   La Bella Vita (id 1) : 12:00 presque complet (1 place restante), 13:00 complet.
-- =====================================================================
SET DEFINE OFF;

-- 1. Remise à zéro (ordre inverse des clés étrangères)
DELETE FROM LIGNE_COMMANDE;
DELETE FROM COMMANDE;
DELETE FROM CRENEAU;
DELETE FROM PRODUIT;
DELETE FROM MENU;
DELETE FROM RESTAURANT;
DELETE FROM UTILISATEUR;

-- 2. Utilisateurs (mot de passe "Test@1234", haché en BCrypt)
INSERT INTO UTILISATEUR (ID_UTILISATEUR, NOM, PRENOM, EMAIL, MOT_DE_PASSE, TELEPHONE, ROLE)
VALUES (1, 'Ben Salah', 'Karim', 'restaurateur@clickpick.tn', '$2b$10$Qx7LrT2mVb9aKd3sEw5nHupUefXwsB1BV16jzN9CYIC3yIMXrV022', '71 000 001', 'RESTAURATEUR');
INSERT INTO UTILISATEUR (ID_UTILISATEUR, NOM, PRENOM, EMAIL, MOT_DE_PASSE, TELEPHONE, ROLE)
VALUES (2, 'Gharbi', 'Sami', 'resto2@clickpick.tn', '$2b$10$Qx7LrT2mVb9aKd3sEw5nHupUefXwsB1BV16jzN9CYIC3yIMXrV022', '71 000 002', 'RESTAURATEUR');
INSERT INTO UTILISATEUR (ID_UTILISATEUR, NOM, PRENOM, EMAIL, MOT_DE_PASSE, TELEPHONE, ROLE)
VALUES (3, 'Trabelsi', 'Nadia', 'resto3@clickpick.tn', '$2b$10$Qx7LrT2mVb9aKd3sEw5nHupUefXwsB1BV16jzN9CYIC3yIMXrV022', '71 000 003', 'RESTAURATEUR');
INSERT INTO UTILISATEUR (ID_UTILISATEUR, NOM, PRENOM, EMAIL, MOT_DE_PASSE, TELEPHONE, ROLE)
VALUES (4, 'Jlassi', 'Mehdi', 'resto4@clickpick.tn', '$2b$10$Qx7LrT2mVb9aKd3sEw5nHupUefXwsB1BV16jzN9CYIC3yIMXrV022', '71 000 004', 'RESTAURATEUR');
INSERT INTO UTILISATEUR (ID_UTILISATEUR, NOM, PRENOM, EMAIL, MOT_DE_PASSE, TELEPHONE, ROLE)
VALUES (5, 'Mansouri', 'Aya', 'resto5@clickpick.tn', '$2b$10$Qx7LrT2mVb9aKd3sEw5nHupUefXwsB1BV16jzN9CYIC3yIMXrV022', '71 000 005', 'RESTAURATEUR');
INSERT INTO UTILISATEUR (ID_UTILISATEUR, NOM, PRENOM, EMAIL, MOT_DE_PASSE, TELEPHONE, ROLE)
VALUES (6, 'Hammami', 'Yassine', 'resto6@clickpick.tn', '$2b$10$Qx7LrT2mVb9aKd3sEw5nHupUefXwsB1BV16jzN9CYIC3yIMXrV022', '71 000 006', 'RESTAURATEUR');
INSERT INTO UTILISATEUR (ID_UTILISATEUR, NOM, PRENOM, EMAIL, MOT_DE_PASSE, TELEPHONE, ROLE)
VALUES (7, 'Chaabane', 'Rim', 'resto7@clickpick.tn', '$2b$10$Qx7LrT2mVb9aKd3sEw5nHupUefXwsB1BV16jzN9CYIC3yIMXrV022', '71 000 007', 'RESTAURATEUR');
INSERT INTO UTILISATEUR (ID_UTILISATEUR, NOM, PRENOM, EMAIL, MOT_DE_PASSE, TELEPHONE, ROLE)
VALUES (8, 'Ferchichi', 'Omar', 'resto8@clickpick.tn', '$2b$10$Qx7LrT2mVb9aKd3sEw5nHupUefXwsB1BV16jzN9CYIC3yIMXrV022', '71 000 008', 'RESTAURATEUR');
INSERT INTO UTILISATEUR (ID_UTILISATEUR, NOM, PRENOM, EMAIL, MOT_DE_PASSE, TELEPHONE, ROLE)
VALUES (9, 'Belhadj', 'Salma', 'resto9@clickpick.tn', '$2b$10$Qx7LrT2mVb9aKd3sEw5nHupUefXwsB1BV16jzN9CYIC3yIMXrV022', '71 000 009', 'RESTAURATEUR');
INSERT INTO UTILISATEUR (ID_UTILISATEUR, NOM, PRENOM, EMAIL, MOT_DE_PASSE, TELEPHONE, ROLE)
VALUES (10, 'Zouari', 'Walid', 'resto10@clickpick.tn', '$2b$10$Qx7LrT2mVb9aKd3sEw5nHupUefXwsB1BV16jzN9CYIC3yIMXrV022', '71 000 010', 'RESTAURATEUR');
INSERT INTO UTILISATEUR (ID_UTILISATEUR, NOM, PRENOM, EMAIL, MOT_DE_PASSE, TELEPHONE, ROLE)
VALUES (11, 'Khelifi', 'Lina', 'resto11@clickpick.tn', '$2b$10$Qx7LrT2mVb9aKd3sEw5nHupUefXwsB1BV16jzN9CYIC3yIMXrV022', '71 000 011', 'RESTAURATEUR');
INSERT INTO UTILISATEUR (ID_UTILISATEUR, NOM, PRENOM, EMAIL, MOT_DE_PASSE, TELEPHONE, ROLE)
VALUES (12, 'Client', 'Test', 'client@clickpick.tn', '$2b$10$Qx7LrT2mVb9aKd3sEw5nHupUefXwsB1BV16jzN9CYIC3yIMXrV022', '20 123 456', 'CLIENT');
INSERT INTO UTILISATEUR (ID_UTILISATEUR, NOM, PRENOM, EMAIL, MOT_DE_PASSE, TELEPHONE, ROLE)
VALUES (13, 'Client', 'Deux', 'client2@clickpick.tn', '$2b$10$Qx7LrT2mVb9aKd3sEw5nHupUefXwsB1BV16jzN9CYIC3yIMXrV022', '22 654 321', 'CLIENT');

-- 3. Restaurants (ids 1 à 11 = ceux du frontend), un propriétaire chacun
INSERT INTO RESTAURANT (ID_RESTAURANT, NOM, DESCRIPTION, ADRESSE, TELEPHONE, RATE, CATEGORIE, IMAGEURL, HORAIRES, OUVERT, TEMPS_PREPARATION, ID_RESTAURATEUR)
VALUES (1, 'La Bella Vita', 'Cuisine italienne authentique : pizzas, pâtes et spécialités maison.', 'Tunis, Lac 1', '71 100 001', 4.80, 'Pizza', 'assets/logo_rest/La_Bella_Vita.jpg', '11:00 - 21:00', 1, '20-30 min', 1);
INSERT INTO RESTAURANT (ID_RESTAURANT, NOM, DESCRIPTION, ADRESSE, TELEPHONE, RATE, CATEGORIE, IMAGEURL, HORAIRES, OUVERT, TEMPS_PREPARATION, ID_RESTAURATEUR)
VALUES (2, 'Borcelle', 'Burgers gourmands, sandwichs et délicieux repas rapides.', 'Tunis, Centre Ville', '71 100 002', 4.70, 'Burger', 'assets/logo_rest/Borcelle.png', '11:00 - 21:00', 1, '10-15 min', 2);
INSERT INTO RESTAURANT (ID_RESTAURANT, NOM, DESCRIPTION, ADRESSE, TELEPHONE, RATE, CATEGORIE, IMAGEURL, HORAIRES, OUVERT, TEMPS_PREPARATION, ID_RESTAURATEUR)
VALUES (3, 'Sushi House', 'Découvrez les saveurs japonaises et nos sushis préparés avec soin.', 'Tunis, Les Berges du Lac', '71 100 003', 4.60, 'Sushi', 'assets/logo_rest/sushi_house.jpg', '11:00 - 21:00', 1, '20-25 min', 3);
INSERT INTO RESTAURANT (ID_RESTAURANT, NOM, DESCRIPTION, ADRESSE, TELEPHONE, RATE, CATEGORIE, IMAGEURL, HORAIRES, OUVERT, TEMPS_PREPARATION, ID_RESTAURATEUR)
VALUES (4, 'Bab Al Madina', 'Une cuisine tunisienne traditionnelle avec des recettes généreuses.', 'Tunis, La Marsa', '71 100 004', 4.90, 'Plats', 'assets/logo_rest/BAB_Al_Madina.jpg', '11:00 - 21:00', 1, '25-30 min', 4);
INSERT INTO RESTAURANT (ID_RESTAURANT, NOM, DESCRIPTION, ADRESSE, TELEPHONE, RATE, CATEGORIE, IMAGEURL, HORAIRES, OUVERT, TEMPS_PREPARATION, ID_RESTAURATEUR)
VALUES (5, 'Tacos Factory', 'Tacos, tenders et sauces maison pour tous les goûts.', 'Ariana, Ennasr', '71 100 005', 4.50, 'Tacos', 'assets/logo_rest/tacos.jpg', '11:00 - 21:00', 1, '15-20 min', 5);
INSERT INTO RESTAURANT (ID_RESTAURANT, NOM, DESCRIPTION, ADRESSE, TELEPHONE, RATE, CATEGORIE, IMAGEURL, HORAIRES, OUVERT, TEMPS_PREPARATION, ID_RESTAURATEUR)
VALUES (6, 'Green Garden', 'Salades fraîches, bowls équilibrés et cuisine végétarienne.', 'Tunis, Mutuelleville', '71 100 006', 4.70, 'Salades', 'assets/logo_rest/green garden.jpg', '11:00 - 21:00', 1, '10-15 min', 6);
INSERT INTO RESTAURANT (ID_RESTAURANT, NOM, DESCRIPTION, ADRESSE, TELEPHONE, RATE, CATEGORIE, IMAGEURL, HORAIRES, OUVERT, TEMPS_PREPARATION, ID_RESTAURATEUR)
VALUES (7, 'Sweet Corner', 'Pâtisseries, crêpes, gaufres et desserts gourmands.', 'Tunis, Centre Urbain Nord', '71 100 007', 4.80, 'Desserts', 'assets/logo_rest/sweet_corner.jpg', '11:00 - 21:00', 1, '15-25 min', 7);
INSERT INTO RESTAURANT (ID_RESTAURANT, NOM, DESCRIPTION, ADRESSE, TELEPHONE, RATE, CATEGORIE, IMAGEURL, HORAIRES, OUVERT, TEMPS_PREPARATION, ID_RESTAURATEUR)
VALUES (8, 'Grill House', 'Viandes grillées, brochettes et spécialités au barbecue.', 'Tunis, Manar', '71 100 008', 4.60, 'Grillades', 'assets/logo_rest/GrillHouse.png', '11:00 - 21:00', 1, '15-25 min', 8);
INSERT INTO RESTAURANT (ID_RESTAURANT, NOM, DESCRIPTION, ADRESSE, TELEPHONE, RATE, CATEGORIE, IMAGEURL, HORAIRES, OUVERT, TEMPS_PREPARATION, ID_RESTAURATEUR)
VALUES (9, 'Corner Café', 'Un café chaleureux proposant cafés, boissons fraîches et pâtisseries.', 'Tunis, La Marsa', '71 100 009', 4.80, 'Café', 'assets/logo_rest/corner_café.png', '11:00 - 21:00', 1, '15-25 min', 9);
INSERT INTO RESTAURANT (ID_RESTAURANT, NOM, DESCRIPTION, ADRESSE, TELEPHONE, RATE, CATEGORIE, IMAGEURL, HORAIRES, OUVERT, TEMPS_PREPARATION, ID_RESTAURATEUR)
VALUES (10, 'Coffee Lab', 'Un espace moderne pour déguster du café et des spécialités gourmandes.', 'Tunis, Les Berges du Lac', '71 100 010', 4.70, 'Café', 'assets/logo_rest/coffee_lab.jpg', '11:00 - 21:00', 1, '15-25 min', 10);
INSERT INTO RESTAURANT (ID_RESTAURANT, NOM, DESCRIPTION, ADRESSE, TELEPHONE, RATE, CATEGORIE, IMAGEURL, HORAIRES, OUVERT, TEMPS_PREPARATION, ID_RESTAURATEUR)
VALUES (11, 'Gathered', 'Un café convivial avec des petits-déjeuners et des desserts maison.', 'Tunis, Centre Ville', '71 100 011', 4.90, 'Café', 'assets/logo_rest/gathered.png', '11:00 - 21:00', 1, '15-25 min', 11);

-- 4. Menus et plats (repris de votre fichier inserer_donnees.sql : 33 plats)
-- =========================================
-- 1. INSERTION DES 11 MENUS
-- =========================================

INSERT INTO MENU (NOM, DESCRIPTION, PRIX, RESTAURANT_ID)
VALUES ('Menu La Bella Vita', 'Menu du restaurant La Bella Vita', 0, 1);

INSERT INTO MENU (NOM, DESCRIPTION, PRIX, RESTAURANT_ID)
VALUES ('Menu Borcelle', 'Menu du restaurant Borcelle', 0, 2);

INSERT INTO MENU (NOM, DESCRIPTION, PRIX, RESTAURANT_ID)
VALUES ('Menu Sushi House', 'Menu du restaurant Sushi House', 0, 3);

INSERT INTO MENU (NOM, DESCRIPTION, PRIX, RESTAURANT_ID)
VALUES ('Menu Bab Al Madina', 'Menu du restaurant Bab Al Madina', 0, 4);

INSERT INTO MENU (NOM, DESCRIPTION, PRIX, RESTAURANT_ID)
VALUES ('Menu Tacos Factory', 'Menu du restaurant Tacos Factory', 0, 5);

INSERT INTO MENU (NOM, DESCRIPTION, PRIX, RESTAURANT_ID)
VALUES ('Menu Green Garden', 'Menu du restaurant Green Garden', 0, 6);

INSERT INTO MENU (NOM, DESCRIPTION, PRIX, RESTAURANT_ID)
VALUES ('Menu Sweet Corner', 'Menu du restaurant Sweet Corner', 0, 7);

INSERT INTO MENU (NOM, DESCRIPTION, PRIX, RESTAURANT_ID)
VALUES ('Menu Grill House', 'Menu du restaurant Grill House', 0, 8);

INSERT INTO MENU (NOM, DESCRIPTION, PRIX, RESTAURANT_ID)
VALUES ('Menu Corner Cafe', 'Menu du restaurant Corner Cafe', 0, 9);

INSERT INTO MENU (NOM, DESCRIPTION, PRIX, RESTAURANT_ID)
VALUES ('Menu Coffee Lab', 'Menu du restaurant Coffee Lab', 0, 10);

INSERT INTO MENU (NOM, DESCRIPTION, PRIX, RESTAURANT_ID)
VALUES ('Menu Gathered', 'Menu du restaurant Gathered', 0, 11);


-- =========================================
-- 2. PRODUITS : LA BELLA VITA (ID 1)
-- =========================================

INSERT INTO PRODUIT (NOM, DESCRIPTION, PRIX, IMAGE, CATEGORIE_P, ID_MENU, ID_RESTAURANT, DISPONIBLE)
SELECT 'Pizza Margherita', 'Pizza tomate mozzarella', 18,
'https://images.unsplash.com/photo-1574071318508-1cdbab80d002?w=600',
'Pizza', ID, 1, 1 FROM MENU WHERE RESTAURANT_ID = 1;

INSERT INTO PRODUIT (NOM, DESCRIPTION, PRIX, IMAGE, CATEGORIE_P, ID_MENU, ID_RESTAURANT, DISPONIBLE)
SELECT 'Pizza 4 Fromages', 'Pizza aux quatre fromages', 26,
'https://images.unsplash.com/photo-1571407970349-bc81e7e96d47?w=600',
'Pizza', ID, 1, 1 FROM MENU WHERE RESTAURANT_ID = 1;

INSERT INTO PRODUIT (NOM, DESCRIPTION, PRIX, IMAGE, CATEGORIE_P, ID_MENU, ID_RESTAURANT, DISPONIBLE)
SELECT 'Pasta Carbonara', 'Pates a la carbonara', 24,
'https://images.unsplash.com/photo-1612874742237-6526221588e3?w=600',
'Pates', ID, 1, 1 FROM MENU WHERE RESTAURANT_ID = 1;


-- =========================================
-- 3. PRODUITS : BORCELLE (ID 2)
-- =========================================

INSERT INTO PRODUIT (NOM, DESCRIPTION, PRIX, IMAGE, CATEGORIE_P, ID_MENU, ID_RESTAURANT, DISPONIBLE)
SELECT 'Classic Burger', 'Burger classique', 16,
'https://images.unsplash.com/photo-1568901346375-23c9450c58cd?w=600',
'Burger', ID, 2, 1 FROM MENU WHERE RESTAURANT_ID = 2;

INSERT INTO PRODUIT (NOM, DESCRIPTION, PRIX, IMAGE, CATEGORIE_P, ID_MENU, ID_RESTAURANT, DISPONIBLE)
SELECT 'Double Cheese Burger', 'Burger double fromage', 23,
'https://images.unsplash.com/photo-1553979459-d2229ba7433a?w=600',
'Burger', ID, 2, 1 FROM MENU WHERE RESTAURANT_ID = 2;

INSERT INTO PRODUIT (NOM, DESCRIPTION, PRIX, IMAGE, CATEGORIE_P, ID_MENU, ID_RESTAURANT, DISPONIBLE)
SELECT 'Chicken Sandwich', 'Sandwich au poulet', 14,
'https://images.unsplash.com/photo-1606755962773-d324e0a13086?w=600',
'Sandwich', ID, 2, 1 FROM MENU WHERE RESTAURANT_ID = 2;


-- =========================================
-- 4. PRODUITS : SUSHI HOUSE (ID 3)
-- =========================================

INSERT INTO PRODUIT (NOM, DESCRIPTION, PRIX, IMAGE, CATEGORIE_P, ID_MENU, ID_RESTAURANT, DISPONIBLE)
SELECT 'Sushi Saumon', 'Sushi au saumon', 22,
'https://images.unsplash.com/photo-1579871494447-9811cf80d66c?w=600',
'Sushi', ID, 3, 1 FROM MENU WHERE RESTAURANT_ID = 3;

INSERT INTO PRODUIT (NOM, DESCRIPTION, PRIX, IMAGE, CATEGORIE_P, ID_MENU, ID_RESTAURANT, DISPONIBLE)
SELECT 'California Rolls', 'California rolls', 28,
'https://images.unsplash.com/photo-1553621042-f6e147245754?w=600',
'Sushi', ID, 3, 1 FROM MENU WHERE RESTAURANT_ID = 3;

INSERT INTO PRODUIT (NOM, DESCRIPTION, PRIX, IMAGE, CATEGORIE_P, ID_MENU, ID_RESTAURANT, DISPONIBLE)
SELECT 'Maki Avocat', 'Maki a lavocat', 19,
'https://images.unsplash.com/photo-1617196034796-73dfa7b1fd56?w=600',
'Sushi', ID, 3, 1 FROM MENU WHERE RESTAURANT_ID = 3;


-- =========================================
-- 5. PRODUITS : BAB AL MADINA (ID 4)
-- =========================================

INSERT INTO PRODUIT (NOM, DESCRIPTION, PRIX, IMAGE, CATEGORIE_P, ID_MENU, ID_RESTAURANT, DISPONIBLE)
SELECT 'Couscous Tunisien', 'Couscous traditionnel tunisien', 25,
'assets/menu_img/couscous.jpg',
'Plats', ID, 4, 1 FROM MENU WHERE RESTAURANT_ID = 4;

INSERT INTO PRODUIT (NOM, DESCRIPTION, PRIX, IMAGE, CATEGORIE_P, ID_MENU, ID_RESTAURANT, DISPONIBLE)
SELECT 'Ojja Merguez', 'Ojja tunisienne aux merguez', 18,
'assets/menu_img/ojja_merguez.avif',
'Plats', ID, 4, 1 FROM MENU WHERE RESTAURANT_ID = 4;

INSERT INTO PRODUIT (NOM, DESCRIPTION, PRIX, IMAGE, CATEGORIE_P, ID_MENU, ID_RESTAURANT, DISPONIBLE)
SELECT 'Brik a l oeuf', 'Brik tunisienne a l oeuf', 8,
'https://images.unsplash.com/photo-1601050690597-df0568f70950?w=600',
'Plats', ID, 4, 1 FROM MENU WHERE RESTAURANT_ID = 4;


-- =========================================
-- 6. PRODUITS : TACOS FACTORY (ID 5)
-- =========================================

INSERT INTO PRODUIT (NOM, DESCRIPTION, PRIX, IMAGE, CATEGORIE_P, ID_MENU, ID_RESTAURANT, DISPONIBLE)
SELECT 'Tacos Poulet', 'Tacos au poulet', 16,
'https://images.unsplash.com/photo-1551504734-5ee1c4a1479b?w=600',
'Tacos', ID, 5, 1 FROM MENU WHERE RESTAURANT_ID = 5;

INSERT INTO PRODUIT (NOM, DESCRIPTION, PRIX, IMAGE, CATEGORIE_P, ID_MENU, ID_RESTAURANT, DISPONIBLE)
SELECT 'Tacos Mixte', 'Tacos aux viandes mixtes', 21,
'https://images.unsplash.com/photo-1565299585323-38d6b0865b47?w=600',
'Tacos', ID, 5, 1 FROM MENU WHERE RESTAURANT_ID = 5;

INSERT INTO PRODUIT (NOM, DESCRIPTION, PRIX, IMAGE, CATEGORIE_P, ID_MENU, ID_RESTAURANT, DISPONIBLE)
SELECT 'Tenders Box', 'Box de tenders', 19,
'https://images.unsplash.com/photo-1562967914-608f82629710?w=600',
'Tacos', ID, 5, 1 FROM MENU WHERE RESTAURANT_ID = 5;


-- =========================================
-- 7. PRODUITS : GREEN GARDEN (ID 6)
-- =========================================

INSERT INTO PRODUIT (NOM, DESCRIPTION, PRIX, IMAGE, CATEGORIE_P, ID_MENU, ID_RESTAURANT, DISPONIBLE)
SELECT 'Chicken Salad', 'Salade au poulet', 18,
'https://images.unsplash.com/photo-1546069901-ba9599a7e63c?w=600',
'Salades', ID, 6, 1 FROM MENU WHERE RESTAURANT_ID = 6;

INSERT INTO PRODUIT (NOM, DESCRIPTION, PRIX, IMAGE, CATEGORIE_P, ID_MENU, ID_RESTAURANT, DISPONIBLE)
SELECT 'Healthy Bowl', 'Bowl equilibre', 22,
'https://images.unsplash.com/photo-1512621776951-a57141f2eefd?w=600',
'Salades', ID, 6, 1 FROM MENU WHERE RESTAURANT_ID = 6;

INSERT INTO PRODUIT (NOM, DESCRIPTION, PRIX, IMAGE, CATEGORIE_P, ID_MENU, ID_RESTAURANT, DISPONIBLE)
SELECT 'Salade Cesar', 'Salade Cesar', 20,
'https://images.unsplash.com/photo-1550304943-4f24f54ddde9?w=600',
'Salades', ID, 6, 1 FROM MENU WHERE RESTAURANT_ID = 6;


-- =========================================
-- 8. PRODUITS : SWEET CORNER (ID 7)
-- =========================================

INSERT INTO PRODUIT (NOM, DESCRIPTION, PRIX, IMAGE, CATEGORIE_P, ID_MENU, ID_RESTAURANT, DISPONIBLE)
SELECT 'Pancakes', 'Pancakes sucres', 15,
'https://images.unsplash.com/photo-1528207776546-365bb710ee93?w=600',
'Desserts', ID, 7, 1 FROM MENU WHERE RESTAURANT_ID = 7;

INSERT INTO PRODUIT (NOM, DESCRIPTION, PRIX, IMAGE, CATEGORIE_P, ID_MENU, ID_RESTAURANT, DISPONIBLE)
SELECT 'Chocolate Waffle', 'Gaufre au chocolat', 17,
'https://images.unsplash.com/photo-1562376552-0d160a2f238d?w=600',
'Desserts', ID, 7, 1 FROM MENU WHERE RESTAURANT_ID = 7;

INSERT INTO PRODUIT (NOM, DESCRIPTION, PRIX, IMAGE, CATEGORIE_P, ID_MENU, ID_RESTAURANT, DISPONIBLE)
SELECT 'Cheesecake', 'Cheesecake', 13,
'https://images.unsplash.com/photo-1533134242443-d4fd215305ad?w=600',
'Desserts', ID, 7, 1 FROM MENU WHERE RESTAURANT_ID = 7;


-- =========================================
-- 9. PRODUITS : GRILL HOUSE (ID 8)
-- =========================================

INSERT INTO PRODUIT (NOM, DESCRIPTION, PRIX, IMAGE, CATEGORIE_P, ID_MENU, ID_RESTAURANT, DISPONIBLE)
SELECT 'Steak Grille', 'Steak grille', 32,
'https://images.unsplash.com/photo-1544025162-d76694265947?w=600',
'Grillades', ID, 8, 1 FROM MENU WHERE RESTAURANT_ID = 8;

INSERT INTO PRODUIT (NOM, DESCRIPTION, PRIX, IMAGE, CATEGORIE_P, ID_MENU, ID_RESTAURANT, DISPONIBLE)
SELECT 'Brochettes de Poulet', 'Brochettes de poulet grillees', 24,
'https://images.unsplash.com/photo-1529042410759-befb1204b468?w=600',
'Grillades', ID, 8, 1 FROM MENU WHERE RESTAURANT_ID = 8;

INSERT INTO PRODUIT (NOM, DESCRIPTION, PRIX, IMAGE, CATEGORIE_P, ID_MENU, ID_RESTAURANT, DISPONIBLE)
SELECT 'Mixed Grill', 'Assortiment de grillades', 38,
'https://images.unsplash.com/photo-1558030006-450675393462?w=600',
'Grillades', ID, 8, 1 FROM MENU WHERE RESTAURANT_ID = 8;


-- =========================================
-- 10. PRODUITS : CORNER CAFE (ID 9)
-- =========================================

INSERT INTO PRODUIT (NOM, DESCRIPTION, PRIX, IMAGE, CATEGORIE_P, ID_MENU, ID_RESTAURANT, DISPONIBLE)
SELECT 'Cappuccino', 'Cafe cappuccino', 7,
'https://images.unsplash.com/photo-1570968915860-54d5c301fa9f?w=600',
'Cafe', ID, 9, 1 FROM MENU WHERE RESTAURANT_ID = 9;

INSERT INTO PRODUIT (NOM, DESCRIPTION, PRIX, IMAGE, CATEGORIE_P, ID_MENU, ID_RESTAURANT, DISPONIBLE)
SELECT 'Iced Coffee', 'Cafe glace', 9,
'https://images.unsplash.com/photo-1461023058943-07fcbe16d735?w=600',
'Cafe', ID, 9, 1 FROM MENU WHERE RESTAURANT_ID = 9;

INSERT INTO PRODUIT (NOM, DESCRIPTION, PRIX, IMAGE, CATEGORIE_P, ID_MENU, ID_RESTAURANT, DISPONIBLE)
SELECT 'Chocolate Cake', 'Gateau au chocolat', 12,
'https://images.unsplash.com/photo-1578985545062-69928b1d9587?w=600',
'Desserts', ID, 9, 1 FROM MENU WHERE RESTAURANT_ID = 9;


-- =========================================
-- 11. PRODUITS : COFFEE LAB (ID 10)
-- =========================================

INSERT INTO PRODUIT (NOM, DESCRIPTION, PRIX, IMAGE, CATEGORIE_P, ID_MENU, ID_RESTAURANT, DISPONIBLE)
SELECT 'Latte Macchiato', 'Cafe latte macchiato', 8,
'https://images.unsplash.com/photo-1541167760496-1628856ab772?w=600',
'Cafe', ID, 10, 1 FROM MENU WHERE RESTAURANT_ID = 10;

INSERT INTO PRODUIT (NOM, DESCRIPTION, PRIX, IMAGE, CATEGORIE_P, ID_MENU, ID_RESTAURANT, DISPONIBLE)
SELECT 'Mocha', 'Cafe mocha', 10,
'https://images.unsplash.com/photo-1579888071069-c107a6f79d8f?w=600',
'Cafe', ID, 10, 1 FROM MENU WHERE RESTAURANT_ID = 10;

INSERT INTO PRODUIT (NOM, DESCRIPTION, PRIX, IMAGE, CATEGORIE_P, ID_MENU, ID_RESTAURANT, DISPONIBLE)
SELECT 'Cheesecake', 'Cheesecake', 13,
'https://images.unsplash.com/photo-1533134242443-d4fd215305ad?w=600',
'Desserts', ID, 10, 1 FROM MENU WHERE RESTAURANT_ID = 10;


-- =========================================
-- 12. PRODUITS : GATHERED (ID 11)
-- =========================================

INSERT INTO PRODUIT (NOM, DESCRIPTION, PRIX, IMAGE, CATEGORIE_P, ID_MENU, ID_RESTAURANT, DISPONIBLE)
SELECT 'Petit Dejeuner', 'Petit dejeuner complet', 18,
'https://images.unsplash.com/photo-1533089860892-a7c6f0a88666?w=600',
'Cafe', ID, 11, 1 FROM MENU WHERE RESTAURANT_ID = 11;

INSERT INTO PRODUIT (NOM, DESCRIPTION, PRIX, IMAGE, CATEGORIE_P, ID_MENU, ID_RESTAURANT, DISPONIBLE)
SELECT 'Croissant', 'Croissant frais', 4,
'https://images.unsplash.com/photo-1555507036-ab1f4038808a?w=600',
'Cafe', ID, 11, 1 FROM MENU WHERE RESTAURANT_ID = 11;

INSERT INTO PRODUIT (NOM, DESCRIPTION, PRIX, IMAGE, CATEGORIE_P, ID_MENU, ID_RESTAURANT, DISPONIBLE)
SELECT 'Jus d Orange', 'Jus orange frais', 6,
'https://images.unsplash.com/photo-1600271886742-f049cd451bba?w=600',
'Boissons', ID, 11, 1 FROM MENU WHERE RESTAURANT_ID = 11;

-- 5. Créneaux du jour : 11:00 à 20:00 pour chaque restaurant, capacité 5
INSERT INTO CRENEAU (ID_RESTAURANT, DATE_CRENEAU, HEURE, CAPACITE_MAX, PLACES_PRISES)
SELECT r.ID_RESTAURANT, TRUNC(SYSDATE), TO_CHAR(10 + h.n, 'FM00') || ':00', 5, 0
FROM RESTAURANT r
CROSS JOIN (SELECT LEVEL AS n FROM DUAL CONNECT BY LEVEL <= 10) h;

-- Cas limites pour la démo (La Bella Vita)
UPDATE CRENEAU SET PLACES_PRISES = 4
 WHERE ID_RESTAURANT = 1 AND DATE_CRENEAU = TRUNC(SYSDATE) AND HEURE = '12:00';   -- presque complet
UPDATE CRENEAU SET PLACES_PRISES = 5
 WHERE ID_RESTAURANT = 1 AND DATE_CRENEAU = TRUNC(SYSDATE) AND HEURE = '13:00';   -- complet

-- 6. Identifiants posés à la main : les séquences repartent après le maximum
--    (sinon la 1re inscription ou le 1er plat ajouté dans l'appli ferait une erreur de doublon)
DECLARE
    PROCEDURE relancer(p_seq VARCHAR2, p_table VARCHAR2, p_col VARCHAR2) IS
        v NUMBER;
    BEGIN
        EXECUTE IMMEDIATE 'SELECT NVL(MAX(' || p_col || '), 0) + 1 FROM ' || p_table INTO v;
        EXECUTE IMMEDIATE 'DROP SEQUENCE ' || p_seq;
        EXECUTE IMMEDIATE 'CREATE SEQUENCE ' || p_seq || ' START WITH ' || v || ' INCREMENT BY 1 NOCACHE';
    END;
BEGIN
    relancer('SEQ_UTILISATEUR', 'UTILISATEUR', 'ID_UTILISATEUR');
    relancer('SEQ_RESTAURANT', 'RESTAURANT', 'ID_RESTAURANT');
    relancer('SEQ_MENU', 'MENU', 'ID');
    relancer('SEQ_PRODUIT', 'PRODUIT', 'ID_PRODUIT');
    relancer('SEQ_CRENEAU', 'CRENEAU', 'ID_CRENEAU');
END;
/

COMMIT;

-- Vérification : attendu 13 utilisateurs, 11 restaurants, 11 menus, 33 produits, 110 créneaux
SELECT 'UTILISATEUR' AS NOM_TABLE, COUNT(*) AS NB FROM UTILISATEUR
UNION ALL SELECT 'RESTAURANT', COUNT(*) FROM RESTAURANT
UNION ALL SELECT 'MENU', COUNT(*) FROM MENU
UNION ALL SELECT 'PRODUIT', COUNT(*) FROM PRODUIT
UNION ALL SELECT 'CRENEAU', COUNT(*) FROM CRENEAU;
