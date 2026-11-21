package com.click_pick.repository;

import com.click_pick.entity.Commande;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.util.List;

public interface CommandeRepository extends JpaRepository<Commande, Long> {

    /**
     * Commandes d'UN restaurant (US09), classées par heure de retrait, avec client, créneau,
     * lignes et plats chargés en une seule requête.
     */
    @Query("select c from Commande c "
            + "join fetch c.client "
            + "join fetch c.creneau cr "
            + "left join fetch c.lignes l "
            + "left join fetch l.produit "
            + "where c.restaurantId = :restaurantId "
            + "order by cr.dateCreneau, cr.heure, c.id")
    List<Commande> findByRestaurantOrderByRetrait(@Param("restaurantId") Long restaurantId);
}
