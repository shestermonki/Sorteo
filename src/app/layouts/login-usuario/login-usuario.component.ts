import { Component, OnInit, inject } from '@angular/core';
import { DiscordService } from '../../services/discord-api/dc.service';
import { Router } from '@angular/router';


@Component({
  selector: 'app-login-usuario',
  standalone: true,
  imports: [ ],
  templateUrl: './login-usuario.component.html',
  styleUrl: './login-usuario.component.css'
})
export default class LoginUsuarioComponent implements OnInit {
  token: any;
  constructor(private discordService: DiscordService, private router: Router) { }


  ngOnInit(): void {
    this.loginByDiscord();
  }


  loginByDiscord(){
    window.location.href = this.discordService.getUrlAuthDiscord();
  }

}
