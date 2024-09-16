import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './auth/login/login.component';
import { authGuard } from './auth/auth.guard';
import { LayoutComponent } from './layout/layout.component';

const routes: Routes = [
  { path: 'login', component: LoginComponent },
  {
    path: '',
    component: LayoutComponent,
    children: [
      { path: 'proyectos', loadChildren: () => import('./proyectos/proyectos.module').then(m => m.ProyectosModule), canActivate: [authGuard] },
      { path: 'tareas', loadChildren: () => import('./tareas/tareas.module').then(m => m.TareasModule), canActivate: [authGuard] },
      { path: '', redirectTo: 'proyectos', pathMatch: 'full' }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }