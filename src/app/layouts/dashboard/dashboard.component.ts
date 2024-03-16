import { Component, OnInit } from '@angular/core';
import NavComponent from '../nav/nav.component';
import SideNavComponent from '../side-nav/side-nav.component';
import { AdminService } from '../../services/admin.service';
import { CommonModule, NgFor, NgIf } from '@angular/common';
import { RouterLink } from '@angular/router';
import { io, Socket } from "socket.io-client";

//declare var iziToast;
declare var jQuery: any;
declare var $: any;

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [NavComponent, SideNavComponent, CommonModule, RouterLink],
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.css'
})
export default class DashboardComponent implements OnInit {
  public usuarios: Array<any> = [];

  public page = 1;
  public pageSize = 20;
  public token;
  public load_data = true;
  public socket: Socket;

  constructor(
    private _adminService: AdminService) {
    this.token = this._adminService.getToken();
    this.socket = io('http://localhost:3000');

    // Escuchar el evento 'user-list' emitido por el servidor
    this.socket.on('user-list', (data: any[]) => {
      // Actualizar la lista de usuarios cuando se recibe el evento
      this.usuarios = data;
    });

  }

  ngOnInit(): void {
    this.init_Data();
  }

  init_Data() {
    this._adminService.listar_usuarios_admin(this.token).subscribe(
      response => {

        this.usuarios = response.data;
        this.load_data = false;

        /* setTimeout(()=>{

        },3000) */
      },
      error => {
        console.log(error);

      }
    );
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
