import { Routes } from '@angular/router';
import { AdminGuard } from './guards/admin.guard';
import EditUsuarioComponent from './layouts/edit-usuario/edit-usuario.component';

export const routes: Routes = [
  {
    path: 'panel', children: [
      { path: 'usuarios/:id', component: EditUsuarioComponent, canActivate: [AdminGuard] },
    ]
  },
  {
    path: 'login',
    loadComponent: () => import('./layouts/login-admin/login-admin.component'),
  },
  {
    path: 'dashboard', canActivate: [AdminGuard],
    loadComponent: () => import('./layouts/dashboard/dashboard.component'),
  },
  {
    path: 'login-usuario',
    loadComponent: () => import('./layouts/login-usuario/login-usuario.component'),
  }, {
    path: 'sorteo',
    loadComponent: () => import('./pages/user/sorteo/listSorteo.component'),
  }, {
    path: '**',
    redirectTo: 'login'
  }

];
