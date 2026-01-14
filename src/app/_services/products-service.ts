import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Product } from '../_models/product';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class ProductsService {

  private readonly PRODUCTS_URL = '/data/produits.json';

  constructor(private http: HttpClient) {}

  getProducts(): Observable<Product[]> {
    return this.http.get<Product[]>(this.PRODUCTS_URL);
  }

  getProductByReference(ref: string): Observable<Product | undefined> {
    return this.http.get<Product[]>(this.PRODUCTS_URL).pipe(
      map(products => products.find(p => p.reference_produit === ref))
    );
  }
}
