// src/app/_pages/boutique/catalogue/catalogue.ts
import { Component, signal, computed } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { Category } from '../../../_models/category';
import { Product } from '../../../_models/product';
import { CartService } from '../../../_services/cart-service';
import Swal from 'sweetalert2';
import { Footer } from '../../../_components/footer/footer';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-catalogue',
  standalone: true,
  imports: [CommonModule, HttpClientModule, Footer, RouterLink],
  templateUrl: './catalogue.html'
})
export class Catalogue {
  categories = signal<Category[]>([]);
  products = signal<Product[]>([]);
  selectedCategoryId = signal<number | null>(null);

  filteredProducts = computed(() => {
    const catId = this.selectedCategoryId();
    if (!catId) return this.products();
    return this.products().filter(p => p.categorie === catId);
  });

  constructor(private http: HttpClient, private cartService: CartService) {
    this.loadCategories();
    this.loadProducts();
  }

  getProductImage(product: Product) {
    return '/images/produits/' + product.reference_image;
  }

  selectedCategoryTitle = computed(() => {
    const catId = this.selectedCategoryId();
    if (!catId) return 'Toutes';
    const cat = this.categories().find(c => c.id === catId);
    return cat ? cat.titre : 'Toutes';
  });

  loadCategories() {
    this.http.get<Category[]>('/data/categories.json').subscribe(data => {
      this.categories.set(data);
    });
  }

  loadProducts() {
    this.http.get<Product[]>('/data/produits.json').subscribe(data => {
      this.products.set(data);
    });
  }

  filterByCategory(categoryId: number | null) {
    this.selectedCategoryId.set(categoryId);
  }

  addToCart(product: Product) {
    this.cartService.addProduct(product);

    // Popup SweetAlert2
    Swal.fire({
      icon: 'success',
      title: 'Produit ajouté !',
      text: `${product.nom} a été ajouté à votre panier.`,
      timer: 1500,
      showConfirmButton: false
    });
  }
}
