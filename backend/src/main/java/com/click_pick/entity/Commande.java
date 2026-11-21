package com.click_pick.entity;

import jakarta.persistence.CascadeType;
import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.EnumType;
import jakarta.persistence.Enumerated;
import jakarta.persistence.FetchType;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.SequenceGenerator;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;
import jakarta.persistence.OneToMany;
import jakarta.persistence.Table;

import java.math.BigDecimal;
import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.List;

@Entity
@Table(name = "COMMANDE")
public class Commande {

    /** Le numéro de commande affiché au client est cet identifiant. */
    @Id
    @SequenceGenerator(
        name = "commande_seq_gen",
        sequenceName = "SEQ_COMMANDE",
        allocationSize = 1
    )
    @GeneratedValue(
        strategy = GenerationType.SEQUENCE,
        generator = "commande_seq_gen"
    )
    @Column(name = "ID_COMMANDE")
    private Long id;

    @Column(name = "DATE_COMMANDE", nullable = false)
    private LocalDateTime dateCommande;

    @Enumerated(EnumType.STRING)
    @Column(name = "STATUT", nullable = false, length = 30)
    private StatutCommande statut = StatutCommande.RECUE;

    /** "RETRAIT" uniquement en V1 (la livraison est hors périmètre, US18). */
    @Column(name = "MODE_RECEPTION", nullable = false, length = 20)
    private String modeReception = "RETRAIT";

    @Column(name = "MONTANT_TOTAL", nullable = false)
    private BigDecimal montantTotal;

    @ManyToOne(fetch = FetchType.LAZY, optional = false)
    @JoinColumn(name = "ID_CLIENT", nullable = false)
    private Utilisateur client;

    @Column(name = "ID_RESTAURANT", nullable = false)
    private Long restaurantId;

    @ManyToOne(fetch = FetchType.LAZY, optional = false)
    @JoinColumn(name = "ID_CRENEAU", nullable = false)
    private Creneau creneau;

    @OneToMany(mappedBy = "commande", cascade = CascadeType.ALL)
    private List<LigneCommande> lignes = new ArrayList<>();

    public void addLigne(LigneCommande ligne) {
        ligne.setCommande(this);
        lignes.add(ligne);
    }

    public Long getId() {
        return id;
    }

    public LocalDateTime getDateCommande() {
        return dateCommande;
    }

    public void setDateCommande(LocalDateTime dateCommande) {
        this.dateCommande = dateCommande;
    }

    public StatutCommande getStatut() {
        return statut;
    }

    public void setStatut(StatutCommande statut) {
        this.statut = statut;
    }

    public String getModeReception() {
        return modeReception;
    }

    public void setModeReception(String modeReception) {
        this.modeReception = modeReception;
    }

    public BigDecimal getMontantTotal() {
        return montantTotal;
    }

    public void setMontantTotal(BigDecimal montantTotal) {
        this.montantTotal = montantTotal;
    }

    public Utilisateur getClient() {
        return client;
    }

    public void setClient(Utilisateur client) {
        this.client = client;
    }

    public Long getRestaurantId() {
        return restaurantId;
    }

    public void setRestaurantId(Long restaurantId) {
        this.restaurantId = restaurantId;
    }

    public Creneau getCreneau() {
        return creneau;
    }

    public void setCreneau(Creneau creneau) {
        this.creneau = creneau;
    }

    public List<LigneCommande> getLignes() {
        return lignes;
    }
}
