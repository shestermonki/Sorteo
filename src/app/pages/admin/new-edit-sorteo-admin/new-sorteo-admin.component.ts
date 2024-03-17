import { Component, OnInit, signal } from '@angular/core';
import { AdminService } from '../../../services/admin.service';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import NavComponent from '../components/nav/nav.component';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { Sorteos } from '../../../interfaces/admin/response-sorteos.interface';
import { ValidatorsService } from '../../../services/validators.service';

@Component({
  selector: 'app-new-sorteo-admin',
  standalone: true,
  imports: [
    CommonModule,
    NavComponent,
    ReactiveFormsModule,
    RouterLink,
  ],
  templateUrl: './new-edit-sorteo-admin.component.html',
  styleUrl: './new-edit-sorteo-admin.component.css'
})
export default class NewSorteoAdminComponent implements OnInit {

  public isEdit = signal(false);
  public title = signal('Registro de Sorteo');
  public textButton = signal('Guardar');
  public load_btn = signal(false);
  public id: string | undefined;

  public token: any;
  public forma!: FormGroup;

  constructor(
    private _adminService: AdminService,
    private _router: Router,
    private _activatedRoute: ActivatedRoute,
    private _fb: FormBuilder,
    private _validatorsService: ValidatorsService,
  ) {
    this.token = this._adminService.getToken();
  }

  ngOnInit(): void {
    this.initForma();
    this.getSorteoById();
  }

  initForma() {
    this.forma = this._fb.group({
      name: ['', [Validators.required]],
      description: '',
      prize: [0, [Validators.required, Validators.min(0)]],
      startDate: ['', [Validators.required]],
      endDate: ['', [Validators.required]],
    });
  }

  getSorteoById() {
    this._activatedRoute.params.subscribe(param => {
      const { id } = param;

      if (!id) return;
      this.id = id;
      this.isEdit.set(true);
      this.title.set('Edición de Sorteo');
      this.textButton.set('Editar');
      this._adminService.obtener_sorteo_admin(id, this.token).subscribe(sorteo => {
        const objSorteo = sorteo.data as Sorteos;

        this.patchForma(objSorteo);
      });

    });
  }

  patchForma(sorteo: Sorteos) {
    this.forma.patchValue(sorteo);
  }

  validarForma() {
    if (this.forma.invalid) return;
    this.load_btn.set(true);

    (this.isEdit())
      ? this.editSorteo()
      : this.saveSorteo();

  }

  saveSorteo() {
    const sorteos = this.forma.value as Sorteos;

    this._adminService.createsorteo(sorteos, this.token).subscribe({
      next: () => {
        this.load_btn.set(false);
        this._router.navigate(['/admin/dashboard']);
      },
      error: (error) => {
        console.log(error);
      }
    });
  }

  editSorteo() {
    const sorteos = this.forma.value as Sorteos;
    if (this.id !== undefined) {
      this._adminService.actualizar_sorteo_admin(this.id, sorteos, this.token).subscribe({
        next: () => {
          this.load_btn.set(false);
          this._router.navigate(['/admin/dashboard']);
        },
        error: (error) => {
          console.log(error);
        }
      }
      );
    }
  }

  isValid = (field: string): boolean | null => this._validatorsService.isValid( this.forma, field );
  getMessageError = ( field: string ) => this._validatorsService.getMessageError(this.forma, field);

}
