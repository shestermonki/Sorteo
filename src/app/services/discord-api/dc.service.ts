import { Injectable, inject } from '@angular/core';
import { environments } from '../../../../environments';
import { ApiService } from '../api.service';
import { Observable, tap } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { JwtHelperService } from '@auth0/angular-jwt';

@Injectable({ providedIn: 'root' })
export class DiscordService {

  private urlPath = '/discord';
  private scope = 'identify+guilds+email'; // Si quiere añadir mas scopre añadir con un +
  private redirectUri = `${environments.baseUrl}/discord/authorize`;

  private http = inject(HttpClient);

  // Variable de estado para representar si el usuario está autenticado
  private usuarioLogueado: boolean = false;

  constructor() { }

  verificarAutenticacion(): boolean {
    // Lógica para verificar si el usuario está autenticado
    // Por ejemplo, podrías comprobar si existe un token de autenticación en el almacenamiento local
    const token = localStorage.getItem('token');
    return !!token; // Convertir el token a un booleano y devolverlo
  }

  // Método para obtener la URL de autenticación de Discord
  getUrlAuthDiscord() {
    // Verificar si el usuario está autenticado antes de redirigirlo a la URL de autenticación de Discord
    if (!this.usuarioLogueado) {
      const { dcUrl, clientId } = environments;
      return `${dcUrl}/oauth2/authorize?client_id=${clientId}&response_type=code&redirect_uri=${this.redirectUri}&scope=${this.scope}`;
    } else {
      // El usuario ya está autenticado, podrías redirigirlo a otra página o mostrar un mensaje de error
      return ''; // Otra URL o una cadena vacía, según sea necesario
    }
  }

  getToken() {
    return localStorage.getItem('token');
  }

  public isAuthenticated(allowRoles: string[]): boolean {
    const token = localStorage.getItem('token');
    if (!token) {
      return false;
    }

    try {
      const helper = new JwtHelperService();
      var decodedToken = helper.decodeToken(token);

      console.log(decodedToken);

      if (helper.isTokenExpired(token)) {
        localStorage.clear();
        return false;
      }

      if (!decodedToken) {
        console.log('NO ES VALIDO');
        localStorage.removeItem('token');
        return false;
      }
    } catch (error) {
      localStorage.removeItem('token');
      return false;
    }

    return allowRoles.includes(decodedToken['rol']);
  }

}
