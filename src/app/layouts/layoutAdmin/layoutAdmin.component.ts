import { ChangeDetectionStrategy, Component } from '@angular/core';
import { RouterModule } from '@angular/router';
import SideNavComponent from '../../pages/admin/components/side-nav/side-nav.component';

@Component({
  selector: 'app-layout-admin',
  standalone: true,
  imports: [
    SideNavComponent,
    RouterModule,
  ],
  template: `
  <app-side-nav></app-side-nav>

  <router-outlet />
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export default class LayoutAdminComponent { }
