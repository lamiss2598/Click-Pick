package com.click_pick.repository;

import com.click_pick.entity.Creneau;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.time.LocalDate;
import java.util.List;

public interface CreneauRepository extends JpaRepository<Creneau, Long> {

    List<Creneau> findByRestaurantIdAndDateCreneauOrderByHeureAsc(Long restaurantId, LocalDate date);

    /** Count plutôt que "existsBy..." dérivé (qui génère "fetch first", incompatible Oracle 11g). */
    @Query("select count(c) from Creneau c where c.restaurantId = :restaurantId and c.dateCreneau = :date")
    long compter(@Param("restaurantId") Long restaurantId, @Param("date") LocalDate date);

    default boolean existsByRestaurantIdAndDateCreneau(Long restaurantId, LocalDate date) {
        return compter(restaurantId, date) > 0;
    }

    /**
     * Décompte ATOMIQUE d'une place : la condition "il reste de la place" est évaluée par la base
     * au moment de la mise à jour. Deux clients qui commandent en même temps la dernière place
     * ne peuvent donc pas tous les deux réussir (la contrainte CK_CRENEAU_PLACES est un 2e filet).
     *
     * @return 1 si la place a été prise, 0 si le créneau est complet
     */
    @Modifying
    @Query("update Creneau c set c.placesPrises = c.placesPrises + 1 "
            + "where c.id = :id and c.placesPrises < c.capaciteMax")
    int reserverPlace(@Param("id") Long id);
}
