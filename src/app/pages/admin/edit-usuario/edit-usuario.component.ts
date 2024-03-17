import { Component, OnInit } from '@angular/core';
import SideNavComponent from '../components/side-nav/side-nav.component';
import { FormsModule } from '@angular/forms';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { AdminService } from '../../../services/admin.service';
import { NgFor, NgIf } from '@angular/common';

@Component({
  selector: 'app-edit-usuario',
  standalone: true,
  imports: [SideNavComponent, FormsModule, NgIf, NgFor, RouterLink],
  templateUrl: './edit-usuario.component.html',
  styleUrl: './edit-usuario.component.css'
})
export default class EditUsuarioComponent implements OnInit {
  public usuario: any = {};
  public id: string | undefined;
  public token;
  public load_btn = false;
  public load_data = true;

  constructor(
    private _route: ActivatedRoute,
    private _adminService: AdminService,
    private _router: Router
  ) {
    this.token = this._adminService.getToken();
  }

  ngOnInit(): void {
    this._route.params.subscribe(
      params => {
        this.id = params['id'];

        if (this.id !== undefined) {
          this._adminService.obtener_usuario_admin(this.id, this.token).subscribe(
            response => {
              console.log(response);
              if (response.data == undefined) {
                this.usuario = undefined;
                this.load_data = false;
              } else {
                this.usuario = response.data;
                this.load_data = false;
              }
            },
            error => {

            }
          );
        }
      }
    )
  }


  actualizar(updateForm: { valid: any; }) {
    if (updateForm.valid) {
      this.load_btn = true;
      if (this.id !== undefined) {
        this._adminService.actualizar_usuario_admin(this.id, this.usuario, this.token).subscribe(
          response => {
            this.load_btn = false;
            this._router.navigate(['/panel/dashboard']);
          }, error => {
            console.log(error);

          }
        );
      }
    } else {

    }
  }


}
