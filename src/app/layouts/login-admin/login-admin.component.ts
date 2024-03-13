import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AdminService } from '../../services/admin.service';
import { FormGroup, FormControl } from '@angular/forms';
import { NgForm } from '@angular/forms';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

declare var jQuery: any;
declare var $: any;
declare var iziToast: { show: (arg0: { title: string; titleColor: string; color: string; class: string; position: string; message: any; }) => void; };

@Component({
  selector: 'app-registro',
  standalone: true,
  imports: [ReactiveFormsModule,FormsModule],
  templateUrl: './login-admin.component.html',
  styleUrl: './login-admin.component.css'
})
export default class LoginAdminComponent implements OnInit {
  public user: any = {};
  public usuario: any = {};
  public token: any = '';


  constructor(
    private _adminService: AdminService,
    private _router: Router
  ) {
    this.token = this._adminService.getToken();
  }


  ngOnInit(): void {


    if (this.token) {
      this._router.navigate(['/']);
    } else {
      //MANTENER EN EL COMPONENTE
    }
  }

  login(loginForm: { valid: any; }){
    if(loginForm.valid){
      console.log(this.user);

      let data = {
        email: this.user.email,
        password: this.user.password
      }

      this._adminService.login_admin(data).subscribe(
        response=>{
          if(response.data == undefined){

          }else{
            this.usuario = response.data;
            localStorage.setItem('token',response.token);
            localStorage.setItem('_id',response.data._id);

            this._router.navigate(['/sorteo']);

          }

        },
        error=>{
          console.log(error);

        }
      );
    }else{
      iziToast.show({
          title: 'ERROR',
          titleColor: '#FF0000',
          color: '#FFF',
          class: 'text-danger',
          position: 'topRight',
          message: 'Los datos del formulario no son validos'
      });
    }
  }
}
