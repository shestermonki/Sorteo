import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component, OnInit, inject, signal } from '@angular/core';
import { DiscordService } from '../../../services/discord-api/dc.service';
import { ResponseRegisterUser, SorteosService, TypeStatus } from '../../../services/sorteos.service';
import { ResponseListSorteos } from '../../../interfaces';
import { ResponseDateUser } from '../../../interfaces/user/response-user.interface';
import { SpinnerComponent } from '../../../components/spinner/spinner.component';

interface LoadingButton {
  message      : string;
  classLoading : string;
  disabled     : boolean;
}

@Component({
  selector: 'app-list-sorteo',
  standalone: true,
  imports: [
    CommonModule,
    SpinnerComponent,
  ],
  templateUrl: './listSorteo.component.html',
  styleUrl: './listSorteo.component.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export default class SorteoComponent implements OnInit {
  
  public participa = signal( false );
  public showMessageInfo = signal( false );
  public urlInvitacion = 'https://discord.com/invite/pBjEVYTC7t';

  public toggleToast = signal( true );
  public listSorteos = signal<ResponseListSorteos[]>([]);
  public responseRegister = signal<ResponseRegisterUser | null>(null);
  public user = signal<ResponseDateUser | null>(null);
  public srcAvatar = signal<string>('https://cdn.discordapp.com/avatars/');

  public loadingButton = signal<LoadingButton>({
    message   : 'Participar',
    disabled  : false,
    classLoading : ''
  });

  public pageLoading = signal(false);

  private sorteosService = inject( SorteosService );
  private discordService = inject( DiscordService );

  ngOnInit(): void {
    this.getDataUser();
    this.showListSorteos();
  }
  
  participarSorteo( sorteoId: string ){
    this.loadingButton().classLoading = 'spinner-grow';
    this.loadingButton().message = 'Registrando...';
    this.sorteosService.registerUserInSorteo(sorteoId)
    .subscribe( data =>{
      if (!data) return;
      
      this.responseRegister.update( ()=> data );
      this.loadingButton.set({ classLoading: '', message: 'Participar', disabled: true});
      setTimeout(() => {
        this.toggleToast.set( false );
      }, 5000);
    });
  }

  showListSorteos(){
    this.sorteosService.getListSorteosUser().subscribe( listSorteos =>{
      this.listSorteos.update( ()=> listSorteos);
      this.pageLoading.set( false );
    });
  }

  getDataUser(){
    this.pageLoading.set( true );
    this.discordService.getDataUser().subscribe( (user)=>{
      this.user.update( ()=> user );
      
      if (this.user()?.avatar) {
        const { id, avatar } = this.user()!;
        this.srcAvatar.update( value => value + `${id}/${avatar}`);
      }else{
        // Añadir una img default si no tiene avatar
      }
    });
  }

}
