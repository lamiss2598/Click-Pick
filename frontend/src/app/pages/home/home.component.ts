import { Component, signal } from '@angular/core';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
})
export class HomeComponent {
  category = signal<string | null>(null);
  searchTerm = signal('');

  onCategoryChange(category: string | null): void {
    this.category.set(category);
  }

  onSearchChange(value: string): void {
    this.searchTerm.set(value.trim().toLowerCase());
  }
}
