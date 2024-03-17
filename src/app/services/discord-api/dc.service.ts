import { Injectable, inject } from '@angular/core';
import { environments } from '../../../../environments';
import { Observable, lastValueFrom, } from 'rxjs';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { TokenDc } from './token-dc';
import { ResponseDataUser } from '../../interfaces/user/response-user.interface';

@Injectable({ providedIn: 'root' })
export class DiscordService {

  private baseUrl = environments.baseUrl;
  private dcUrl    = environments.dcUrl;

  private tokenDc: TokenDc = new TokenDc();
  
  private http = inject(HttpClient);

  constructor() { }

  verificarAutenticacion(): boolean {
    const token = this.tokenDc.getToken();
    return !!token;
  }

  getUrlAuthDiscord() {
    return `${this.baseUrl}/login-usuario`;
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
