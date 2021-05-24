import { Component, ChangeDetectionStrategy, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators, NgControl, FormControl } from '@angular/forms';
import { UsuarioService } from '../../Service/usuario/usuario.service';
import {Observable} from 'rxjs';
import { MatFormFieldControl} from '@angular/material/form-field';
import {MatDialog} from '@angular/material/dialog';
import {isEmpty} from 'rxjs/operators';
import {DialogErrorActualizarPacienteParaSecretariaComponent} from '../actualizar-paciente-para-secretaria/actualizar-paciente-para-secretaria.component';

/** Data structure for Usuario. */
export class Usuario {
  constructor(
    public id: string,
    public tipoidentificacion: string,
    public nombre: string,
    public apellido: string,
    public email: string,
    public celular: string,
    public fechanacimiento: Date,
    public direccion: string,
    public departamento: string,
    public ciudad: string,
    public seudonimo: string,
    public clave: string
  ) {}
}

@Component({
  selector: 'app-borrar-paciente',
  templateUrl: './borrar-paciente.component.html',
  styleUrls: ['./borrar-paciente.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  providers: [{ provide: MatFormFieldControl, useExisting: BorrarPacienteComponent }]
})
export class BorrarPacienteComponent implements MatFormFieldControl<Usuario>, OnInit {
  data: any = [];
  constructor(private fb: FormBuilder, private usuarioService: UsuarioService, public dialog: MatDialog) {
  }
  form: FormGroup | any;
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
  value: Usuario | null | undefined;
  ngOnInit(): void {
    this.builForm();
  }
  initEditForm(): void{
    this.form = this.fb.group({
      id: new FormControl(),
    });
  }
  private builForm(): void{
    this.form = this.fb.group({
      id: ['', [Validators.required]],
    });
  }

  borrarUsuario(): void {
    this.usuarioService.getAllUsuario().subscribe((data: any) => {
      let error = false;
      for (let i = 0 ; i < data.length ; i++){
        if (data[i].id === this.form.value.id){
          error = true;
        }
      }
      if (!error){
        this.dialog.open(DialogErrorBorrarPacienteComponent);
      } else  {
        this.usuarioService.deleteUsuario(this.form.value.id).subscribe( (datas: any) => {
          console.log('usuario borrado');
          console.log(datas);
          this.dialog.open(DialogBorrarPacienteComponent);
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
  selector: 'app-dialog-borrar-paciente',
  templateUrl: 'dialog-borrar-paciente.html',
})
export class DialogBorrarPacienteComponent {}

@Component({
  selector: 'app-dialog-error-borrar-paciente',
  templateUrl: 'dialog-error-borrar-paciente.html',
})
export class DialogErrorBorrarPacienteComponent {}
