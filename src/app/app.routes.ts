import { Routes } from '@angular/router';
import { AdminGuard } from './guards/admin.guard';
import EditUsuarioComponent from './layouts/edit-usuario/edit-usuario.component';
import GaleriaProductoComponent from './pages/galeria-sorteo/galeria-sorteo.component';
import NewSorteoAdminComponent from '../app/layouts/new-sorteo-admin/new-sorteo-admin.component';

export const routes: Routes = [
  {
    path: 'panel', children: [
      { path: 'usuarios/:id', component: EditUsuarioComponent, canActivate: [AdminGuard] },
      { path: 'sorteos/galeria/:id', component: GaleriaProductoComponent, canActivate: [AdminGuard] },
      {path: 'newsorteo', component: NewSorteoAdminComponent, canActivate: [AdminGuard]},
    ]
  },
  {
    path: 'login',
    loadComponent: () => import('./layouts/login-admin/login-admin.component'),
  },{
    path: 'dashboard', canActivate: [AdminGuard],
    loadComponent: () => import('./layouts/dashboard/dashboard.component'),
  },{
    path: 'login-usuario',
    loadComponent: () => import('./layouts/login-usuario/login-usuario.component'),
  }, {
    path: 'panel-user',
    loadComponent: () => import('./layouts/layoutUser/layoutUser.component'),
    children: [
      {
        path: 'list-sorteos',
        loadComponent: ()=> import('./pages/user/sorteo/listSorteo.component'),
      },{
        path: 'detail-sorteo/:id',
        loadComponent: ()=> import('./pages/user/detailSorteo/detailSorteo.component'),
      },{
        path: '',
        redirectTo: 'list-sorteos',
        pathMatch: 'full'
      },{
        path: '**',
        redirectTo: 'list-sorteos',
      }
    ],

  }, {
    path: 'redirect/:token',
    loadComponent: () => import('./pages/user/redirect/redirect.component'),
  }, {
    path: '**',
    redirectTo: 'login-usuario'
  }

];
