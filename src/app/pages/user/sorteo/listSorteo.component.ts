import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component, OnInit, inject, signal } from '@angular/core';
import { DiscordService } from '../../../services/discord-api/dc.service';
import { SorteosService } from '../../../services/sorteos.service';
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
  
  private discordService = inject( DiscordService );
  private sorteosService = inject( SorteosService );

  ngOnInit(): void {
    this.showListSorteos();
  }
  
  participarSorteo( sorteoId: string ){
    this.sorteosService.registerUserInSorteo(sorteoId)
      .subscribe( isMember =>{
      if( !isMember ) this.showMessageInfo.update( ()=> true );
      this.participa.update( ()=> isMember);
    });
  }

  showListSorteos(){
    this.sorteosService.getListSorteosUser().subscribe( listSorteos =>{
      this.listSorteos.update( ()=> listSorteos);
    });
  }

}
