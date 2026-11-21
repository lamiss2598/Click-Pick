# Compatibilité Oracle 11g

Le backend fonctionne sur Oracle 11g (XE) avec le schéma `database/01_schema_11g.sql`.

- Les clés primaires utilisent des séquences `SEQ_<TABLE>` (`GenerationType.SEQUENCE`, `allocationSize = 1`) :
  SEQ_UTILISATEUR, SEQ_RESTAURANT, SEQ_PRODUIT, SEQ_CRENEAU, SEQ_COMMANDE, SEQ_LIGNE_COMMANDE.
  Le script de schéma les crée, ainsi que des triggers qui permettent les INSERT SQL sans identifiant.
  Le script `oracle11g_sequences.sql` n'est donc plus nécessaire (il a été retiré).
- Hibernate 7 ne supporte plus officiellement Oracle 11g : il traduit certaines requêtes en
  `fetch first N rows only` (erreur ORA-00933 sur 11g). Les deux requêtes concernées
  (`existsByEmail`, `existsByRestaurantIdAndDateCreneau`) sont écrites en `count(...)`.
  **Règle pour le groupe** : ne pas utiliser de méthodes `existsBy...`, `findFirst...`, `findTop...`
  ni de pagination (`Pageable`) dans les repositories ; utiliser `@Query` avec `count`.
- Le pom déclare Java 25 : utiliser un JDK 25 (ou remettre `java.version` à 21).
