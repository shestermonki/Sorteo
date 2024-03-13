import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { DiscordService } from '../../../services/discord-api/dc.service';

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
export default class SorteoComponent {

  private discordService = inject( DiscordService );
  public participa: boolean = false;
  public entrarAlServer: boolean = false;
  public urlInvitacion = 'https://discord.com/invite/pBjEVYTC7t';

  participarSorteo(){
    this.discordService.participarSorteo().subscribe( isMember =>{
      if (isMember) {
        this.participa = true;
      }else{
        this.entrarAlServer = true;
      }
    });
  }
}
