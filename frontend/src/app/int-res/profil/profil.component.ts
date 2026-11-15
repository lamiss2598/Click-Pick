
import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-profil',
  templateUrl: './profil.component.html',
  styleUrls: ['./profil.component.css']
})
export class ProfilComponent {

  // Informations du restaurant
  nomRestaurant: string = 'Mon Restaurant';

  adresse: string = 'Tunis, Tunisie';

  telephone: string = '20123456';

  email: string = 'restaurant@gmail.com';

  horaires: string = '08:00 - 22:00';

  // Message de confirmation
  message: string = '';

  // Enregistrer les modifications
  enregistrer() {
    this.message = 'Les informations ont été enregistrées avec succès !';
  }

}

