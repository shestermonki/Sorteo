import { CommonModule, NgFor, NgIf } from '@angular/common';
import { Component, Input, OnInit, signal } from '@angular/core';
import { Router, RouterModule } from '@angular/router';
import { AdminService } from '../../../../services/admin.service';
import { GLOBAL } from '../../../../services/GLOBAL';

export interface SideNavList {
  name: string;
  link: string;
}

@Component({
  selector: 'app-side-nav',
  standalone: true,
  imports: [
    CommonModule,
    RouterModule,
    NgIf, NgFor
  ],
  templateUrl: './side-nav.component.html',
  styleUrl: './side-nav.component.css'
})
export default class SideNavComponent implements OnInit {

  public navLinks: SideNavList[] = [
    { name: 'Crear Sorteos', link: '/admin/panel/newsorteo' },
    { name: 'Crear Admin', link: '/admin/panel/newadmin' },
  ]
  public token;
  public id;
  public user: any = undefined;
  public user_lc = signal<any>({});
  public url;

  constructor(private _adminService: AdminService,
    private _router: Router,) {
    this.token = localStorage.getItem('token');
    this.id = localStorage.getItem('_id');
    this.url = GLOBAL.url;

    if (this.token) {
      this._adminService.obtener_admin(this.id, this.token).subscribe(
        (response: any) => { // Asegúrate de que response tenga el tipo adecuado
          console.log('Respuesta del servidor:', response);
          if (response && response.data) { // Verifica si la respuesta contiene los datos esperados
            this.user = response.data;
            localStorage.setItem('user_data', JSON.stringify(this.user));
            console.log('Datos guardados en el almacenamiento local:', this.user);
            this.user_lc.set(this.user); // Asigna los datos al usuario localmente
            console.log('Datos recuperados del almacenamiento local:', this.user_lc());
          } else {
            console.error('Error: La respuesta del servidor no contiene los datos esperados.');
          }
        },
        error => {
          this.user = undefined;
          console.error('Error al obtener usuario:', error);
        }
      );
    }
  }

  logout() {
    window.location.reload();
    localStorage.clear();
    this._router.navigate(['/login']);
  }




  ngOnInit(): void { }
}
