import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Category } from '../_models/category';

@Injectable({
  providedIn: 'root'
})
export class CategoriesService {

  private readonly CATEGORIES_URL = '/data/categories.json';

  constructor(private http: HttpClient) {}

  getCategories(): Observable<Category[]> {
    return this.http.get<Category[]>(this.CATEGORIES_URL);
  }
}
