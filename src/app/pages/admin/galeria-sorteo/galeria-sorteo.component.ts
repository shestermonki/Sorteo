import { Component, OnInit, signal } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { v4 as uuidv4 } from 'uuid';
import { GLOBAL } from '../../../services/GLOBAL';
import { AdminService } from '../../../services/admin.service';
import SideNavComponent from '../components/side-nav/side-nav.component';
import { NgFor, NgIf } from '@angular/common';
declare var $: (arg0: string) => { (): any; new(): any; val: { (arg0: string): void; new(): any; }; };

@Component({
  selector: 'app-galeria-sorteo',
  standalone: true,
  imports: [SideNavComponent, NgIf, NgFor],
  templateUrl: './galeria-sorteo.component.html',
  styleUrl: './galeria-sorteo.component.css'
})
export default class GaleriaSorteoComponent implements OnInit {

  public sorteo = signal<any>({});
  public file: File | undefined = undefined;
  public id: any;
  public token: any;
  public url;
  public load_btn = false;
  public load_btn_eliminar = false;

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

  ngOnInit(): void {
  }

  subir_imagen() {
    if (this.file != undefined) {
      let data = {
        imagen: this.file,
        _id: uuidv4()
      }
      console.log(data);
      this._adminService.agregar_imgPortada_admin(this.id, data, this.token).subscribe(
        response => {
          this.init_data();
          $('#input-img').val('');
        }
      );
    } else {

    }
  }


  init_data() {
    this._adminService.obtener_sorteo_admin(this.id, this.token).subscribe(
      response => {
        if (response.data == undefined) {
          this.sorteo.set(undefined);

        } else {

          this.sorteo.set(response.data);
        }
        console.log(this.sorteo);
      },
      error => {
        console.error(error);
      }
    );
  }


  fileChangeEvent(event: any): void {
    var file;
    if (event.target.files && event.target.files[0]) {
      file = <File>event.target.files[0];

    } else {

    }

    if (file && file.size <= 4000000) {

      if (file.type == 'image/png' || file.type == 'image/webp' || file.type == 'image/jpg' || file.type == 'image/gif' || file.type == 'image/jpeg') {

        this.file = file;

      } else {

        $('#input-img').val('');
        this.file = undefined;
      }
    } else {

      $('#input-img').val('');
      this.file = undefined;
    }

    console.log(this.file);

  }

  eliminar(id: any) {
    this.load_btn_eliminar = true;
    this._adminService.eliminar_imagen_galeria_admin(this.id, { _id: id }, this.token).subscribe(
      response => {




        this.load_btn_eliminar = false;

        this.init_data();


      },
      error => {

        console.log(error);
        this.load_btn = false;
      }
    )
  }

}
