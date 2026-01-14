import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Router } from '@angular/router';
import { Auth } from '../../_services/auth';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './accueil.html'
})
export class Accueil {
  constructor(public auth: Auth, private router: Router) {}

  chooseOption(option: 'sur_place' | 'a_emporter') {
    this.auth.setChoice(option);
    this.router.navigate(['/boutique/catalogue']);
  }
}
