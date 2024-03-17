import Cookies from 'js-cookie';

export class TokenDc {

  getToken() {
    return Cookies.get('discordToken');
  }

  setToken( token: string ){
    Cookies.set('discordToken', token);
  }

}
