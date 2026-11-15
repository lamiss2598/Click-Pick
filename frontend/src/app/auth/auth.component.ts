import { Router } from '@angular/router';
import { Component } from '@angular/core';

@Component({
  selector: 'app-auth',
  templateUrl: './auth.component.html',
  styleUrls: ['./auth.component.css']
})
export class AuthComponent {

  mode: string = 'signin';
  role: string = 'client';
  loginEmail: string = '';
  loginPassword: string = '';

  fullName: string = '';
  signupEmail: string = '';
  signupPassword: string = '';
  confirmPassword: string = '';
  constructor(private router: Router) {}
  choisirMode(mode: string) {
    this.mode = mode;
  }

  choisirRole(role: string) {
    this.role = role;
  }

  signIn() {
    if (!this.loginEmail || !this.loginPassword) {
      alert('Veuillez remplir tous les champs');
      return;
  }

  if (this.role === 'restaurateur') {

    this.router.navigate(['/int-res']);

  } else {

    this.router.navigate(['/restaurants']);

  }
  }

  signUp() {
  if (!this.fullName || !this.signupEmail ||
      !this.signupPassword || !this.confirmPassword) {
    alert('Veuillez remplir tous les champs !');
    return;
  }

  if (this.signupPassword !== this.confirmPassword) {
    alert('Les mots de passe ne correspondent pas !');
    return;
  }

  alert('Compte créé avec succès !');

  if (this.role === 'restaurateur') {
    this.router.navigate(['/int-res']);
  }
  else {
    this.router.navigate(['/restaurants']);
  }
  console.log('Nom:', this.fullName);
  console.log('Email:', this.signupEmail);
  console.log('Rôle:', this.role);
}   
}
