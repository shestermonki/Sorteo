import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component, ElementRef, OnInit, ViewChild, inject, signal } from '@angular/core';
import { AdminService } from '../../../services/admin.service';
import { ActivatedRoute } from '@angular/router';
import { GLOBAL } from '../../../services/GLOBAL';
import { Users } from '../../../interfaces/admin/response-data-user.interface';

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

  public usuarios = signal<Users[]>([]);
  public sorteo = signal<any>({});
  public id: any;
  public token: any;
  public url: string;
  //private _adminService = inject( AdminService );
  //private _activatedRoute = inject( ActivatedRoute );

  constructor(private _route: ActivatedRoute,
    private _adminService: AdminService) {
    this.token = localStorage.getItem('token');
    this.url = GLOBAL.url;
    this._route.params.subscribe(
      params => {
        this.id = params['id'];
        this.init_data();
      }
    );
  }

  public participants = signal([]);

  @ViewChild('laruleta') circulo?: ElementRef<HTMLElement>;
  boton = document.querySelector("button") ;

  ngOnInit(): void {
    this.getSorteoById();
  }

  getSorteoById(){
    this._route.params.subscribe( ({id}) =>{
      if (!id) return;

      this.getAllParticipans( id );
    });
  }

  getListUsers(){
    this._adminService.listar_usuarios_admin(this.token).subscribe({
      next: users => {
        this.usuarios.set( users );
        //this.load_data = false;
      },
      error: (error) => {
        console.log(error);
      }
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

  init_data() {
    this._adminService.obtener_sorteo_admin(this.id, this.token).subscribe(
      response => {
        if (response.data == undefined) {
          this.sorteo.set(undefined);

        } else {

          this.sorteo.set(response.data);
        }
        console.log(this.sorteo());
      },
      error => {
        console.error(error);
      }
    );
  }

}
