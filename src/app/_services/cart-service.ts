import { Injectable, signal } from '@angular/core';
import { Product } from '../_models/product';

export interface CartItem {
  product: Product;
  quantity: number;
}

@Injectable({ providedIn: 'root' })
export class CartService {
  private itemsSignal = signal<CartItem[]>([]);

  constructor() {
    this.loadFromStorage();
  }

  getItems() {
    return this.itemsSignal;
  }

  addProduct(product: Product) {
    const items = this.itemsSignal();
    const existing = items.find(i => i.product.reference_produit === product.reference_produit);
    if (existing) {
      existing.quantity++;
    } else {
      items.push({ product, quantity: 1 });
    }
    this.itemsSignal.set([...items]);
    this.saveToStorage();
  }

  removeProduct(referenceProduit: string) {
    const items = this.itemsSignal().filter(i => i.product.reference_produit !== referenceProduit);
    this.itemsSignal.set(items);
    this.saveToStorage();
  }

  total() {
    return this.itemsSignal().reduce((sum, i) => sum + i.product.prix_unitaire * i.quantity, 0);
  }

  totalWithDiscount() {
    return this.total() * 0.98;
  }

  // --- Persistance ---
  private saveToStorage() {
    localStorage.setItem('cart', JSON.stringify(this.itemsSignal()));
  }

  private loadFromStorage() {
    const data = localStorage.getItem('cart');
    if (data) {
      this.itemsSignal.set(JSON.parse(data));
    }
  }

  clear() {
    this.itemsSignal.set([]);
    localStorage.removeItem('cart');
  }
}
