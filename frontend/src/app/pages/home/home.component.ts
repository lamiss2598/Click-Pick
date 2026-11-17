import { Component } from '@angular/core';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
})
export class HomeComponent {
  category: string | null = null;

  onCategoryChange(category: string | null): void {
    this.category = category;
  }
}
