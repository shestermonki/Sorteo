import { Component } from '@angular/core';
import NavComponent from '../nav/nav.component';
import SideNavComponent from '../side-nav/side-nav.component';

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [NavComponent,SideNavComponent],
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.css'
})
export default class DashboardComponent {

}
