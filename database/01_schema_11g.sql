-- =====================================================================
-- Click&Pick - Schéma de la base (V1)            SGBD : Oracle 11g (et plus)
-- T01 : tables, clés étrangères, contraintes
--
-- Exécution (SQL Developer, "Exécuter le script" F5, ou sqlplus) :
--     @01_schema_11g.sql
-- Le script est rejouable : il supprime d'abord les tables et séquences existantes.
-- Il REMPLACE tables.sql, Creneaux.sql et oracle11g_sequences.sql : n'exécutez qu'un seul schéma.
-- Les identifiants viennent de séquences SEQ_<TABLE> (utilisées par Spring Boot) ;
-- des triggers permettent aussi les INSERT SQL sans fournir l'identifiant.
-- =====================================================================

-- ---------------------------------------------------------------------
-- 0. Nettoyage (rejouable)
-- ---------------------------------------------------------------------
BEGIN
    FOR t IN (SELECT table_name FROM user_tables
              WHERE table_name IN ('LIGNE_COMMANDE', 'COMMANDE', 'CRENEAU',
                                   'PRODUIT', 'MENU', 'RESTAURANT', 'UTILISATEUR'))
    LOOP
        EXECUTE IMMEDIATE 'DROP TABLE ' || t.table_name || ' CASCADE CONSTRAINTS PURGE';
    END LOOP;
    FOR q IN (SELECT sequence_name FROM user_sequences
              WHERE sequence_name IN ('SEQ_UTILISATEUR', 'SEQ_RESTAURANT', 'SEQ_MENU', 'SEQ_PRODUIT',
                                      'SEQ_CRENEAU', 'SEQ_COMMANDE', 'SEQ_LIGNE_COMMANDE'))
    LOOP
        EXECUTE IMMEDIATE 'DROP SEQUENCE ' || q.sequence_name;
    END LOOP;
END;
/

-- =========================================
-- 1. TABLE UTILISATEUR
-- =========================================
CREATE TABLE UTILISATEUR (
    ID_UTILISATEUR NUMBER(10) PRIMARY KEY,
    NOM            VARCHAR2(50)  NOT NULL,
    PRENOM         VARCHAR2(50),
    EMAIL          VARCHAR2(100) NOT NULL,
    MOT_DE_PASSE   VARCHAR2(255) NOT NULL,          -- hash BCrypt, jamais en clair
    TELEPHONE      VARCHAR2(20),
    ROLE           VARCHAR2(20)  NOT NULL,
    DATE_CREATION  DATE DEFAULT SYSDATE NOT NULL,

    CONSTRAINT UQ_USER_EMAIL UNIQUE (EMAIL),
    CONSTRAINT CK_USER_ROLE  CHECK (ROLE IN ('CLIENT', 'RESTAURATEUR'))
);

-- =========================================
-- 2. TABLE RESTAURANT
-- =========================================
CREATE TABLE RESTAURANT (
    ID_RESTAURANT     NUMBER(10) PRIMARY KEY,
    NOM               VARCHAR2(100) NOT NULL,
    DESCRIPTION       VARCHAR2(500),
    ADRESSE           VARCHAR2(200) NOT NULL,         -- affichée comme "quartier" sur les cartes
    TELEPHONE         VARCHAR2(20),
    RATE              NUMBER(2,1) DEFAULT 0 NOT NULL, -- note moyenne (0 à 5)
    CATEGORIE         VARCHAR2(200) NOT NULL,         -- cuisine : Pizza, Burger, Café...
    IMAGEURL          VARCHAR2(500) NOT NULL,
    HORAIRES          VARCHAR2(100),                  -- ex. "11:00 - 22:00"
    OUVERT            NUMBER(1) DEFAULT 1 NOT NULL,   -- 1 = ouvert, 0 = fermé
    TEMPS_PREPARATION VARCHAR2(20),                   -- ex. "20-30 min"
    ID_RESTAURATEUR   NUMBER(10) NOT NULL,

    CONSTRAINT FK_REST_USER FOREIGN KEY (ID_RESTAURATEUR)
        REFERENCES UTILISATEUR (ID_UTILISATEUR),
    CONSTRAINT UQ_RESTAURATEUR UNIQUE (ID_RESTAURATEUR),  -- 1 restaurateur = 1 restaurant
    CONSTRAINT CK_REST_OUVERT CHECK (OUVERT IN (0, 1)),
    CONSTRAINT CK_REST_RATE   CHECK (RATE BETWEEN 0 AND 5)
);

