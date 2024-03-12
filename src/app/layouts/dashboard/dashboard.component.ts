import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component, OnInit, inject } from '@angular/core';
import { ApiService } from '../../services/api.service';
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
export default class DashboardComponent implements OnInit {

  private authService = inject( ApiService );
  private router = inject( Router );

  constructor(){
    const baseUrl = 'https://discord.com/oauth2/authorize';
  }

  ngOnInit(): void { }

}
