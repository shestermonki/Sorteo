import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component, OnInit, inject, signal } from '@angular/core';
import { DiscordService } from '../../../services/discord-api/dc.service';
import { RegisterUserInSorteo, SorteosService } from '../../../services/sorteos.service';
import { ResponseListSorteos } from '../../../interfaces';
import { ResponseDateUser } from '../../../interfaces/user/response-user.interface';
import { SpinnerComponent } from '../../../components/spinner/spinner.component';
import { ToastComponent } from '../../../components/toast/toast.component';
import { HeaderComponent } from '../components/header/header.component';

interface LoadingButton {
  message      : string;
  classLoading : string;
}

@Component({
  selector: 'app-list-sorteo',
  standalone: true,
  imports: [
    CommonModule,
    HeaderComponent,
    SpinnerComponent,
    ToastComponent,
  ],
  templateUrl: './listSorteo.component.html',
  styleUrl: './listSorteo.component.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export default class SorteoComponent implements OnInit {

  public urlInvitacion = 'https://discord.com/invite/pBjEVYTC7t';

  public user = signal<ResponseDateUser | null>(null);

  public listSorteos = signal<ResponseListSorteos[]>([]);
  public respRegisterSorteo = signal<RegisterUserInSorteo | null>(null);

  public toggleToast = signal( false );
  public loadingButton = signal<LoadingButton>({
    message   : 'Participar',
    classLoading : ''
  });
  public pageLoading = signal(false);

  private sorteosService = inject( SorteosService );
  private discordService = inject( DiscordService );

  async ngOnInit(){
    await this.getDataUser();
    await this.showListSorteos();
  }

  async getDataUser(){
    this.pageLoading.set( true );
    this.discordService.getDataUser().subscribe( (user)=>{
      
      this.user.update( ()=> user );
      
    });
  }

  async showListSorteos(){
    this.sorteosService.getListSorteosUser().subscribe( listSorteos =>{
      
      this.listSorteos.update( ()=> listSorteos);
      this.pageLoading.set( false );

    });
  }

  participarSorteo( sorteoId: string ){
    this.loadingButton.set({
      classLoading: 'spinner-grow',
      message: 'Registrando...',
    });
    this.sorteosService.registerUserInSorteo(sorteoId)
    .subscribe( data =>{

      if (!data) return;
      this.respRegisterSorteo.update( ()=> data );
      this.toggleToast.set( true );
      
      this.loadingButton.set({
        classLoading: '',
        message: 'Participar',
      });
      
      setTimeout(() => {
        this.toggleToast.set( false );
      }, 5000);
      
    });
  }

}