-- =========================================
-- 3. TABLE MENU (formules / regroupements, facultatif en V1)
-- =========================================
CREATE TABLE MENU (
    ID            NUMBER(10) PRIMARY KEY,
    NOM           VARCHAR2(100) NOT NULL,
    DESCRIPTION   VARCHAR2(500),
    PRIX          NUMBER(10,3) NOT NULL,
    RESTAURANT_ID NUMBER(10) NOT NULL,
    IMAGE         VARCHAR2(255),

    CONSTRAINT FK_MENU_RESTAURANT FOREIGN KEY (RESTAURANT_ID)
        REFERENCES RESTAURANT (ID_RESTAURANT),
    CONSTRAINT CK_MENU_PRIX CHECK (PRIX > 0)
);

-- =========================================
-- 4. TABLE PRODUIT (les plats du restaurateur)
-- =========================================
CREATE TABLE PRODUIT (
    ID_PRODUIT    NUMBER(10) PRIMARY KEY,
    NOM           VARCHAR2(100) NOT NULL,
    DESCRIPTION   VARCHAR2(500),
    PRIX          NUMBER(10,3) NOT NULL,             -- dinar tunisien : 3 décimales
    IMAGE         VARCHAR2(255),
    ID_MENU       NUMBER(10),                        -- facultatif
    CATEGORIE_P   VARCHAR2(100) NOT NULL,            -- Entrée, Plat, Dessert, Boisson...
    DISPONIBLE    NUMBER(1) DEFAULT 1 NOT NULL,
    ID_RESTAURANT NUMBER(10) NOT NULL,

    CONSTRAINT CK_PRODUIT_PRIX  CHECK (PRIX > 0),    -- US03 : prix supérieur à 0
    CONSTRAINT CK_PRODUIT_DISPO CHECK (DISPONIBLE IN (0, 1)),
    CONSTRAINT FK_PROD_MENU FOREIGN KEY (ID_MENU)
        REFERENCES MENU (ID),
    CONSTRAINT FK_PROD_REST FOREIGN KEY (ID_RESTAURANT)
        REFERENCES RESTAURANT (ID_RESTAURANT)
);

-- =========================================
-- 5. TABLE CRENEAU (créneaux de retrait)
-- =========================================
CREATE TABLE CRENEAU (
    ID_CRENEAU    NUMBER(10) PRIMARY KEY,
    ID_RESTAURANT NUMBER(10) NOT NULL,
    DATE_CRENEAU  DATE NOT NULL,                     -- jour, sans heure
    HEURE         VARCHAR2(5) NOT NULL,              -- "HH:MM"
    CAPACITE_MAX  NUMBER(3) NOT NULL,                -- nb max de commandes sur le créneau
    PLACES_PRISES NUMBER(3) DEFAULT 0 NOT NULL,

    CONSTRAINT FK_CRENEAU_REST FOREIGN KEY (ID_RESTAURANT)
        REFERENCES RESTAURANT (ID_RESTAURANT),
    CONSTRAINT UQ_CRENEAU UNIQUE (ID_RESTAURANT, DATE_CRENEAU, HEURE),
    CONSTRAINT CK_CRENEAU_CAPACITE CHECK (CAPACITE_MAX > 0),
    -- la base elle-même interdit de dépasser la capacité (même en cas de commandes simultanées)
    CONSTRAINT CK_CRENEAU_PLACES CHECK (PLACES_PRISES >= 0 AND PLACES_PRISES <= CAPACITE_MAX),
    CONSTRAINT CK_CRENEAU_DATE  CHECK (DATE_CRENEAU = TRUNC(DATE_CRENEAU)),
    CONSTRAINT CK_CRENEAU_HEURE CHECK (REGEXP_LIKE(HEURE, '^([01][0-9]|2[0-3]):[0-5][0-9]$'))
);

