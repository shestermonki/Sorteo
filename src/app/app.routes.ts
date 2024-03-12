import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: 'login',
    loadComponent: ()=> import('./layouts/login-admin/login-admin.component'),
  },{
    path: '**',
    redirectTo: 'login'
  }
];
