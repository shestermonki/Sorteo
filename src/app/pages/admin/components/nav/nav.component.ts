import { Component, OnInit } from '@angular/core';
import { Router, RouterLink } from '@angular/router';
import { GLOBAL } from '../../../../services/GLOBAL';
import { NgFor, NgIf } from '@angular/common';
import { UsuarioService } from '../../../../services/usuario.service';

@Component({
  selector: 'app-nav',
  standalone: true,
  imports: [RouterLink, NgIf, NgFor],
  templateUrl: './nav.component.html',
  styleUrl: './nav.component.css'
})
export default class NavComponent implements OnInit {

  public token;
  public id;
  public user: any = undefined;
  public user_lc: any = undefined;

  public url;
  constructor(private _usuarioService: UsuarioService,
    private _router: Router) {
    this.token = localStorage.getItem('token');
    this.id = localStorage.getItem('_id');
    this.url = GLOBAL.url;

    if (this.token) {
      this._usuarioService.obtener_usuario_guest({ id: this.id, token: this.token }).subscribe(
        (response: any) => { // Asegúrate de que response tenga el tipo adecuado
          console.log('Respuesta del servidor:', response);
          if (response && response.data) { // Verifica si la respuesta contiene los datos esperados
            this.user = response.data;
            localStorage.setItem('user_data', JSON.stringify(this.user));
            console.log('Datos guardados en el almacenamiento local:', this.user);
            this.user_lc = this.user; // Asigna los datos al usuario localmente
            console.log('Datos recuperados del almacenamiento local:', this.user_lc);
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

  ngOnInit(): void {
  }


  logout() {
    window.location.reload();
    localStorage.clear();
    this._router.navigate(['/']);
  }
}
