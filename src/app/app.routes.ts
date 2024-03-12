import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: 'registro',
    loadComponent: ()=> import('./layouts/registro/registro.component'),
  },{
    path: 'dashboard',
    loadComponent: ()=> import('./layouts/dashboard/dashboard.component'),
  },{
    path: 'login-usuario',
    loadComponent: ()=> import('./layouts/login-usuario/login-usuario.component'),
  },{
    path: '**',
    redirectTo: 'registro'
  }
];
