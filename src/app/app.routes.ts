import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: 'dashboard',
    loadComponent: ()=> import('./layouts/dashboard/dashboard/dashboard.component'),
  },{
    path: '**',
    redirectTo: 'dashboard'
  }
];