-- =========================================
-- 6. TABLE COMMANDE
-- =========================================
CREATE TABLE COMMANDE (
    ID_COMMANDE    NUMBER(10) PRIMARY KEY,  -- = numéro de commande
    DATE_COMMANDE  DATE DEFAULT SYSDATE NOT NULL,
    STATUT         VARCHAR2(30) DEFAULT 'RECUE' NOT NULL,
    MODE_RECEPTION VARCHAR2(20) DEFAULT 'RETRAIT' NOT NULL,   -- LIVRAISON hors périmètre (US18)
    MONTANT_TOTAL  NUMBER(10,3) NOT NULL,
    ID_CLIENT      NUMBER(10) NOT NULL,
    ID_RESTAURANT  NUMBER(10) NOT NULL,
    ID_CRENEAU     NUMBER(10) NOT NULL,              -- l'heure de retrait = celle du créneau

    CONSTRAINT CK_COMMANDE_STATUT CHECK (STATUT IN
        ('RECUE', 'EN_PREPARATION', 'PRETE', 'RECUPEREE', 'ANNULEE')),
    CONSTRAINT CK_MODE_RECEPTION  CHECK (MODE_RECEPTION IN ('RETRAIT', 'LIVRAISON')),
    CONSTRAINT CK_COMMANDE_MONTANT CHECK (MONTANT_TOTAL >= 0),
    CONSTRAINT FK_CMD_CLIENT  FOREIGN KEY (ID_CLIENT)     REFERENCES UTILISATEUR (ID_UTILISATEUR),
    CONSTRAINT FK_CMD_REST    FOREIGN KEY (ID_RESTAURANT) REFERENCES RESTAURANT (ID_RESTAURANT),
    CONSTRAINT FK_CMD_CRENEAU FOREIGN KEY (ID_CRENEAU)    REFERENCES CRENEAU (ID_CRENEAU)
);

-- =========================================
-- 7. TABLE LIGNE_COMMANDE
-- =========================================
CREATE TABLE LIGNE_COMMANDE (
    ID_LIGNE      NUMBER(10) PRIMARY KEY,
    QUANTITE      NUMBER(5) NOT NULL,
    PRIX_UNITAIRE NUMBER(10,3) NOT NULL,             -- prix du plat au moment de la commande
    ID_COMMANDE   NUMBER(10) NOT NULL,
    ID_PRODUIT    NUMBER(10) NOT NULL,

    CONSTRAINT CK_LIGNE_QUANTITE CHECK (QUANTITE > 0),
    CONSTRAINT CK_LIGNE_PRIX     CHECK (PRIX_UNITAIRE >= 0),
    CONSTRAINT FK_LIGNE_CMD  FOREIGN KEY (ID_COMMANDE) REFERENCES COMMANDE (ID_COMMANDE),
    CONSTRAINT FK_LIGNE_PROD FOREIGN KEY (ID_PRODUIT)  REFERENCES PRODUIT (ID_PRODUIT)
);

