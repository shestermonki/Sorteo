import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component, inject, signal } from '@angular/core';
import { RegisterUserInSorteo, SorteosService } from '../../../services/sorteos.service';
import { ToastComponent } from '../../../components/toast/toast.component';

@Component({
  selector: 'app-detail-sorteo',
  standalone: true,
  imports: [
    CommonModule,
    ToastComponent,
  ],
  templateUrl: './detailSorteo.component.html',
  styleUrl: './detailSorteo.component.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export default class DetailSorteoComponent {

  public respRegisterSorteo = signal<RegisterUserInSorteo | null>(null);
  private sorteosService = inject( SorteosService );
  
  public toggleToast = signal( false );

  participarSorteo( sorteoId: string ){
    this.sorteosService.registerUserInSorteo(sorteoId)
    .subscribe( data =>{

      if (!data) return;
      this.respRegisterSorteo.update( ()=> data );
      this.toggleToast.set( true );
      
      setTimeout(() => {
        this.toggleToast.set( false );
      }, 5000);
      
    });
  }

}
