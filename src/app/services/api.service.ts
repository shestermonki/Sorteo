import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { environments } from '../../../environments';
import { Observable } from 'rxjs';

@Injectable({providedIn: 'root'})
export class ApiService {

  headers = {
    'Content-Type': 'application/json',
    Accept: 'application/json',
    'authorization': 'Bearer KBRhWQWuA0ZS6YhkWTZNrcH1i7TylJ'
  };

  private baseUrl: string = environments.baseUrl;

  private http = inject( HttpClient );

  get(path: string, params: HttpParams = new HttpParams()): Observable<any> {
    return this.http.get(`${this.baseUrl}${path}`, { headers: this.headers, params });
  }

  put(path: string, body: object = {}): Observable<any> {
    return this.http.put(`${this.baseUrl}${path}`, JSON.stringify(body), {headers: this.headers });
  }

  post(path: string, body: object = {}): Observable<any> {
    console.log(JSON.stringify(body));
    return this.http.post(`${this.baseUrl}${path}`, JSON.stringify(body),
       {headers: this.headers}
    );
  }

  delete(path: string): Observable<any> {
    return this.http.delete(`${this.baseUrl}${path}`, {headers: this.headers } );
  }

}