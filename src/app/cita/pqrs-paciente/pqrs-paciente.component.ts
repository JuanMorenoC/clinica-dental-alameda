import {ChangeDetectionStrategy, Component, OnInit} from '@angular/core';
import {
  FormBuilder,
  FormControl,
  FormGroup, NgControl,
  Validators
} from '@angular/forms';
import { MatFormFieldControl} from '@angular/material/form-field';
import { UsuarioService } from '../../Service/usuario/usuario.service';
import { TipopqrsService } from '../../Service/tipopqrs/tipopqrs.service';
import { PqrsService } from '../../Service/pqrs/pqrs.service';
import { RoleService } from '../../Service/role/role.service';
import {MatDialog} from '@angular/material/dialog';
import {Observable} from 'rxjs';

/** Data structure for cita. */
export class PQRS {
  constructor(
    public id: string,
    public descripcion: string
  ) {}
}

@Component({
  selector: 'app-pqrs-paciente',
  templateUrl: './pqrs-paciente.component.html',
  styleUrls: ['./pqrs-paciente.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  providers: [{ provide: MatFormFieldControl, useExisting: PqrsPacienteComponent }]
})
export class PqrsPacienteComponent implements MatFormFieldControl<PQRS>, OnInit {
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
  value: PQRS | null | undefined;
  form: FormGroup | any;
  public listamoderador: Array<any> = [];
  public listausuario: Array<any> = [];
  count = 0;
  contadortipo: any;
  public res: Array<any> = [];
  data: any;
  dataPqrs: any;
  lista: string[] = ['Peticion', 'Queja', 'Reclamo', 'Sugerencia'];
  constructor(private fb: FormBuilder,
              private usuarioService: UsuarioService,
              private pqrsService: PqrsService,
              private rolService: RoleService,
              private tipopqrsService: TipopqrsService,
              public dialog: MatDialog) {
  }

  ngOnInit(): void {
    this.builForm();
  }
  initEditForm(): void{
    this.form = this.fb.group({
      id: new FormControl(),
      pqrs: new FormControl(),
      descripcion: new FormControl(),
    });
  }
  private builForm(): void{
    this.form = this.fb.group({
      id: [''],
      pqrs: [''],
      descripcion: [''],
    });
  }
  envio(): void{
    this.rolService.getAllRol().subscribe((datar: any) => {
      this.usuarioService.getAllUsuario().subscribe((datau: any) => {
        let encontrado = false;
        for (let i = 0; i < datar.length; i++) {
          if (this.form.value.id === datar[i].cedula && datar[i].nombre === 'paciente'){
            encontrado = true;
          }
        }
        if (encontrado === false){
          this.dialog.open(DialogErrorPqrsPacienteComponent);
        } else {
          let datatpqrs = {
            tipo: this.form.value.pqrs
          };
          this.tipopqrsService.addTipoPqrs(datatpqrs).subscribe((datatp: any) => {
            this.tipopqrsService.getAllTipoPqrs().subscribe((dataallp: any) => {
              this.contadortipo = dataallp[dataallp.length - 1].idPQRS;
              this.usuarioService.getAllUsuario().subscribe((dataUs: any) => {
                for (let i = 0; i < datar.length; i++) {
                  if (datar[i].nombre === 'moderador'){
                    for (let j = 0; j < dataUs.length; j++) {
                      if (dataUs[j].cedula === datar[i].cedula){
                        this.listamoderador.push(dataUs[j].cedula);
                        this.listamoderador.push(dataUs[j].nombre);
                        this.listamoderador.push(dataUs[j].apellido);
                        this.listamoderador.push(dataUs[j].seudonimo);
                        this.listamoderador.push(dataUs[j].tipo_identificacion);
                        this.listamoderador.push(dataUs[j].correo);
                        this.listamoderador.push(dataUs[j].clave);
                        this.listamoderador.push(dataUs[j].fecha_nacimiento);
                        this.listamoderador.push(dataUs[j].celular);
                        this.listamoderador.push(dataUs[j].ciudad);
                        this.listamoderador.push(dataUs[j].departamento);
                        this.listamoderador.push(dataUs[j].pais);
                        break;
                      }
                    }
                  }
                  if (datar[i].nombre === 'paciente'){
                    for (let j = 0; j < dataUs.length; j++) {
                      if (dataUs[j].cedula === datar[i].cedula && dataUs[j].cedula === this.form.value.id) {
                        this.listausuario.push(dataUs[j].cedula);
                        this.listausuario.push(dataUs[j].nombre);
                        this.listausuario.push(dataUs[j].apellido);
                        this.listausuario.push(dataUs[j].seudonimo);
                        this.listausuario.push(dataUs[j].tipo_identificacion);
                        this.listausuario.push(dataUs[j].correo);
                        this.listausuario.push(dataUs[j].clave);
                        this.listausuario.push(dataUs[j].fecha_nacimiento);
                        this.listausuario.push(dataUs[j].celular);
                        this.listausuario.push(dataUs[j].ciudad);
                        this.listausuario.push(dataUs[j].departamento);
                        this.listausuario.push(dataUs[j].pais);
                        break;
                      }
                    }
                  }
                }
                this.dataPqrs = {
                  descripcion: this.form.value.descripcion,
                  respuesta: '',
                  moderador: {
                    cedula: this.listamoderador[0],
                    nombre: this.listamoderador[1],
                    apellido: this.listamoderador[2],
                    seudonimo: this.listamoderador[3],
                    tipo_identificacion: this.listamoderador[4],
                    correo: this.listamoderador[5],
                    clave: this.listamoderador[6],
                    fecha_nacimiento: this.listamoderador[7],
                    celular: this.listamoderador[8],
                    ciudad: this.listamoderador[9],
                    departamento: this.listamoderador[10],
                    pais: this.listamoderador[11]
                  },
                  paciente: {
                    cedula: this.listausuario[0],
                    nombre: this.listausuario[1],
                    apellido: this.listausuario[2],
                    seudonimo: this.listausuario[3],
                    tipo_identificacion: this.listausuario[4],
                    correo: this.listausuario[5],
                    clave: this.listausuario[6],
                    fecha_nacimiento: this.listausuario[7],
                    celular: this.listausuario[8],
                    ciudad: this.listausuario[9],
                    departamento: this.listausuario[10],
                    pais: this.listausuario[11]
                  },
                  tipopqrs: {
                    idPQRS: this.contadortipo,
                    tipo: this.form.value.pqrs
                  }
                };
                console.log(this.dataPqrs);
                this.pqrsService.addPqrs(this.dataPqrs).subscribe((dataaddpqrs: any) => {
                  console.log(dataaddpqrs);
                  this.dialog.open(DialogPqrsPacienteComponent);
                });
              });
            });
          });
        }
      });
    });
  }
  cargarTabla(): void{
    this.pqrsService.getAllPqrs().subscribe((datap: any) => {
      for (let i = 0; i < datap.length; i++) {
        if (datap[i].paciente.cedula === this.form.value.id){
          this.data = [{
            id: datap[i].idPQRS,
            date: datap[i].tipopqrs.tipo,
            name: datap[i].respuesta
          }];
          this.res.push(this.data);
        }
      }
    });
  }
  log(): void {
    this.count++;
    console.log('Clicked!');
  }

}

@Component({
  selector: 'app-dialog-pqrs-paciente',
  templateUrl: 'dialog-pqrs-paciente.html',
})
export class DialogPqrsPacienteComponent {}

@Component({
  selector: 'app-dialog-error-pqrs-paciente',
  templateUrl: 'dialog-error-pqrs-paciente.html',
})
export class DialogErrorPqrsPacienteComponent {}
