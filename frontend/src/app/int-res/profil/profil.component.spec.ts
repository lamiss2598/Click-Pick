
import { Component } from '@angular/core';

@Component({
  selector: 'app-profil',
  standalone: true,
  templateUrl: './profil.component.html',
  styleUrls: ['./profil.component.css']
})
export class ProfilComponent {

  nomRestaurant = 'Mon Restaurant';
  adresse = 'Tunis, Tunisie';
  telephone = '20123456';
  email = 'restaurant@gmail.com';
  horaires = '08:00 - 22:00';

  message = '';

  enregistrer() {
    this.message = 'Les informations ont été enregistrées !';
  }

}

