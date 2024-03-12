import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: 'login',
    loadComponent: ()=> import('./layouts/login-admin/login-admin.component'),
  },{
    path: 'dashboard',
    loadComponent: ()=> import('./layouts/dashboard/dashboard.component'),
  },{
    path: 'login-usuario',
    loadComponent: ()=> import('./layouts/login-usuario/login-usuario.component'),
  },{
    path: '**',
    redirectTo: 'login'
  }
];
