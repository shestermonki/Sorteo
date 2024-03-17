import Cookies from 'js-cookie';


export class TokenDc {

  getToken() {
    return localStorage.getItem( 'token' );
  }
  
  setToken( discordToken: string ){
    localStorage.setItem( 'token', discordToken );
  }

}
