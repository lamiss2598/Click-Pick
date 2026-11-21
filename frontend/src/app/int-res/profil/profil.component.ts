import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subject, filter, takeUntil } from 'rxjs';

import { Restaurant } from '../../models/restaurant.model';
import { EspaceRestaurateurService } from '../espace-restaurateur.service';

@Component({
  selector: 'app-profil',
  templateUrl: './profil.component.html',
  styleUrls: ['./profil.component.css'],
})
export class ProfilComponent implements OnInit, OnDestroy {
  restaurant: Restaurant | null = null;
  private fin$ = new Subject<void>();

  constructor(private espace: EspaceRestaurateurService) {}

  ngOnInit(): void {
    this.espace.selection$.pipe(filter((r): r is Restaurant => r !== null), takeUntil(this.fin$))
      .subscribe((r) => this.restaurant = r);
  }

  ngOnDestroy(): void { this.fin$.next(); this.fin$.complete(); }
}
