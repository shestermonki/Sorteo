import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: 'registro',
    loadComponent: ()=> import('./layouts/registro/registro.component'),
  },{
    path: '**',
    redirectTo: 'registro'
  }
];
