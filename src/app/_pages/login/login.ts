import { Component, signal } from '@angular/core';
import { Auth } from '../../_services/auth';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './login.html',
})
export class Login {

  email = signal('');
  password = signal('');

  constructor(public authService: Auth) {}

  submit() {
    if (!this.email() || !this.password()) {
      this.authService.errorMessage.set('Veuillez remplir tous les champs');
      return;
    }
    this.authService.login(this.email(), this.password());
  }

  // helper pour le template : renvoie true si message d'erreur présent
  hasError() {
    return !!this.authService.errorMessage();
  }
}
