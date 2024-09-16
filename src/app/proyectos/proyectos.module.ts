import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ListaProyectosComponent } from './lista-proyectos/lista-proyectos.component';
import { ProyectosRoutingModule } from './proyectos-routing.module';
import { HttpClientModule } from '@angular/common/http';
import { MatCardModule } from '@angular/material/card';
import { MatGridListModule } from '@angular/material/grid-list';
import { MatButtonModule } from '@angular/material/button';
import { MatToolbarModule } from '@angular/material/toolbar'; // Para la barra de herramientas
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { CrearProyectoComponent } from './crear-proyecto/crear-proyecto.component';
import { ReactiveFormsModule } from '@angular/forms';
import { MatIconModule } from '@angular/material/icon';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSnackBarModule } from '@angular/material/snack-bar';

@NgModule({
  declarations: [
    ListaProyectosComponent,
    CrearProyectoComponent
  ],
  imports: [
    CommonModule,
    ProyectosRoutingModule,
    HttpClientModule,
    MatCardModule,
    MatGridListModule,
    MatButtonModule,
    MatToolbarModule,
    MatProgressSpinnerModule,
    ReactiveFormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatIconModule,
    MatSnackBarModule
  ]
})
export class ProyectosModule { }
