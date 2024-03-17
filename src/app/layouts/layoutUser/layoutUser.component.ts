import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component, OnInit, inject, signal } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { DiscordService } from '../../services/discord-api/dc.service';
import { ResponseDataUser } from '../../interfaces/user/response-user.interface';
import { HeaderComponent } from '../../pages/user/components/header/header.component';
import { ToastComponent } from '../../components/toast/toast.component';
import { SpinnerComponent } from '../../components/spinner/spinner.component';

@Component({
  selector: 'app-layout-user',
  standalone: true,
  imports: [
    RouterOutlet,
    HeaderComponent,
    ToastComponent,
    SpinnerComponent,
  ],
  template: `
    <app-header [user]="user()"></app-header>
    <router-outlet />

    <app-spinner [isLoading]="pageLoading()" />
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export default class LayoutUserComponent implements OnInit {
  
  public user = signal<ResponseDataUser | null>(null);
  public pageLoading = signal(false);
  private discordService = inject( DiscordService );
  
  async ngOnInit(){
    await this.getDataUser();
  }

  async getDataUser(){
    this.pageLoading.set( true );
    this.discordService.getDataUser().subscribe( (user)=>{
      console.log(user);
      
      this.user.update( ()=> user );
      this.pageLoading.set( false );
      
    });
  }

}
