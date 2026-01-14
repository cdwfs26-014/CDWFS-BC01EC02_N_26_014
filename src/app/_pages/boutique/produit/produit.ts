import { Component, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { Product } from '../../../_models/product';
import { CartService } from '../../../_services/cart-service';
import { HttpClientModule, HttpClient } from '@angular/common/http';
import { Footer } from '../../../_components/footer/footer';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-produit',
  standalone: true,
  imports: [CommonModule, RouterLink, HttpClientModule, Footer],
  templateUrl: './produit.html'
})
export class Produit {
  product = signal<Product | null>(null);

  constructor(
    private route: ActivatedRoute,
    private cartService: CartService,
    private http: HttpClient
  ) {
    const ref = this.route.snapshot.params['ref'];
    this.loadProduct(ref);
  }

  loadProduct(reference_produit: string) {
    this.http.get<Product[]>('/data/produits.json').subscribe(data => {
      const prod = data.find(p => p.reference_produit === reference_produit) || null;
      this.product.set(prod);
    });
  }

  addToCart() {
    if (!this.product()) return;

    this.cartService.addProduct(this.product()!);

    Swal.fire({
      icon: 'success',
      title: 'Produit ajouté !',
      text: `${this.product()!.nom} a été ajouté à votre panier.`,
      timer: 1500,
      showConfirmButton: false
    });
  }
}
