import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ListaProyectosComponent } from './lista-proyectos/lista-proyectos.component';
import { CrearProyectoComponent } from './crear-proyecto/crear-proyecto.component';

const routes: Routes = [
  { path: '', component: ListaProyectosComponent },
  { path: 'crear', component: CrearProyectoComponent },
  { path: 'editar/:id', component: CrearProyectoComponent }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ProyectosRoutingModule { }