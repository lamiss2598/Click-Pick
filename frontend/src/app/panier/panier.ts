import { Component, computed, inject, signal } from '@angular/core';
import { DecimalPipe,CommonModule } from '@angular/common';
import { Router, RouterLink } from '@angular/router';
interface CartItem {
  id: number;
  name: string;
  category: string;
  icon: string;
  price: number;
  quantity: number;
}

@Component({
  selector: 'app-panier',
  standalone: true,
  imports: [DecimalPipe, RouterLink,CommonModule],
  templateUrl: './panier.html',
  styleUrls: ['./panier.css']
})
export class Panier {
  readonly maxComment = 200;

  // Placeholder data: replace with real data later (service / login / API)
  restaurant = {
    name: 'Shop name',
    address: '12 Example Street, City, 1000',
    phone: '+216 00 000 000',
    email: 'contact@restaurant.com',
    hours: 'Open daily 11:00 – 23:00',
  };

  client = {
    name: 'Client name',
    phone: '+216 00 000 000',
    email: 'client@email.com',
  };

  // Pickup time is chosen on another page: later, read it from a shared service
  pickupTime = signal('Today, 19:30');

  comment = signal('');
  orderPlaced = signal(false);
  private router = inject(Router);

  showPayment = signal(false);

  // Promo code (test codes: later, check them with your backend)
  private promoCodes: Record<string, number> = { WELCOME10: 10, FOOD20: 20 };
  promoCode = signal('');
  appliedCode = signal('');
  discountPercent = signal(0);
  promoError = signal('');

  items = signal<CartItem[]>([
  { id: 1, name: 'Burger', category: 'Main course', icon: '', price: 9.5, quantity: 2 },
  { id: 2, name: 'Tiramisu', category: 'Dessert', icon: '', price: 5, quantity: 1 },
  { id: 3, name: 'Orange juice', category: 'Drink', icon: '', price: 3.5, quantity: 2 },
  { id: 4, name: 'Pizza Margherita', category: 'Main course', icon: '', price: 11, quantity: 1 },
  { id: 5, name: 'Caesar salad', category: 'Starter', icon: '', price: 7.5, quantity: 1 },
  { id: 6, name: 'Coffee', category: 'Drink', icon: '', price: 2.5, quantity: 3 },
  ]);

  count = computed(() => this.items().reduce((sum, i) => sum + i.quantity, 0));
  total = computed(() => this.items().reduce((sum, i) => sum + i.price * i.quantity, 0));
  discount = computed(() => (this.total() * this.discountPercent()) / 100);
  finalTotal = computed(() => this.total() - this.discount());

  increase(id: number) {
    this.items.update(list =>
      list.map(i => (i.id === id ? { ...i, quantity: i.quantity + 1 } : i))
    );
  }

  decrease(id: number) {
    this.items.update(list =>
      list
        .map(i => (i.id === id ? { ...i, quantity: i.quantity - 1 } : i))
        .filter(i => i.quantity > 0)
    );
  }

  remove(id: number) {
    this.items.update(list => list.filter(i => i.id !== id));
  }

  clear() {
    if (confirm('Remove all items from your cart?')) {
      this.items.set([]);
    }
  }

  onComment(event: Event) {
    this.comment.set((event.target as HTMLTextAreaElement).value);
  }

  placeOrder() {
    if (this.items().length === 0) return;
    this.showPayment.set(true);
  }

  payByCard() {
    // The payment page will be built later
    this.router.navigate(['/payment']);
  }

  payCash() {
    console.log('Order sent:', {
      items: this.items(),
      total: this.finalTotal(),
      promo: this.appliedCode(),
      payment: 'cash',
      pickupTime: this.pickupTime(),
      comment: this.comment(),
      client: this.client,
    });
    this.orderPlaced.set(true);
  }

  onPromo(event: Event) {
    this.promoCode.set((event.target as HTMLInputElement).value);
    this.promoError.set('');
  }

  applyPromo() {
    const code = this.promoCode().trim().toUpperCase();
    const percent = this.promoCodes[code];

    if (percent) {
      this.appliedCode.set(code);
      this.discountPercent.set(percent);
      this.promoError.set('');
    } else {
      this.promoError.set('Invalid promo code');
    }
  }

  removePromo() {
    this.appliedCode.set('');
    this.discountPercent.set(0);
    this.promoCode.set('');
  }
  trackById(index: number, item: CartItem): number {
  return item.id;
}
}