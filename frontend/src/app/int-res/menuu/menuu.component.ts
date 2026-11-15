import { Component } from '@angular/core';

@Component({
  selector: 'app-menuu',
  templateUrl: './menuu.component.html',
  styleUrls: ['./menuu.component.css']
})
export class MenuuComponent {

  plats = [
    {
      id: 1,
      nom: 'Pizza Margherita',
      description: 'Sauce tomate, mozzarella et basilic',
      prix: 12,
      categorie: 'Pizza',
      disponible: true
    },
    {
      id: 2,
      nom: 'Burger classique',
      description: 'Pain, viande, fromage et salade',
      prix: 10,
      categorie: 'Burger',
      disponible: true
    },
    {
      id: 3,
      nom: 'Sandwich Escalope',
      description: 'Escalope, salade et sauce',
      prix: 8,
      categorie: 'Sandwich',
      disponible: false
    }
  ];

  nouveauPlat = {
    nom: '',
    description: '',
    prix: 0,
    categorie: '',
    disponible: true
  };

  modeModification = false;
  idModification = 0;

  ajouterPlat() {
    if (
      this.nouveauPlat.nom.trim() === '' ||
      this.nouveauPlat.prix <= 0 ||
      this.nouveauPlat.categorie === ''
    ) {
      alert('Veuillez remplir les champs obligatoires.');
      return;
    }

    if (this.modeModification) {
      const plat = this.plats.find(p => p.id === this.idModification);

      if (plat) {
        plat.nom = this.nouveauPlat.nom;
        plat.description = this.nouveauPlat.description;
        plat.prix = this.nouveauPlat.prix;
        plat.categorie = this.nouveauPlat.categorie;
        plat.disponible = this.nouveauPlat.disponible;
      }

      this.modeModification = false;
      this.idModification = 0;

    } else {
      this.plats.push({
        id: Date.now(),
        nom: this.nouveauPlat.nom,
        description: this.nouveauPlat.description,
        prix: this.nouveauPlat.prix,
        categorie: this.nouveauPlat.categorie,
        disponible: this.nouveauPlat.disponible
      });
    }

    this.viderFormulaire();
  }

  modifierPlat(plat: any) {
    this.nouveauPlat = {
      nom: plat.nom,
      description: plat.description,
      prix: plat.prix,
      categorie: plat.categorie,
      disponible: plat.disponible
    };

    this.modeModification = true;
    this.idModification = plat.id;
  }

  supprimerPlat(id: number) {
    if (confirm('Voulez-vous vraiment supprimer ce plat ?')) {
      this.plats = this.plats.filter(p => p.id !== id);
    }
  }

  changerDisponibilite(plat: any) {
    plat.disponible = !plat.disponible;
  }

  viderFormulaire() {
    this.nouveauPlat = {
      nom: '',
      description: '',
      prix: 0,
      categorie: '',
      disponible: true
    };
  }

  annulerModification() {
    this.modeModification = false;
    this.idModification = 0;
    this.viderFormulaire();
  }
}
