import { inject } from '@angular/core';
import { Router, type CanActivateFn } from '@angular/router';
import { DiscordService } from '../services/discord-api/dc.service';


export const userGuard: CanActivateFn = async (route, state) => {

  const _router = inject( Router );
  const _discordService = inject( DiscordService );
  
  const isAuthenticated = await  _discordService.isAuthenticated();

  if (isAuthenticated) {
    return true;
  }else{
    _router.navigateByUrl('/login-usuario');
    return false;
  }
};
