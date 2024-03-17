import { Routes } from '@angular/router';
import { AdminGuard } from './guards/admin.guard';
import EditUsuarioComponent from './pages/admin/edit-usuario/edit-usuario.component';
import GaleriaProductoComponent from './pages/admin/galeria-sorteo/galeria-sorteo.component';
import NewSorteoAdminComponent from './pages/admin/new-edit-sorteo-admin/new-sorteo-admin.component';

import NewEditAdminComponent from './pages/admin/new-edit-admin/new-edit-admin.component';

import { userGuard } from './guards/user.guard';


export const routes: Routes = [
  {
    path: 'login',
    loadComponent: () => import('./layouts/login-admin/login-admin.component'),
  },
  {
    path: 'admin',
    loadComponent: () => import('./layouts/layoutAdmin/layoutAdmin.component'),
    children: [
      {
        path: 'dashboard', canActivate: [AdminGuard],
        loadComponent: () => import('./pages/admin/dashboard/dashboard.component'),
      }, {
        path: 'panel', children: [
          { path: 'usuarios/:id', component: EditUsuarioComponent, canActivate: [AdminGuard] },
          { path: 'sorteos/galeria/:id', component: GaleriaProductoComponent, canActivate: [AdminGuard] },
          { path: 'newsorteo', component: NewSorteoAdminComponent, canActivate: [AdminGuard] },
          { path: 'editsorteo/:id', component: NewSorteoAdminComponent, canActivate: [AdminGuard] },
          { path: 'newadmin', component: NewEditAdminComponent, canActivate: [AdminGuard] },
          { path: 'editadmin/:id', component: NewEditAdminComponent, canActivate: [AdminGuard] },
          { path: '', redirectTo: 'newsorteo', pathMatch: 'full' }
        ]
      },
      { path: '**', redirectTo: 'dashboard', pathMatch: 'full' }
    ]
  }, {
    path: 'login-usuario',
    loadComponent: () => import('./layouts/login-usuario/login-usuario.component'),
  }, {
    path: 'panel-user',
    canActivate: [userGuard],
    loadComponent: () => import('./layouts/layoutUser/layoutUser.component'),
    children: [
      {
        path: 'list-sorteos',
        loadComponent: () => import('./pages/user/sorteo/listSorteo.component'),
      }, {
        path: 'detail-sorteo/:id',
        loadComponent: () => import('./pages/user/detailSorteo/detailSorteo.component'),
      }, {
        path: '',
        redirectTo: 'list-sorteos',
        pathMatch: 'full'
      }, {
        path: '**',
        redirectTo: 'list-sorteos',
      }
    ],

  }, {
    path: 'redirect/:token',
    loadComponent: () => import('./pages/user/redirect/redirect.component'),
  }

];
