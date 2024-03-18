import { Component, OnInit, inject, signal } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { v4 as uuidv4 } from 'uuid';
import { GLOBAL } from '../../../services/GLOBAL';
import { AdminService } from '../../../services/admin.service';
import SideNavComponent from '../components/side-nav/side-nav.component';
import { CommonModule, } from '@angular/common';
import { FormArray, FormBuilder, FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { ValidatorsService } from '../../../services/validators.service';
declare var $: (arg0: string) => { (): any; new(): any; val: { (arg0: string): void; new(): any; }; };

export interface Premio {
  "_id": string,
  "name": string,
  "file": string,
}

@Component({
  selector: 'app-galeria-sorteo',
  standalone: true,
  imports: [
    SideNavComponent,
    CommonModule,
    ReactiveFormsModule,
  ],
  templateUrl: './galeria-sorteo.component.html',
  styleUrl: './galeria-sorteo.component.css'
})
export default class GaleriaSorteoComponent implements OnInit {

  public sorteo = signal<any>({});
  public id: any;
  public token: any;
  public url: string;
  public load_btn = false;
  public load_btn_eliminar = false;

  public objPremio!: FormGroup;
  private _fb = inject( FormBuilder );
  private _validatorsService = inject( ValidatorsService );

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
    this.initFormArray();
    console.log(this.objPremio);
  }

  initFormArray(){
    this.objPremio = this._fb.group({
      premios: this._fb.array([
        this._fb.group({
          _id: [ '', ],
          name: ['', Validators.required],
          file: [null, Validators.required]
        })
      ])
    });
  }

  getFormArray(){
    return this.objPremio.get('premios') as FormArray;
  }

  addPremio(  ){
    this.getFormArray().push(this._fb.group({
      _id: [ '' ],
      name: ['',],
      file: [null ]
    }));
  }

  eliminarPremio( i: number ){
    console.log(this.getFormArray().controls[i]);
    this.getFormArray().removeAt( i );
  }

  getValueOfArray( index: number ){
    const form = this.getFormArray().controls[index] as FormGroup;
    return form.get('file')?.value
  }

  subir_imagen( index: number ) {
    console.log(this.objPremio.valid);
    
    if (this.objPremio.invalid) return;

    const premio: Premio = this.getFormArray().controls[index].value;
    premio._id = uuidv4();

    this._adminService.agregar_premios_admin(this.id, premio, this.token).subscribe(
      response => {
        this.init_data();
        $('#input-img').val('');
      }
    );
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


  fileChangeEvent(event: any, index: number): void {
    var file;
    if (event.target.files && event.target.files[0]) {
      file = <File>event.target.files[0];

    } else {

    }

    if (file && file.size <= 4000000) {

      if (file.type == 'image/png' || file.type == 'image/webp' || file.type == 'image/jpg' || file.type == 'image/gif' || file.type == 'image/jpeg') {

        const form = this.getFormArray().controls[index] as FormGroup;
        form.get('file')?.setValue(file);

      } else {
        $('#input-img').val('');
      }
    } else {

      $('#input-img').val('');
    }

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
