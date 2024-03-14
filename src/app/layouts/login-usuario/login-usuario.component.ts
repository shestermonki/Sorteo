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
    if (this.token) {
      this.router.navigate(['/sorteo']);
    } else {
      //MANTENER EN EL COMPONENTE
    }


  }

  loginByDiscord() {

    // Verificar si el usuario está autenticado antes de redirigirlo a la URL de autenticación de Discord
    if (!this.discordService.verificarAutenticacion()) {
      localStorage.setItem('token', this.token);
      localStorage.setItem('_id', '65f32389eb6750bdd5109304');
      window.location.href = this.discordService.getUrlAuthDiscord();
    } else {
      this.router.navigate(['/sorteo']);
      // El usuario ya está autenticado, podrías redirigirlo a otra página o mostrar un mensaje de error
      // Por ejemplo:
      console.log('El usuario ya está autenticado.');
    }
  }

}
