import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import { AuthService } from '../services/auth.service';
import { EspaceRestaurateurService } from './espace-restaurateur.service';

@Component({
  selector: 'app-int-res',
  templateUrl: './int-res.component.html',
  styleUrls: ['./int-res.component.css'],
})
export class IntResComponent implements OnInit {
  restaurants$ = this.espace.restaurants$;
  selection$ = this.espace.selection$;
  erreur$ = this.espace.erreur$;

  constructor(private espace: EspaceRestaurateurService, private auth: AuthService, private router: Router) {}

  ngOnInit(): void {
    this.espace.charger();
  }

  changerRestaurant(event: Event): void {
    this.espace.choisir(Number((event.target as HTMLSelectElement).value));
  }

  deconnexion(): void {
    this.auth.logout();
    this.router.navigate(['/']);
  }
}
