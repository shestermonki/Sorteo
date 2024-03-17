import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component, OnInit, inject, signal } from '@angular/core';
import { RegisterUserInSorteo, SorteosService } from '../../../services/sorteos.service';
import { ResponseListSorteos } from '../../../interfaces';
import { SpinnerComponent } from '../../../components/spinner/spinner.component';
import { ToastComponent } from '../../../components/toast/toast.component';
import { HeaderComponent } from '../components/header/header.component';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-list-sorteo',
  standalone: true,
  imports: [
    CommonModule,
    HeaderComponent,
    SpinnerComponent,
    ToastComponent,
    RouterModule,
  ],
  templateUrl: './listSorteo.component.html',
  styleUrl: './listSorteo.component.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export default class SorteoComponent implements OnInit {
  
  public urlInvitacion = 'https://discord.com/invite/pBjEVYTC7t';

  public listSorteos = signal<ResponseListSorteos[]>([]);
  private sorteosService = inject( SorteosService );

  async ngOnInit(){
    await this.showListSorteos();
  }

  async showListSorteos(){
    this.sorteosService.getListSorteosUser().subscribe( listSorteos =>{
      
      this.listSorteos.update( ()=> listSorteos);

    });
  }

}