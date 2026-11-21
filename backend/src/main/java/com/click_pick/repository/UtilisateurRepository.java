package com.click_pick.repository;

import com.click_pick.entity.Utilisateur;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.util.Optional;

public interface UtilisateurRepository extends JpaRepository<Utilisateur, Long> {

    Optional<Utilisateur> findByEmail(String email);

    /**
     * Pas de "existsBy..." dérivé : Hibernate 7 le traduit en "fetch first 1 rows only",
     * syntaxe que Oracle 11g ne comprend pas (ORA-00933). Un count fonctionne partout.
     */
    @Query("select count(u) from Utilisateur u where u.email = :email")
    long compterParEmail(@Param("email") String email);

    default boolean existsByEmail(String email) {
        return compterParEmail(email) > 0;
    }
}
