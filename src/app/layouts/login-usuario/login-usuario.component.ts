import { Component, OnInit, inject } from '@angular/core';
import { DiscordService } from '../../services/discord-api/dc.service';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { TokenDc } from '../../services/discord-api/token-dc';


@Component({
  selector: 'app-login-usuario',
  standalone: true,
  imports: [
    CommonModule,
  ],
  templateUrl: './login-usuario.component.html',
  styleUrl: './login-usuario.component.css'
})
export default class LoginUsuarioComponent implements OnInit {
  
  constructor(private discordService: DiscordService, private router: Router) { }

  ngOnInit(): void { }

  loginByDiscord() {
    if (!this.discordService.verificarAutenticacion()) {
      window.location.href = this.discordService.getUrlAuthDiscord();
    } else {
      this.router.navigateByUrl('/panel-user');
    }
  }

  traerCookie(){
    console.log(this.discordService.getToken());
    
  }

}
