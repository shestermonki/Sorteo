import { Injectable, inject } from '@angular/core';
import { environments } from '../../../../environments';
import { Observable, lastValueFrom, } from 'rxjs';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { ResponseDataUser } from '../../interfaces/user/response-user.interface';
import { CookieService } from 'ngx-cookie-service';
import { TokenDc } from './token-dc';

@Injectable({ providedIn: 'root' })
export class DiscordService {

  private scope = 'identify+email+guilds';

  private baseUrl = environments.baseUrl;
  private dcUrl    = environments.dcUrl;
  private clientID = environments.clientId;
  private redirectURI = `${this.baseUrl}/discord/authorize`;
  
  private http = inject(HttpClient);
  private cookieService = inject( CookieService );
  private dcToken = new TokenDc();

  constructor() { }

  verificarAutenticacion(): boolean {
    const token = this.dcToken.getToken();
    return !!token;
  }

  getUrlAuthDiscord() {
    return `${this.dcUrl}/oauth2/authorize?client_id=${this.clientID}&response_type=code&redirect_uri=${this.redirectURI}&scope=${this.scope}`;
  }

  getDataUser(): Observable<ResponseDataUser>{
    const token = this.dcToken.getToken();
    const headers = new HttpHeaders({ 'authorization': `Bearer ${token}`});
    return this.http.get<ResponseDataUser>(`${this.dcUrl}/api/v10/users/@me`, {headers});
  }

  public async isAuthenticated(): Promise<boolean> {
    const token = this.dcToken.getToken();
    
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
