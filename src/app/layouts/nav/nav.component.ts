import { Component, OnInit } from '@angular/core';
import { Router, RouterLink } from '@angular/router';
import { GLOBAL } from '../../services/GLOBAL';
import { NgFor, NgIf } from '@angular/common';
import { AdminService } from '../../services/admin.service';

@Component({
  selector: 'app-nav',
  standalone: true,
  imports: [RouterLink,NgIf,NgFor],
  templateUrl: './nav.component.html',
  styleUrl: './nav.component.css'
})
export default class NavComponent implements OnInit {

  public token: any;
  public id;
  public user: any = undefined;
  public user_lc: any = undefined;

  public url: any;
  constructor(private _adminService: AdminService,
    private _router: Router,) {
    this.token = localStorage.getItem('token');
    this.id = localStorage.getItem('_id');
    this.url = GLOBAL.url;

    if (this.token) {
      this._adminService.obtener_usuario_guest(this.id, this.token).subscribe(
        response => {
          this.user = response.data;
          localStorage.setItem('user_data', JSON.stringify(this.user));
          if (localStorage.getItem('user_data')) {
            this.user_lc = JSON.parse(localStorage.getItem('user_data' ));
          } else {
            this.user_lc = undefined;
          }
        },
        error => {
          this.user = undefined;
        }
      );
    }

  }

  ngOnInit(): void {
  }


  logout() {
    window.location.reload();
    localStorage.clear();
    this._router.navigate(['/']);
  }
}
