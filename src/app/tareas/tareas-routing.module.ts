import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ListaTareasComponent } from './lista-tareas/lista-tareas.component';
import { CrearTareaComponent } from './crear-tarea/crear-tarea.component';

const routes: Routes = [
  { path: '', component: ListaTareasComponent },
  { path: 'crear/:idUsuario', component: CrearTareaComponent },
  { path: 'editar/:id', component: CrearTareaComponent },
  { path: ':idUsuario', component: ListaTareasComponent },
  { path: ':idUsuario/crear', component: CrearTareaComponent },
  { path: ':idUsuario/editar/:idTarea', component: CrearTareaComponent }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class TareasRoutingModule { }