import { Component } from '@angular/core';

@Component({
  selector: 'app-commandes',
  templateUrl: './commandes.component.html',
  styleUrls: ['./commandes.component.css']
})
export class CommandesComponent {

  commandes = [
    {
      id: 1,
      client: 'Ahmed Ben Ali',
      produit: 'Pizza Margherita',
      quantite: 2,
      prix: 24,
      date: '15/11/2026',
      heure: '12:30',
      paiement: 'Payé',
      statut: 'En préparation'
    },
    {
      id: 2,
      client: 'Sarra Trabelsi',
      produit: 'Sandwich Escalope',
      quantite: 1,
      prix: 12,
      date: '15/11/2026',
      heure: '13:00',
      paiement: 'Non payé',
      statut: 'En attente'
    },
    {
      id: 3,
      client: 'Mohamed Ali',
      produit: 'Burger classique',
      quantite: 2,
      prix: 20,
      date: '15/11/2026',
      heure: '14:00',
      paiement: 'Payé',
      statut: 'Prête'
    }
  ];

  changerStatut(commande: any, nouveauStatut: string) {
    commande.statut = nouveauStatut;
  }

}
