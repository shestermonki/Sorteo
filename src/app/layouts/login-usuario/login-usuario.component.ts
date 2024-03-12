import { Component } from '@angular/core';

@Component({
  selector: 'app-login-usuario',
  standalone: true,
  imports: [],
  templateUrl: './login-usuario.component.html',
  styleUrl: './login-usuario.component.css'
})
export default class LoginUsuarioComponent {

  
  redirect(){
    window.location.href = 'https://discord.com/oauth2/authorize?client_id=1216790330196627477&response_type=code&redirect_uri=http%3A%2F%2Flocalhost%3A3000%2Fapi%2Fdiscord%2Fauthorize&scope=identify';
  }
}
