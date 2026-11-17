import { Component, EventEmitter, Output } from '@angular/core';

@Component({
  selector: 'app-category-filter',
  templateUrl: './category-filter.component.html',
  styleUrls: ['./category-filter.component.css'],
})
export class CategoryFilterComponent {
  categories: string[] = ['Pizza', 'Burger', 'Sushi', 'Plats', 'Tacos', 'Salades', 'Desserts', 'Grillades', 'Café'];
  selected: string | null = null;

  // Prévient la page d'accueil quand la catégorie change
  @Output() changed = new EventEmitter<string | null>();

  // Un second clic sur la catégorie active la désélectionne (on revoit tout)
  choose(category: string): void {
    this.selected = this.selected === category ? null : category;
    this.changed.emit(this.selected);
  }
}
