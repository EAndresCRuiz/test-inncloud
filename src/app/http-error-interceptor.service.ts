import { Injectable } from '@angular/core';
import { HttpEvent, HttpInterceptor, HttpHandler, HttpRequest, HttpErrorResponse } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';

@Injectable()
export class HttpErrorInterceptor implements HttpInterceptor {

  constructor(private snackBar: MatSnackBar, private router: Router) { }

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    return next.handle(req).pipe(
      catchError((error: HttpErrorResponse) => {
        let errorMessage = '';
        if (error.error instanceof ErrorEvent) {
          // Error del lado del cliente
          errorMessage = `Error: ${error.error.message}`;
        } else {
          // Error del lado del servidor
          errorMessage = `Error Status: ${error.status}\nMessage: ${error.message}`;
        }

        // Mostrar el error en la interfaz (usando Angular Material Snackbar)
        this.snackBar.open(errorMessage, 'Cerrar', {
          duration: 5000,
        });

        // Redirigir al login si es un error 401 (no autorizado)
        if (error.status === 401) {
          this.router.navigate(['/login']);
        }

        // Si el error es crítico, puedes manejar otras redirecciones o acciones
        if (error.status === 500) {
          // Podrías redirigir a una página de error general
          this.router.navigate(['/error']);
        }

        // Devuelve el error para que pueda ser procesado por otros interceptores o el servicio
        return throwError(errorMessage);
      })
    );
  }
}