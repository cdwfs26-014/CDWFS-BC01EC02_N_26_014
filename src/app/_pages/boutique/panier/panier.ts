import { Component, computed } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CartService } from '../../../_services/cart-service';
import { Auth } from '../../../_services/auth';
import { RouterLink } from '@angular/router';
import { Footer } from '../../../_components/footer/footer';

@Component({
  selector: 'app-panier',
  standalone: true,
  imports: [CommonModule, RouterLink, Footer],
  templateUrl: './panier.html'
})
export class Panier {

  constructor(public cartService: CartService, public authService: Auth) {}

  // Supprimer un produit du panier par référence_produit
  remove(referenceProduit: string) {
    this.cartService.removeProduct(referenceProduit);
  }

  total = computed(() => this.cartService.total());
  totalWithDiscount = computed(() => this.cartService.totalWithDiscount());
}
