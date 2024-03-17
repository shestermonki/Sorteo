import { Injectable, inject } from '@angular/core';
import { environments } from '../../../../environments';
import { Observable, lastValueFrom, } from 'rxjs';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { ResponseDataUser } from '../../interfaces/user/response-user.interface';
import { CookieService } from 'ngx-cookie-service';

@Injectable({ providedIn: 'root' })
export class DiscordService {

  private baseUrl = environments.baseUrl;
  private dcUrl    = environments.dcUrl;
  
  private http = inject(HttpClient);
  private cookieService = inject( CookieService );

  constructor() { }

  verificarAutenticacion(): boolean {
    const token = this.getToken();
    return !!token;
  }

  getUrlAuthDiscord() {
    return `${this.baseUrl}/login-usuario`;
  }

  getDataUser(): Observable<ResponseDataUser>{
    const token = this.getToken();
    const headers = new HttpHeaders({ 'authorization': `Bearer ${token}`});
    return this.http.get<ResponseDataUser>(`${this.dcUrl}/api/v10/users/@me`, {headers});
  }

  public async isAuthenticated(): Promise<boolean> {
    const token = this.getToken();
    console.log(token);
    
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


  getToken() {
    const token = this.cookieService.get('discord_token');
    return token;
  }
  
  setToken( discordToken: string ){
    this.cookieService.set('discordToken', discordToken);
  }

}
