import { Injectable, inject } from '@angular/core';
import { environments } from '../../../../environments';
import { ApiService } from '../api.service';
import { Observable, tap } from 'rxjs';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { JwtHelperService } from '@auth0/angular-jwt';
import { TokenDc } from './token-dc';
import { ResponseDateUser } from '../../interfaces/user/response-user.interface';

@Injectable({ providedIn: 'root' })
export class DiscordService {

  private scope = 'identify+guilds+email'; // Si quiere añadir mas scopre añadir con un +
  private redirectUri = `${environments.baseUrl}/discord/authorize`;
  private usuarioLogueado: boolean = false;

  private dcUrl    = environments.dcUrl;
  private clientId = environments.clientId;

  private tokenDc: TokenDc = new TokenDc();
  
  private http = inject(HttpClient);

  constructor() { }

  verificarAutenticacion(): boolean {
    const token = this.tokenDc.getToken();
    return !!token;
  }

  getUrlAuthDiscord() {
    if (!this.usuarioLogueado) {
      return `${this.dcUrl}/oauth2/authorize?client_id=${this.clientId}&response_type=code&redirect_uri=${this.redirectUri}&scope=${this.scope}`;
    } else {
      return ''; // Otra URL o una cadena vacía, según sea necesario
    }
  }

  getDataUser(): Observable<ResponseDateUser>{
    const token = this.tokenDc.getToken();
    
    const headers = new HttpHeaders({ 'authorization': `Bearer ${token}`});
    return this.http.get<ResponseDateUser>(`${this.dcUrl}/api/v10/users/@me`, {headers});
  }

  public isAuthenticated(allowRoles: string[]): boolean {
    const token = this.tokenDc.getToken();
    if (!token) {
      return false;
    }

    try {
      const helper = new JwtHelperService();
      var decodedToken = helper.decodeToken(token);

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
