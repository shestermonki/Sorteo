import { Injectable, inject } from '@angular/core';
import { ApiService } from './api.service';
import { Observable } from 'rxjs';
import { ResponseListSorteos } from '../interfaces';

interface ResponseRegisterUser {
  status: string;
  message: string;
}

@Injectable({
  providedIn: 'root'
})
export class SorteosService {

  private path = '/sorteos';
  private apiService = inject( ApiService );

  constructor() { }

  getListSorteosUser(): Observable<ResponseListSorteos[]>{
    return this.apiService.get( this.path );
  }

  registerUserInSorteo( sorteoId: string ): Observable<ResponseRegisterUser>{
    return this.apiService.post( `${this.path}/register-user`, { sorteoId });
  }

}
