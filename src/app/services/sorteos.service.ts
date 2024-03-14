import { Injectable, inject } from '@angular/core';
import { ApiService } from './api.service';
import { Observable, of } from 'rxjs';
import { ResponseListSorteos } from '../interfaces';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environments } from '../../../environments';
import { TokenDc } from './discord-api/token-dc';

export enum TypeStatus {
  'NOTSERVER' = 'NOTSERVER',
  'NOTSORTEO' = 'NOTSORTEO',
  'ISIN' = 'ISIN',
  'OK' = 'OK'
}

export interface ResponseRegisterUser {
  status: TypeStatus;
  message: string;
}

@Injectable({
  providedIn: 'root'
})
export class SorteosService {

  headers = {
    'Content-Type': 'application/json',
    Accept: 'application/json',
  };

  private baseUrl: string = environments.baseUrl;
  private path = '/sorteos';
  private http = inject( HttpClient );
  private tokenDc = new TokenDc();

  constructor() { }

  getListSorteosUser(): Observable<ResponseListSorteos[]>{
    const token = this.tokenDc.getToken();
    
    const headers = new HttpHeaders({ 'authorization': `Bearer ${token}` });
    return this.http.get<ResponseListSorteos[]>( `${this.baseUrl}${this.path}`, { headers } );
  }

  registerUserInSorteo( sorteoId: string ): Observable<ResponseRegisterUser | undefined>{
    const token = this.tokenDc.getToken();

    if (!token) return of(undefined);

    return this.http.post<ResponseRegisterUser>
      ( `${this.baseUrl}${this.path}/register-user`, { sorteoId }, { headers: { 'authorization': `Bearer ${token}` }});
  }

}
