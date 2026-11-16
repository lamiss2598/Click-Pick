
import { FormsModule } from '@angular/forms';
import { Component, signal } from '@angular/core';
interface Product {
  id: number;
  name: string;
  description: string;
  price: number;
  category: string;
  inStock: boolean;
}

@Component({
  selector: 'app-add-product',
  imports: [FormsModule],
  templateUrl: './add-product.html',
  styleUrl: './add-product.css',
})
export class AddProduct {
  name = '';
  description = '';
  price: number | null = null;
  category = 'Starter';
  error = '';

  categories = ['Starter', 'Main course', 'Dessert', 'Drink'];

  products: Product[] = [];

  addProduct() {
    if (!this.name.trim() || this.price === null) {
      this.error = 'Enter a name and a price.';
      return;
    }
    this.products.push({
      id: Date.now(),
      name: this.name,
      description: this.description,
      price: this.price,
      category: this.category,
      inStock: true,
    });
    this.name = '';
    this.description = '';
    this.price = null;
    this.error = '';
  }

  toggleStock(p: Product) {
    p.inStock = !p.inStock;
  }

  deleteProduct(id: number) {
    this.products = this.products.filter(p => p.id !== id);
  }
  get count() {
    return new Set(this.products.map(p => p.category)).size;
  }
  productsByCategory(cat: string) {
    return this.products.filter(p => p.category === cat);
  }


  submitting = signal(false);
  submitted = signal(false);
  submitError = signal('');

  submitMenu() {
    if (this.products.length === 0) {
      this.submitError.set('Add at least one product before submitting.');
      return;
    }

    this.submitError.set('');
    this.submitting.set(true);

    setTimeout(() => {
      this.submitting.set(false);
      this.submitted.set(true);
    }, 3000);
  }

}