package com.click_pick.repository;

import com.click_pick.entity.Produit;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.Collection;
import java.util.List;

public interface ProduitRepository extends JpaRepository<Produit, Long> {

    /** Menu vu par les clients : seulement les plats disponibles. */
    List<Produit> findByRestaurantIdAndDisponibleTrueOrderByCategorieAscNomAsc(Long restaurantId);

    /** Menu vu par le restaurateur : tous ses plats. */
    List<Produit> findByRestaurantIdOrderByCategorieAscNomAsc(Long restaurantId);

    /** Sert à vérifier qu'une commande ne contient que des plats du bon restaurant. */
    List<Produit> findByIdInAndRestaurantId(Collection<Long> ids, Long restaurantId);
}
