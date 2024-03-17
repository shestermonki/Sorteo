import { Component, OnInit, signal } from '@angular/core';
import NavComponent from '../components/nav/nav.component';
import SideNavComponent, { SideNavList } from '../components/side-nav/side-nav.component';
import { AdminService } from '../../../services/admin.service';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';
import { Users } from '../../../interfaces/admin/response-data-user.interface';
import { Sorteos } from '../../../interfaces/admin/response-sorteos.interface';

//declare var iziToast;
declare var jQuery: any;
declare var $: any;

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [
    NavComponent,
    SideNavComponent,
    CommonModule,
    RouterLink
  ],
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.css'
})
export default class DashboardComponent implements OnInit {

  public usuarios = signal<Users[]>([]);
  public sorteos = signal<Sorteos[]>([]);

  public page = 1;
  public pageSize = 20;
  public token;
  public load_data = true;

  constructor(
    private _adminService: AdminService) {
    this.token = this._adminService.getToken();
  }

  ngOnInit(): void {
    this.init_Data();
  }

  init_Data() {
    this.getListSorteos();
    this.getListUsers();
  }

  getListSorteos(){
    this._adminService.listar_sorteos_admin().subscribe({
      next: (sorteos) => {
        this.sorteos.set( sorteos );
        this.load_data = false;
      },
      error: (error) => {
        console.log(error);
      }
    });
  }

  getListUsers(){
    this._adminService.listar_usuarios_admin(this.token).subscribe({
      next: users => {
        this.usuarios.set( users );
        this.load_data = false;
      },
      error: (error) => {
        console.log(error);
      }
    });
  }

  eliminar(id: string) {
    this._adminService.eliminar_usuario_admin(id, this.token).subscribe(
      response => {

        $('#delete-' + id).modal('hide');
        $('.modal-backdrop').removeClass('show');

        this.init_Data();

      },
      error => {
        console.log(error);
      }
    )
  }

}
