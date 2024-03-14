
export class TokenDc {
  
  getToken() {
    return localStorage.getItem('token');
  }
  
  setToken( token: string ){
    localStorage.setItem('token', token);
  }

}