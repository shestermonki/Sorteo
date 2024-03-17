import Cookies from 'js-cookie';


export class TokenDc {
  
  getToken() {
    const token = Cookies.get('discordToken');
    
    return token;
  }
  
  setToken( discordToken: string ){
    Cookies.set('discordToken', discordToken);
  }

}
