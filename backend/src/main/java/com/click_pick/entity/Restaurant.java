package com.click_pick.entity;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.SequenceGenerator;
import jakarta.persistence.Id;
import jakarta.persistence.Table;
import java.math.BigDecimal;

@Entity
@Table(name = "RESTAURANT")
public class Restaurant {

    @Id
    @SequenceGenerator(
        name = "restaurant_seq_gen",
        sequenceName = "SEQ_RESTAURANT",
        allocationSize = 1
    )
    @GeneratedValue(
        strategy = GenerationType.SEQUENCE,
        generator = "restaurant_seq_gen"
    )
    @Column(name = "ID_RESTAURANT")
    private Long id;

    @Column(name = "NOM", nullable = false, length = 100)
    private String nom;

    @Column(name = "DESCRIPTION", length = 500)
    private String description;

    @Column(name = "ADRESSE", nullable = false, length = 200)
    private String adresse;

    @Column(name = "TELEPHONE", length = 20)
    private String telephone;

    @Column(name = "RATE", nullable = false)
    private BigDecimal rate;

    @Column(name = "CATEGORIE", nullable = false, length = 200)
    private String categorie;

    @Column(name = "IMAGEURL", nullable = false, length = 200)
    private String imageUrl;

    @Column(name = "HORAIRES", length = 100)
    private String horaires;

    @Column(name = "OUVERT", nullable = false)
    private boolean ouvert;

    @Column(name = "TEMPS_PREPARATION", length = 20)
    private String tempsPreparation;

    /** Propriétaire : un restaurateur possède un seul restaurant (UQ_RESTAURATEUR). */
    @Column(name = "ID_RESTAURATEUR", nullable = false)
    private Long restaurateurId;


    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getNom() {
        return nom;
    }

    public void setNom(String nom) {
        this.nom = nom;
    }

    public String getDescription() {
        return description;
    }

    public void setDescription(String description) {
        this.description = description;
    }

    public String getAdresse() {
        return adresse;
    }

    public void setAdresse(String adresse) {
        this.adresse = adresse;
    }

    public String getTelephone() {
        return telephone;
    }

    public void setTelephone(String telephone) {
        this.telephone = telephone;
    }

    public BigDecimal getRate() {
        return rate;
    }

    public void setRate(BigDecimal rate) {
        this.rate = rate;
    }

    public String getCategorie() {
        return categorie;
    }

    public void setCategorie(String categorie) {
        this.categorie = categorie;
    }

    public String getImageUrl() {
        return imageUrl;
    }

    public void setImageUrl(String imageUrl) {
        this.imageUrl = imageUrl;
    }

    public String getHoraires() {
        return horaires;
    }

    public void setHoraires(String horaires) {
        this.horaires = horaires;
    }

    public boolean isOuvert() {
        return ouvert;
    }

    public void setOuvert(boolean ouvert) {
        this.ouvert = ouvert;
    }

    public String getTempsPreparation() {
        return tempsPreparation;
    }

    public void setTempsPreparation(String tempsPreparation) {
        this.tempsPreparation = tempsPreparation;
    }

    public Long getRestaurateurId() {
        return restaurateurId;
    }

    public void setRestaurateurId(Long restaurateurId) {
        this.restaurateurId = restaurateurId;
    }

}
