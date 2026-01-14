import { Component, signal, computed } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Footer } from '../../../_components/footer/footer';

interface Product {
  id: number;
  name: string;
  image: string;
}

@Component({
  selector: 'app-ma-boite',
  standalone: true,
  imports: [CommonModule, Footer],
  templateUrl: './ma-boite.html',
  styleUrls: ['./ma-boite.css']
})
export class MaBoite {
  products: Product[] = [
    { id: 1, name: 'Maki', image: 'images/produits/maki/Maki Cheese Avocat.png' },
    { id: 2, name: 'California', image: 'images/produits/california/California Crevette Tempura.png' },
    { id: 3, name: 'spring rolls', image: 'images/produits/spring rolls/Spring Tataki Saumon.png' },
  ];

  box = signal<Product[]>([]);

  boxSize = computed(() => {
    const len = this.box().length;
    if (len <= 4) return 4;
    if (len <= 6) return 6;
    return 9;
  });

  addProduct(product: Product) {
    if (this.box().length >= 9) return;
    this.box.update(prev => [...prev, product]);
  }

  removeProduct(index: number) {
    this.box.update(prev => prev.filter((_, i) => i !== index));
  }
}
