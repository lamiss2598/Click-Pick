
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

  // Vérifier le format de l'email
  emailValide(email: string): boolean {
    const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return regex.test(email);
  }

  // Vérifier la sécurité du mot de passe
  passwordSecurise(password: string): boolean {
    const regex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*()_+\-=\[\]{};':"\\|,.<>/?]).{8,}$/;
    return regex.test(password);
  }

  signIn() {

    if (!this.loginEmail || !this.loginPassword) {
      alert('Veuillez remplir tous les champs');
      return;
    }

    if (!this.emailValide(this.loginEmail)) {
      alert('Veuillez saisir une adresse email valide !');
      return;
    }

    if (!this.passwordSecurise(this.loginPassword)) {
      alert('Mot de passe invalide ! Il doit contenir au moins 8 caractères, une majuscule, une minuscule, un chiffre et un caractère spécial.');
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

    if (!this.emailValide(this.signupEmail)) {
      alert('Veuillez saisir une adresse email valide !');
      return;
    }

    if (!this.passwordSecurise(this.signupPassword)) {
      alert('Le mot de passe doit contenir au moins 8 caractères, une majuscule, une minuscule, un chiffre et un caractère spécial !');
      return;
    }

    if (this.signupPassword !== this.confirmPassword) {
      alert('Les mots de passe ne correspondent pas !');
      return;
    }

    alert('Compte créé avec succès !');

    if (this.role === 'restaurateur') {
      this.router.navigate(['/int-res']);
    } else {
      this.router.navigate(['/restaurants']);
    }

    console.log('Nom:', this.fullName);
    console.log('Email:', this.signupEmail);
    console.log('Rôle:', this.role);
  }
}

