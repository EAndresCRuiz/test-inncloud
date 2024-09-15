import { Component } from '@angular/core';
import { AuthService } from '../auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-logout',
  template: `<button mat-raised-button (click)="onLogout()">Cerrar Sesión</button>`
})
export class LogoutComponent {
  constructor(private authService: AuthService, private router: Router) { }

  onLogout(): void {
    this.authService.logout();
    this.router.navigate(['/login']);
  }
}