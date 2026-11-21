import { Component, EventEmitter, Output } from '@angular/core';
import { Router } from '@angular/router';

import { AuthService } from '../../services/auth.service';
import { CartService } from '../../services/cart.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css'],
})
export class NavbarComponent {
  @Output() searchChange = new EventEmitter<string>();

  utilisateur$ = this.auth.utilisateur$;

  constructor(private auth: AuthService, public panier: CartService, private router: Router) {}

  onSearch(event: Event): void {
    this.searchChange.emit((event.target as HTMLInputElement).value);
  }

  deconnexion(): void {
    this.auth.logout();
    this.router.navigate(['/']);
  }
}