-- ---------------------------------------------------------------------
-- Index sur les clés étrangères (Oracle n'en crée pas automatiquement)
-- ---------------------------------------------------------------------
CREATE INDEX IDX_MENU_REST     ON MENU (RESTAURANT_ID);
CREATE INDEX IDX_PROD_REST     ON PRODUIT (ID_RESTAURANT);
CREATE INDEX IDX_PROD_MENU     ON PRODUIT (ID_MENU);
CREATE INDEX IDX_CMD_REST      ON COMMANDE (ID_RESTAURANT);
CREATE INDEX IDX_CMD_CLIENT    ON COMMANDE (ID_CLIENT);
CREATE INDEX IDX_CMD_CRENEAU   ON COMMANDE (ID_CRENEAU);
CREATE INDEX IDX_LIGNE_CMD     ON LIGNE_COMMANDE (ID_COMMANDE);
CREATE INDEX IDX_LIGNE_PROD    ON LIGNE_COMMANDE (ID_PRODUIT);
-- (CRENEAU est déjà indexé par la contrainte UQ_CRENEAU)

-- ---------------------------------------------------------------------
-- Séquences (Oracle 11g n'a pas de colonnes IDENTITY) + triggers
-- ---------------------------------------------------------------------
CREATE SEQUENCE SEQ_UTILISATEUR START WITH 1 INCREMENT BY 1 NOCACHE;
CREATE SEQUENCE SEQ_RESTAURANT START WITH 1 INCREMENT BY 1 NOCACHE;
CREATE SEQUENCE SEQ_MENU START WITH 1 INCREMENT BY 1 NOCACHE;
CREATE SEQUENCE SEQ_PRODUIT START WITH 1 INCREMENT BY 1 NOCACHE;
CREATE SEQUENCE SEQ_CRENEAU START WITH 1 INCREMENT BY 1 NOCACHE;
CREATE SEQUENCE SEQ_COMMANDE START WITH 1 INCREMENT BY 1 NOCACHE;
CREATE SEQUENCE SEQ_LIGNE_COMMANDE START WITH 1 INCREMENT BY 1 NOCACHE;

CREATE OR REPLACE TRIGGER TRG_UTILISATEUR_BI
BEFORE INSERT ON UTILISATEUR FOR EACH ROW
WHEN (NEW.ID_UTILISATEUR IS NULL)
BEGIN
    SELECT SEQ_UTILISATEUR.NEXTVAL INTO :NEW.ID_UTILISATEUR FROM DUAL;
END;
/
CREATE OR REPLACE TRIGGER TRG_RESTAURANT_BI
BEFORE INSERT ON RESTAURANT FOR EACH ROW
WHEN (NEW.ID_RESTAURANT IS NULL)
BEGIN
    SELECT SEQ_RESTAURANT.NEXTVAL INTO :NEW.ID_RESTAURANT FROM DUAL;
END;
/
CREATE OR REPLACE TRIGGER TRG_MENU_BI
BEFORE INSERT ON MENU FOR EACH ROW
WHEN (NEW.ID IS NULL)
BEGIN
    SELECT SEQ_MENU.NEXTVAL INTO :NEW.ID FROM DUAL;
END;
/
CREATE OR REPLACE TRIGGER TRG_PRODUIT_BI
BEFORE INSERT ON PRODUIT FOR EACH ROW
WHEN (NEW.ID_PRODUIT IS NULL)
BEGIN
    SELECT SEQ_PRODUIT.NEXTVAL INTO :NEW.ID_PRODUIT FROM DUAL;
END;
/
CREATE OR REPLACE TRIGGER TRG_CRENEAU_BI
BEFORE INSERT ON CRENEAU FOR EACH ROW
WHEN (NEW.ID_CRENEAU IS NULL)
BEGIN
    SELECT SEQ_CRENEAU.NEXTVAL INTO :NEW.ID_CRENEAU FROM DUAL;
END;
/
CREATE OR REPLACE TRIGGER TRG_COMMANDE_BI
BEFORE INSERT ON COMMANDE FOR EACH ROW
WHEN (NEW.ID_COMMANDE IS NULL)
BEGIN
    SELECT SEQ_COMMANDE.NEXTVAL INTO :NEW.ID_COMMANDE FROM DUAL;
END;
/
CREATE OR REPLACE TRIGGER TRG_LIGNE_COMMANDE_BI
BEFORE INSERT ON LIGNE_COMMANDE FOR EACH ROW
WHEN (NEW.ID_LIGNE IS NULL)
BEGIN
    SELECT SEQ_LIGNE_COMMANDE.NEXTVAL INTO :NEW.ID_LIGNE FROM DUAL;
END;
/

COMMIT;
