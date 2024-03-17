import { Component, OnInit, signal } from '@angular/core';
import NavComponent from '../components/nav/nav.component';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
//import { ErrorMessageDirective } from '../../../directives/errorMessage.directive';
import { Admins } from '../../../interfaces/admin/response-admins.interface';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { AdminService } from '../../../services/admin.service';
import { ValidatorsService } from '../../../services/validators.service';

@Component({
  selector: 'app-new-edit-admin',
  standalone: true,
  imports: [CommonModule,
    NavComponent,
    ReactiveFormsModule,
    RouterLink,
  ],
  templateUrl: './new-edit-admin.component.html',
  styleUrl: './new-edit-admin.component.css'
})
export default class NewEditAdminComponent implements OnInit {

  public isEdit = signal(false);
  public title = signal('Registro de Admin');
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
    private _validatorsService: ValidatorsService
  ) {
    this.token = this._adminService.getToken();
  }


  ngOnInit(): void {
    this.initForma();
    this.getSorteoById();
  }

  initForma() {
    this.forma = this._fb.group({
      username: ['', [Validators.required]],
      email: ['', [Validators.required, this._validatorsService.emailValidator]],
      password: ['', [Validators.required, Validators.minLength(6)]],
      rol: ['', [Validators.required]],
    });
  }

  getSorteoById() {
    this._activatedRoute.params.subscribe(param => {
      const { id } = param;

      if (!id) return;
      this.id = id;
      this.isEdit.set(true);
      this.title.set('Edición de Admin');
      this.textButton.set('Editar');
      this._adminService.obtener_admin(id, this.token).subscribe(admin => {
        const objSorteo = admin.data as Admins;

        this.patchForma(objSorteo);
      });
    });
  }

  patchForma(admin: Admins) {
    this.forma.patchValue(admin);
  }


  validarForma() {
    if (this.forma.invalid) return;
    this.load_btn.set(true);

    (this.isEdit())
      ? this.editAdmin()
      : this.saveSorteo();
  }

  saveSorteo() {
    const admins = this.forma.value as Admins;

    this._adminService.registroAdmin(admins, this.token).subscribe({
      next: () => {
        this.load_btn.set(false);
        this._router.navigate(['/admin/dashboard']);
      },
      error: (error) => {
        console.log(error);
      }
    });
  }

  editAdmin() {
    const admins = this.forma.value as Admins;
    if (this.id !== undefined) {
      this._adminService.actualizar_admin(this.id, admins, this.token).subscribe({
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

  isValid = (field: string): boolean | null => this._validatorsService.isValid(this.forma, field);
  getMessageError = (field: string) => this._validatorsService.getMessageError(this.forma, field);
}

