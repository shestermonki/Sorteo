import { Component, OnInit } from '@angular/core';
import { AdminService } from '../../services/admin.service';
import { Router, RouterLink } from '@angular/router';
import NavComponent from '../../components/nav/nav.component';
import { FormsModule } from '@angular/forms';
import { NgFor, NgIf } from '@angular/common';

@Component({
  selector: 'app-new-sorteo-admin',
  standalone: true,
  imports: [NavComponent, FormsModule, NgIf, NgFor, RouterLink],
  templateUrl: './new-sorteo-admin.component.html',
  styleUrl: './new-sorteo-admin.component.css'
})
export default class NewSorteoAdminComponent implements OnInit {

  public sorteo: any = {};
  public token: any;
  public load_btn = false;

  constructor(
    private _adminService: AdminService,
    private _router: Router
  ) {
    this.token = this._adminService.getToken();
  }

  ngOnInit(): void {
  }

  registro(registroForm: { valid: any; }) {
    if (registroForm.valid) {
      console.log(this.sorteo);
      this.load_btn = true;
      this._adminService.createsorteo(this.sorteo, this.token).subscribe(
        response => {
          console.log(response);
          this.sorteo = {
            name: '',
            description: '',
            prize: '',
            startDate: '',
            endDate: '',
          }

          this.load_btn = false;

          this._router.navigate(['/panel/clientes']);
        },
        error => {
          console.log(error);
        }
      );
    } else {

    }
  }

}
