package com.click_pick.entity;

/** Valeurs autorisées de COMMANDE.STATUT (voir contrainte CK_COMMANDE_STATUT). */
public enum StatutCommande {
    RECUE,
    EN_PREPARATION,
    PRETE,
    RECUPEREE,
    ANNULEE
}
