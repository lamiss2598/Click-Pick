package com.click_pick.entity;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.SequenceGenerator;
import jakarta.persistence.Id;
import jakarta.persistence.Table;
import java.time.LocalDate;

@Entity
@Table(name = "CRENEAU")
public class Creneau {

    @Id
    @SequenceGenerator(
        name = "creneau_seq_gen",
        sequenceName = "SEQ_CRENEAU",
        allocationSize = 1
    )
    @GeneratedValue(
        strategy = GenerationType.SEQUENCE,
        generator = "creneau_seq_gen"
    )
    @Column(name = "ID_CRENEAU")
    private Long id;

    @Column(name = "ID_RESTAURANT", nullable = false)
    private Long restaurantId;

    @Column(name = "DATE_CRENEAU", nullable = false)
    private LocalDate dateCreneau;

    /** Format "HH:MM". */
    @Column(name = "HEURE", nullable = false, length = 5)
    private String heure;

    @Column(name = "CAPACITE_MAX", nullable = false)
    private int capaciteMax;

    @Column(name = "PLACES_PRISES", nullable = false)
    private int placesPrises;

    public int placesRestantes() {
        return Math.max(0, capaciteMax - placesPrises);
    }

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public Long getRestaurantId() {
        return restaurantId;
    }

    public void setRestaurantId(Long restaurantId) {
        this.restaurantId = restaurantId;
    }

    public LocalDate getDateCreneau() {
        return dateCreneau;
    }

    public void setDateCreneau(LocalDate dateCreneau) {
        this.dateCreneau = dateCreneau;
    }

    public String getHeure() {
        return heure;
    }

    public void setHeure(String heure) {
        this.heure = heure;
    }

    public int getCapaciteMax() {
        return capaciteMax;
    }

    public void setCapaciteMax(int capaciteMax) {
        this.capaciteMax = capaciteMax;
    }

    public int getPlacesPrises() {
        return placesPrises;
    }

    public void setPlacesPrises(int placesPrises) {
        this.placesPrises = placesPrises;
    }

}
