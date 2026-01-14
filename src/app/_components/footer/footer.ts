import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { Auth } from '../../_services/auth';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-footer',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './footer.html'
})
export class Footer {
  constructor(public auth: Auth, private router: Router) {}

  handleUserClick() {
    if (this.auth.isLoggedIn()) {
      this.auth.logout();
      alert('Vous avez été déconnecté.');
      this.router.navigate(['/']);
    } else {
      this.router.navigate(['/login']);
    }
  }
}
