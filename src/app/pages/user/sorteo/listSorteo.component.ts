import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component, OnInit, inject, signal } from '@angular/core';
import { DiscordService } from '../../../services/discord-api/dc.service';
import { RegisterUserInSorteo, SorteosService } from '../../../services/sorteos.service';
import { ResponseListSorteos } from '../../../interfaces';
import { ResponseDateUser } from '../../../interfaces/user/response-user.interface';

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

  public participa = signal( false );
  public showMessageInfo = signal( false );
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

  participarSorteo( sorteoId: string ){
    this.sorteosService.registerUserInSorteo(sorteoId)
      .subscribe( data =>{
        if (!data) return;

        this.responseRegister.update( ()=> data );
    });
  }

  async showListSorteos(){
    this.sorteosService.getListSorteosUser().subscribe( listSorteos =>{

      this.listSorteos.update( ()=> listSorteos);
      this.pageLoading.set( false );

    });
  }

  getDataUser(){
    this.discordService.getDataUser().subscribe( (user)=>{
      this.user.update( ()=> user );
      console.log(this.user());

      if (this.user()?.avatar) {
        const { id, avatar } = this.user()!;
        this.srcAvatar.update( value => value + `${id}/${avatar}`);
      }else{
        // Añadir una img default si no tiene avatar
      }
    });
  }



}
