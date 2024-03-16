import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component, OnInit, inject, signal } from '@angular/core';
import { DiscordService } from '../../../services/discord-api/dc.service';
import { ResponseRegisterUser, SorteosService, TypeStatus } from '../../../services/sorteos.service';
import { ResponseListSorteos } from '../../../interfaces';
import { ResponseDateUser } from '../../../interfaces/user/response-user.interface';
import { v4 as uuidv4 } from 'uuid';

@Component({
  selector: 'app-list-sorteo',
  standalone: true,
  imports: [
    CommonModule,
  ],
  templateUrl: './listSorteo.component.html',
  styleUrl: './listSorteo.component.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export default class SorteoComponent implements OnInit {



  public participa = signal( false );
  public showMessageInfo = signal( false );
  public urlInvitacion = 'https://discord.com/invite/pBjEVYTC7t';

  public listSorteos = signal<ResponseListSorteos[]>([]);
  public responseRegister = signal<ResponseRegisterUser | null>(null);
  public user = signal<ResponseDateUser | null>(null);
  public srcAvatar = signal<string>('https://cdn.discordapp.com/avatars/');

  private sorteosService = inject( SorteosService );
  private discordService = inject( DiscordService );

  ngOnInit(): void {
    this.getDataUser();
    this.showListSorteos();
  }


  participarSorteo( sorteoId: string ){
    this.sorteosService.registerUserInSorteo(sorteoId)
      .subscribe( data =>{
        if (!data) return;

        this.responseRegister.update( ()=> data );
    });
  }

  showListSorteos(){
    this.sorteosService.getListSorteosUser().subscribe( listSorteos =>{
      this.listSorteos.update( ()=> listSorteos);
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
