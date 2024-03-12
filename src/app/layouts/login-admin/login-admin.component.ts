import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AdminService } from '../../services/admin.service';

@Component({
  selector: 'app-registro',
  standalone: true,
  imports: [],
  templateUrl: './login-admin.component.html',
  styleUrl: './login-admin.component.css'
})
export default class LoginAdminComponent implements OnInit {
  public user : any = {};
  public usuario : any = {};
  public token : any = '';


  constructor(
    private _adminService:AdminService,
    private _router: Router
  ) {
    this.token = this._adminService.getToken();
  }


  ngOnInit(): void {


    if(this.token){
      this._router.navigate(['/']);
    }else{
      //MANTENER EN EL COMPONENTE
    }

  }
}
