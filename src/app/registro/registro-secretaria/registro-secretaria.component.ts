import { Component, ChangeDetectionStrategy, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators, NgControl, FormControl } from '@angular/forms';
import { SecretariaService } from '../../Service/secretaria/secretaria.service';
import {Observable} from 'rxjs';
import { MatFormFieldControl} from '@angular/material/form-field';
import {MatDialog} from '@angular/material/dialog';

/** Data structure for Usuario. */
export class Usuario {
  constructor(
    public id: string,
    public tipoidentificacion: string,
    public nombre: string,
    public apellido: string,
    public email: string,
    public seudonimo: string,
    public clave: string
  ) {}
}

@Component({
  selector: 'app-registro-secretaria',
  templateUrl: './registro-secretaria.component.html',
  styleUrls: ['./registro-secretaria.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  providers: [{ provide: MatFormFieldControl, useExisting: RegistroSecretariaComponent }]
})
export class RegistroSecretariaComponent implements MatFormFieldControl<Usuario>, OnInit {
  constructor(private fb: FormBuilder, private secretariaService: SecretariaService, public dialog: MatDialog) {
  }
  form: FormGroup | any;
  data = [];
  hide = true;
  readonly autofilled: boolean | undefined;
  readonly controlType: string | undefined;
  // @ts-ignore
  readonly disabled: boolean | undefined;
  // @ts-ignore
  readonly empty: boolean | undefined;
  // @ts-ignore
  readonly errorState: boolean | undefined;
  // @ts-ignore
  readonly focused: boolean | undefined;
  // @ts-ignore
  readonly id: string | undefined;
  // @ts-ignore
  readonly ngControl: NgControl | null | undefined;

  // @ts-ignore
  readonly placeholder: string | undefined;
  // @ts-ignore
  readonly required: boolean | undefined;

  // @ts-ignore
  readonly shouldLabelFloat: boolean | undefined;
  // @ts-ignore
  readonly stateChanges: Observable<void> | undefined;
  readonly userAriaDescribedBy: string | undefined;
  // @ts-ignore
  value: Cita | null | undefined;
  ngOnInit(): void {
    this.builForm();
  }
  initEditForm(): void{
    this.form = this.fb.group({
      id: new FormControl(),
      tipoidentificacion: new FormControl(),
      nombre: new FormControl(),
      apellido: new FormControl(),
      email: new FormControl(),
      seudonimo: new FormControl(),
      clave: new FormControl(),
    });
  }
  private builForm(): void{
    this.form = this.fb.group({
      id: ['', [Validators.required]],
      tipoidentificacion: ['', [Validators.required]],
      nombre: ['', [Validators.required]],
      apellido: ['', [Validators.required]],
      email: ['', [Validators.required, Validators.email]],
      seudonimo: ['', [Validators.required]],
      clave: ['', [Validators.required]],
    });
  }

  agregarSecretaria(): void {
    this.secretariaService.getAllSecretaria().subscribe((datoId: any) => {
      let idencontrado = false;
      for (let i = 0 ; i < datoId.length ; i ++){
        if (this.form.value.id === datoId[i].id){
          idencontrado = true;
          break;
        }
      }
      if (idencontrado === true){
        this.dialog.open(DialogErrorRegistroSecretariaComponent);
      } else {
        this.secretariaService.addSecretaria(this.form.value).subscribe( (data: any) => {
          console.log('agregado');
          this.dialog.open(DialogRegistroSecretariaComponent);
        });
      }
    });
  }
  onContainerClick(event: MouseEvent): void {
  }

  setDescribedByIds(ids: string[]): void {
  }
}

@Component({
  selector: 'app-dialog-registro-secretaria',
  templateUrl: 'dialog-registro-secretaria.html',
})
export class DialogRegistroSecretariaComponent {}

@Component({
  selector: 'app-dialog-error-registro-secretaria',
  templateUrl: 'dialog-error-registro-secretaria.html',
})
export class DialogErrorRegistroSecretariaComponent {}
