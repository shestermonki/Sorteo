import { Routes } from '@angular/router';
import { AdminGuard } from './guards/admin.guard';

export const routes: Routes = [
  {
    path: 'login',
    loadComponent: ()=> import('./layouts/login-admin/login-admin.component'),
  },
  {
    path: 'dashboard', canActivate: [AdminGuard],
    loadComponent: ()=> import('./layouts/dashboard/dashboard.component'),
  },
  {
    path: 'login-usuario',
    loadComponent: ()=> import('./layouts/login-usuario/login-usuario.component'),
  },{
    path: 'sorteo',
    loadComponent: ()=> import('./pages/user/sorteo/listSorteo.component'),
  },{
    path: '**',
    redirectTo: 'login'
  }
];
