import { Injectable, inject } from '@angular/core';
import { environments } from '../../../../environments';
import { ApiService } from '../api.service';
import { Observable, catchError, lastValueFrom, map, of, tap } from 'rxjs';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { JwtHelperService } from '@auth0/angular-jwt';
import { TokenDc } from './token-dc';
import { ResponseDataUser } from '../../interfaces/user/response-user.interface';

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

  getDataUser(): Observable<ResponseDataUser>{
    const token = this.tokenDc.getToken();
    const headers = new HttpHeaders({ 'authorization': `Bearer ${token}`});
    return this.http.get<ResponseDataUser>(`${this.dcUrl}/api/v10/users/@me`, {headers});
  }

  public async isAuthenticated(): Promise<boolean> {
    const token = this.tokenDc.getToken();

    if (!token) {
      return false;
    }

    try {
      
      const user$ = this.getDataUser();
      const dataUser = await lastValueFrom( user$ );

      return dataUser ? true : false;
    } catch (error) {
      return false;
    }
  }

}
