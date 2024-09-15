import { CanActivateFn } from '@angular/router';
import { inject } from '@angular/core';
import { AuthService } from './auth.service';
import { Router } from '@angular/router';

export const authGuard: CanActivateFn = (route, state) => {
  const authService = inject(AuthService); //Inyecta el servicio de autenticación
  const router = inject(Router); //Inyecta el enrutador

  if (authService.isAuthenticated()) {
    return true;//Si está autenticado, permite el acceso
  } else {
    router.navigate(['/login']); //Si no redirigir al login si no está autenticado
    return false;
  }
};
