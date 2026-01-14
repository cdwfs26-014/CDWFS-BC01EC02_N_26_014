import { Injectable, signal } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { catchError, map, of } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class Auth {

  token = signal<string | null>(null);
  errorMessage = signal<string | null>(null);

  private apiKey = 'reqres_f060f0bc93254230b40b4db1ad862106';
  private choiceKey = 'userChoice'; // pour sur place / à emporter

  constructor(private http: HttpClient, private router: Router) {
    this.loadToken();
  }

  private loadToken() {
    const storedToken = localStorage.getItem('auth-token');
    if (storedToken) this.token.set(storedToken);
  }

  private saveToken(token: string) {
    localStorage.setItem('auth-token', token);
    this.token.set(token);
  }

  logout() {
    localStorage.removeItem('auth-token');
    this.token.set(null);
    this.router.navigate(['/login']);
  }

  isLoggedIn(): boolean {
    return this.token() !== null;
  }

  login(email: string, password: string) {
    this.errorMessage.set(null);

    this.http.post<{ token: string }>(
      'https://reqres.in/api/login',
      { email, password },
      {
        headers: {
          'x-api-key': this.apiKey
        }
      }
    )
    .pipe(
      map(res => res.token),
      catchError(err => {
        this.errorMessage.set('Identifiants incorrects');
        return of(null);
      })
    )
    .subscribe(token => {
      if (token) {
        this.saveToken(token);
        this.router.navigate(['/boutique/catalogue']);
      }
    });
  }

  setChoice(option: 'sur_place' | 'a_emporter') {
    localStorage.setItem(this.choiceKey, option);
  }

  getChoice(): 'sur_place' | 'a_emporter' | null {
    const value = localStorage.getItem(this.choiceKey);
    return value === 'sur_place' || value === 'a_emporter' ? value : null;
  }
}
