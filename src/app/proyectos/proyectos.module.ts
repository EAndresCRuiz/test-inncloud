import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ListaProyectosComponent } from './lista-proyectos/lista-proyectos.component';
import { ProyectosRoutingModule } from './proyectos-routing.module';
import { HttpClientModule } from '@angular/common/http';
import { MatCardModule } from '@angular/material/card';
import { MatGridListModule } from '@angular/material/grid-list';
import { MatButtonModule } from '@angular/material/button';
import { MatToolbarModule } from '@angular/material/toolbar'; // Para la barra de herramientas
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner'; // Para el spinner de carga

@NgModule({
  declarations: [
    ListaProyectosComponent
  ],
  imports: [
    CommonModule,
    ProyectosRoutingModule,
    HttpClientModule,
    MatCardModule,
    MatGridListModule,
    MatButtonModule,
    MatToolbarModule,
    MatProgressSpinnerModule
  ]
})
export class ProyectosModule { }
