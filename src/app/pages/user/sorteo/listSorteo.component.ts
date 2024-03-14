import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component, OnInit, inject, signal } from '@angular/core';
import { DiscordService } from '../../../services/discord-api/dc.service';
import { ResponseRegisterUser, SorteosService, TypeStatus } from '../../../services/sorteos.service';
import { ResponseListSorteos } from '../../../interfaces';

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

  private sorteosService = inject( SorteosService );
  private discordService = inject( DiscordService );

  ngOnInit(): void {
    this.showListSorteos();
    this.getDataUser();
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

  public user = signal({});

  getDataUser(){
    this.discordService.getDataUser().subscribe( (user)=>{
      this.user.update( ()=> user);
    });
  }

}
