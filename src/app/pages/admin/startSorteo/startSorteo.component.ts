import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component, ElementRef, OnInit, ViewChild, inject, signal } from '@angular/core';
import { AdminService } from '../../../services/admin.service';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-start-sorteo',
  standalone: true,
  imports: [
    CommonModule,
  ],
  templateUrl: './startSorteo.component.html',
  styleUrl: './startSorteo.component.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class StartSorteoComponent implements OnInit {
  
  private _adminService = inject( AdminService );
  private _activatedRoute = inject( ActivatedRoute );

  public participants = signal([]);
  
  @ViewChild('laruleta') circulo?: ElementRef<HTMLElement>;
  boton = document.querySelector("button") ;
  
  ngOnInit(): void {
    this.getSorteoById();
  }
  
  getSorteoById(){
    this._activatedRoute.params.subscribe( ({id}) =>{
      if (!id) return;

      this.getAllParticipans( id );
    });
  }
  
  getAllParticipans( id: string ){
    const token = this._adminService.getToken();
    this._adminService.obtener_sorteo_admin( id, token )
      .subscribe( ({data}) =>{
        if (!data) return;

        this.participants.set( data.participants );
        
      });
  }

  startRuleta(){
    if (!this.circulo) return;
    this.circulo!.nativeElement.style.webkitAnimationPlayState = "running";
  }

}