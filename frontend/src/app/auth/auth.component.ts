import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

import { messageErreur } from '../core/erreurs';
import { Role } from '../models/utilisateur.model';
import { AuthService } from '../services/auth.service';

@Component({
  selector: 'app-auth',
  templateUrl: './auth.component.html',
  styleUrls: ['./auth.component.css'],
})
export class AuthComponent {
  mode: 'signin' | 'signup' = 'signin';
  role: Role = 'CLIENT';

  loginEmail = '';
  loginPassword = '';

  prenom = '';
  nom = '';
  telephone = '';
  restaurantNom = '';
  adresseRestaurant = '';
  categorieRestaurant = 'Pizza';
  signupEmail = '';
  signupPassword = '';
  confirmPassword = '';

  erreur = '';
  info = '';
  chargement = false;

  constructor(private auth: AuthService, private router: Router, private route: ActivatedRoute) {}

  choisirMode(mode: 'signin' | 'signup'): void {
    this.mode = mode;
    this.erreur = '';
    this.info = '';
  }

  choisirRole(role: Role): void {
    this.role = role;
  }

  emailValide(email: string): boolean {
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
  }

  passwordSecurise(password: string): boolean {
    return /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*()_+\-=[\]{};':"\\|,.<>/?]).{8,}$/.test(password);
  }

  signIn(): void {
    this.erreur = '';

    if (!this.loginEmail.trim() || !this.loginPassword) {
      this.erreur = 'Veuillez remplir tous les champs.';
      return;
    }
    if (!this.emailValide(this.loginEmail.trim())) {
      this.erreur = 'Veuillez saisir une adresse email valide.';
      return;
    }

    this.chargement = true;
    this.auth.login({ email: this.loginEmail.trim(), motDePasse: this.loginPassword }).subscribe({
      next: () => this.redirigerApresConnexion(),
      error: (e) => {
        this.chargement = false;
        this.erreur = messageErreur(e, 'Connexion impossible. Vérifiez votre email et votre mot de passe.');
      },
    });
  }

  signUp(): void {
    this.erreur = '';

    if (!this.prenom.trim() || !this.nom.trim() || !this.signupEmail.trim() || !this.signupPassword || !this.confirmPassword) {
      this.erreur = 'Veuillez remplir tous les champs obligatoires.';
      return;
    }
    if (!this.emailValide(this.signupEmail.trim())) {
      this.erreur = 'Veuillez saisir une adresse email valide.';
      return;
    }
    if (!this.passwordSecurise(this.signupPassword)) {
      this.erreur =
        'Le mot de passe doit contenir au moins 8 caractères, une majuscule, une minuscule, un chiffre et un caractère spécial.';
      return;
    }
    if (this.signupPassword !== this.confirmPassword) {
      this.erreur = 'Les mots de passe ne correspondent pas.';
      return;
    }

    this.chargement = true;
    this.auth
      .register({
        nom: this.nom.trim(),
        prenom: this.prenom.trim(),
        email: this.signupEmail.trim(),
        motDePasse: this.signupPassword,
        telephone: this.telephone.trim(),
        role: this.role,
        restaurantNom: this.restaurantNom.trim(),
        adresse: this.adresseRestaurant.trim(),
        categorie: this.categorieRestaurant.trim(),
      })
      .subscribe({
        next: () => {
          if (this.auth.estConnecte) {
            this.redirigerApresConnexion();
          } else {
            // Le backend n'a pas renvoyé de jeton : on invite à se connecter.
            this.chargement = false;
            this.loginEmail = this.signupEmail.trim();
            this.loginPassword = '';
            this.mode = 'signin';
            this.info = 'Compte créé avec succès. Vous pouvez maintenant vous connecter.';
          }
        },
        error: (e) => {
          this.chargement = false;
          this.erreur = messageErreur(e, 'Création du compte impossible.');
        },
      });
  }

  private redirigerApresConnexion(): void {
    this.chargement = false;
    const retour = this.route.snapshot.queryParamMap.get('returnUrl');
    const estRestaurateur = this.auth.aLeRole('RESTAURATEUR');

    if (retour && retour.startsWith('/') && (!retour.startsWith('/int-res') || estRestaurateur)) {
      this.router.navigateByUrl(retour);
    } else {
      this.router.navigate([estRestaurateur ? '/int-res' : '/']);
    }
  }
}
