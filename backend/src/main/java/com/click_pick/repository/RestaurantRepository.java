package com.click_pick.repository;

import com.click_pick.entity.Restaurant;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import java.util.List;
import java.util.Optional;

public interface RestaurantRepository extends JpaRepository<Restaurant, Long> {

    List<Restaurant> findAllByOrderByNomAsc();

    List<Restaurant> findByCategorieIgnoreCaseOrderByNomAsc(String categorie);

    Optional<Restaurant> findByRestaurateurId(Long restaurateurId);

    @Query("select distinct r.categorie from Restaurant r order by r.categorie")
    List<String> findCategories();
}
