import { Injectable } from '@angular/core';
import { Observable } from "rxjs";
import { GLOBAL } from "./GLOBAL";
import { HttpClient, HttpHeaders } from "@angular/common/http";
import { JwtHelperService } from "@auth0/angular-jwt";

@Injectable({
  providedIn: 'root'
})
export class AdminService {

  public url;

  constructor(
    private _http: HttpClient,
  ) {
    this.url = GLOBAL.url;
  }

  login_admin(data: any):Observable<any>{
    let headers = new HttpHeaders().set('Content-Type','application/json');
    return this._http.post(this.url+'loginAdmin',data,{headers:headers});
  }

  getToken(){
    return localStorage.getItem('token');
  }


  public isAuthenticated(allowRoles : string[]):boolean{

    const token = localStorage.getItem('token');


    if(!token){
      return false;
    }

    try {
      const helper = new JwtHelperService();
      var decodedToken = helper.decodeToken(token);

      console.log(decodedToken);

      if(helper.isTokenExpired(token)){
        localStorage.clear();
        return false;
      }

      if(!decodedToken){
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
