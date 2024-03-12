import { HttpClient } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';

@Injectable({providedIn: 'root'})
export class ApiService {

  private baseUrl: string = 'http://localhost:3000/api';

  private http = inject( HttpClient );

  auth(){
    return this.http.get(`${this.baseUrl}/authorize-acount/authorize`);
  }

}