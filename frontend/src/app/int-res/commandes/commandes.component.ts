import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subject, takeUntil } from 'rxjs';
import { messageErreur } from '../../core/erreurs';
import { Commande, STATUTS, StatutCommande } from '../../models/commande.model';
import { CommandeService } from '../../services/commande.service';

@Component({
  selector: 'app-commandes',
  templateUrl: './commandes.component.html',
  styleUrls: ['./commandes.component.css'],
})
export class CommandesComponent implements OnInit, OnDestroy {
  commandes: Commande[] = [];
  statuts = STATUTS;
  chargement = false;
  erreur = '';
  private fin$ = new Subject<void>();

  constructor(private service: CommandeService) {}

  ngOnInit(): void {
    this.chargement = true;
    this.service.getMesCommandes().pipe(takeUntil(this.fin$)).subscribe({
      next: (liste) => { this.commandes = liste; this.chargement = false; },
      error: (e) => { this.erreur = messageErreur(e, 'Impossible de charger les commandes.'); this.chargement = false; },
    });
  }

  ngOnDestroy(): void { this.fin$.next(); this.fin$.complete(); }

  libelleStatut(statut: StatutCommande): string {
    return this.statuts.find((s) => s.valeur === statut)?.libelle ?? statut;
  }

  resumeProduits(commande: Commande): string {
    return commande.lignes.map((l) => `${l.produitNom} × ${l.quantite}`).join(', ');
  }
}
