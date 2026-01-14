import { Component } from '@angular/core';
import { Auth } from '../../_services/auth';

@Component({
  selector: 'app-logout',
  standalone: true,
  template: '',
})
export class Logout {
  constructor(private authService: Auth) {
    this.authService.logout();
  }
}
