import { Injectable, inject } from '@angular/core';
import { environments } from '../../../../environments';
import { ApiService } from '../api.service';
import { Observable, tap } from 'rxjs';
import { HttpClient } from '@angular/common/http';

@Injectable({providedIn: 'root'})
export class DiscordService {

  private urlPath = '/discord';
  private scope = 'identify'; // Si quiere añadir mas scopre añadir con un +
  private redirectUri = `${environments.baseUrl}/discord/authorize`;

  private http = inject( HttpClient );

  constructor() { }

  getUrlAuthDiscord(){
    const { dcUrl, clientId } = environments;
    return `${dcUrl}/oauth2/authorize?client_id=${clientId}&response_type=code&redirect_uri=${this.redirectUri}&scope=${this.scope}`;
  }

}