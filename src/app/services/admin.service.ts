import { Injectable } from '@angular/core';
import { Observable } from "rxjs";
import { GLOBAL } from "./GLOBAL";
import { HttpClient, HttpHeaders } from "@angular/common/http";
import { JwtHelperService } from "@auth0/angular-jwt";
import { Router } from '@angular/router';
import { Users } from '../interfaces/admin/response-data-user.interface';
import { Sorteos } from '../interfaces/admin/response-sorteos.interface';

@Injectable({
  providedIn: 'root'
})
export class AdminService {
  private isLoggedIn: boolean = false;
  public url;

  constructor(
    private _http: HttpClient, private router: Router,
  ) {
    this.url = GLOBAL.url;
  }


  login_admin(data: any): Observable<any> {
    let headers = new HttpHeaders().set('Content-Type', 'application/json');
    return this._http.post(this.url + 'loginAdmin', data, { headers: headers });
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

  listar_usuarios_admin(token: any): Observable<Users[]> {
    let headers = new HttpHeaders({ 'Content-Type': 'application/json', 'Authorization': token });
    return this._http.get<Users[]>(this.url + 'listarUsuariosAdmin', { headers: headers });
  }

  listar_sorteos_admin(): Observable<any[]> {
    return this._http.get<any[]>(this.url + 'sorteos');
  }

  eliminar_usuario_admin(id: string, token: any): Observable<any> {
    let headers = new HttpHeaders({ 'Content-Type': 'application/json', 'Authorization': token });
    return this._http.delete(this.url + 'eliminar_usuario_admin/' + id, { headers: headers });
  }

  actualizar_usuario_admin(id: string, data: any, token: any): Observable<any> {
    let headers = new HttpHeaders({ 'Content-Type': 'application/json', 'Authorization': token });
    return this._http.put(this.url + 'actualizar_usuario_admin/' + id, data, { headers: headers });
  }

  obtener_usuario_admin(id: string, token: any): Observable<any> {
    let headers = new HttpHeaders({ 'Content-Type': 'application/json', 'Authorization': token });
    return this._http.get(this.url + 'obtener_usuario_admin/' + id, { headers: headers });
  }


  agregar_imagen_galeria_admin(id: string, data: { _id: string | Blob; imagen: string | Blob; }, token: any): Observable<any> {
    let headers = new HttpHeaders({ 'Authorization': token });
    const fd = new FormData();
    fd.append('_id', data._id);
    fd.append('imagen', data.imagen);
    return this._http.put(this.url + 'agregar_imgPortada_admin/' + id, fd, { headers: headers });
  }

  obtener_sorteo_admin(id: string, token: any): Observable<any> {
    let headers = new HttpHeaders({ 'Content-Type': 'application/json', 'Authorization': token });
    return this._http.get(this.url + 'obtener_sorteo_admin/' + id, { headers: headers });
  }

  eliminar_imagen_galeria_admin(id: string, data: any, token: any): Observable<any> {
    let headers = new HttpHeaders({ 'Content-Type': 'application/json', 'Authorization': token });
    return this._http.put(this.url + 'eliminar_imagen_galeria_admin/' + id, data, { headers: headers });
  }

  createsorteo(data: Sorteos, token: string): Observable<any> {
    let headers = new HttpHeaders({ 'Content-Type': 'application/json', 'Authorization': token });
    return this._http.post(this.url + 'createsorteo', data, { headers: headers });
  }


  actualizar_sorteo_admin(id: string, data: any, token: any): Observable<any> {
    let headers = new HttpHeaders({ 'Content-Type': 'application/json', 'Authorization': token });
    return this._http.put(this.url + 'actualizar_sorteo_admin/' + id, data, { headers: headers });
  }

  eliminar_sorteo_admin(id: string, token: any): Observable<any> {
    let headers = new HttpHeaders({ 'Content-Type': 'application/json', 'Authorization': token });
    return this._http.delete(this.url + 'eliminar_sorteo_admin/' + id, { headers: headers });
  }
}
