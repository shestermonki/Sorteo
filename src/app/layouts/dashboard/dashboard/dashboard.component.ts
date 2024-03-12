import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { ApiService } from '../../../services/api.service';
import { HttpClientModule } from '@angular/common/http';
import { Router, RouterModule } from '@angular/router';

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [
    CommonModule,
    HttpClientModule,
    RouterModule
  ],
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export default class DashboardComponent {

  private authService = inject( ApiService );
  private router = inject( Router );

  constructor(){
    const baseUrl = 'https://discord.com/oauth2/authorize';
    const redirectUri = 'http://localhost:3001/authorize-acount/login';
    const params = `?client_id=1216790330196627477&response_type=code&redirect_uri=${redirectUri}&scope=identify`;
    const urlRedirectAuthDc = `${baseUrl}${params}`;
    console.log(urlRedirectAuthDc);
  }

  redirect(){
    window.location.href = 'https://discord.com/oauth2/authorize?client_id=1216790330196627477&response_type=code&redirect_uri=http%3A%2F%2Flocalhost%3A3000%2Fapi%2Fdiscord%2Fauthorize&scope=identify';
  }

}
