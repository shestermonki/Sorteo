import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component, OnInit, inject, signal } from '@angular/core';
import { RegisterUserInSorteo, SorteosService } from '../../../services/sorteos.service';
import { ToastComponent } from '../../../components/toast/toast.component';
import { ActivatedRoute } from '@angular/router';
import { AdminService } from '../../../services/admin.service';
import { Sorteos } from '../../../interfaces/admin/response-sorteos.interface';

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
export default class DetailSorteoComponent implements OnInit {
  
  public urlInvitacion = 'https://discord.com/invite/pBjEVYTC7t';
  public toggleToast = signal( false );
  public respRegisterSorteo = signal<RegisterUserInSorteo | null>(null);
  
  private sorteosService = inject( SorteosService );
  private activatedRoute = inject( ActivatedRoute );
  private _adminService = inject( AdminService );

  ngOnInit(): void {
    this.getSorteoById();
  }
  
  getSorteoById(){
    this.activatedRoute.params.subscribe( param =>{
      const { id } = param;
      if( !id ) return;

      this._adminService.obtener_sorteo_admin( id, '' ).subscribe( sorteo =>{
        const objSorteo = sorteo.data as Sorteos;
        console.log(objSorteo);
        
        // this.patchForma( objSorteo );
      });
    });
  }

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
