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
  selector: 'app-pqrs',
  templateUrl: './pqrs.component.html',
  styleUrls: ['./pqrs.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  providers: [{ provide: MatFormFieldControl, useExisting: PqrsComponent }]
})
export class PqrsComponent implements MatFormFieldControl<PQRS>, OnInit {
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
  public res: Array<any> = [];
  data: any;
  dataPqrs: any;
  form: FormGroup | any;
  count = 0;
  constructor(private fb: FormBuilder,
              private usuarioService: UsuarioService,
              private pqrsService: PqrsService,
              private rolService: RoleService,
              private tipopqrsService: TipopqrsService,
              public dialog: MatDialog) { }

  ngOnInit(): void {
    this.builForm();
  }
  initEditForm(): void{
    this.form = this.fb.group({
      respuesta: new FormControl(),
    });
  }
  private builForm(): void{
    this.form = this.fb.group({
      respuesta: ['', [Validators.required]],
    });
  }
  cargar(): void{
    this.pqrsService.getAllPqrs().subscribe((datap: any) => {
      for (let i = 0; i < datap.length; i++) {
        if (datap[i].respuesta === ''){
          this.data = [{
            id: datap[i].idPQRS,
            date: datap[i].tipopqrs.tipo,
            name: datap[i].descripcion
          }];
          this.res.push(this.data);
        }
      }
    });
  }
  enviopqrs(j: number): void{
    this.pqrsService.getAllPqrs().subscribe((datap: any) => {
      for (let i = 0; i < datap.length; i++) {
        if (datap[i].tipopqrs.idPQRS === this.res[j][0].id){
          this.dataPqrs = {
            idPQRS: datap[i].idPQRS,
            descripcion: datap[i].descripcion,
            respuesta: this.form.value.respuesta,
            moderador: {
              cedula: datap[i].moderador.cedula,
              nombre: datap[i].moderador.nombre,
              apellido: datap[i].moderador.apellido,
              seudonimo: datap[i].moderador.seudonimo,
              tipo_identificacion: datap[i].moderador.tipo_identificacion,
              correo: datap[i].moderador.correo,
              clave: datap[i].moderador.clave,
              fecha_nacimiento: datap[i].moderador.fecha_nacimiento,
              celular: datap[i].moderador.celular,
              ciudad: datap[i].moderador.ciudad,
              departamento: datap[i].moderador.departamento,
              pais: datap[i].moderador.pais
            },
            paciente: {
              cedula: datap[i].paciente.cedula,
              nombre: datap[i].paciente.nombre,
              apellido: datap[i].paciente.apellido,
              seudonimo: datap[i].paciente.seudonimo,
              tipo_identificacion: datap[i].paciente.tipo_identificacion,
              correo: datap[i].paciente.correo,
              clave: datap[i].paciente.clave,
              fecha_nacimiento: datap[i].paciente.fecha_nacimiento,
              celular: datap[i].paciente.celular,
              ciudad: datap[i].paciente.ciudad,
              departamento: datap[i].paciente.departamento,
              pais: datap[i].paciente.pais
            },
            tipopqrs: {
              idPQRS: datap[i].tipopqrs.idPQRS,
              tipo: datap[i].tipopqrs.tipo
            }
          };
        }
      }
      this.pqrsService.updatePqrs(this.dataPqrs, this.dataPqrs.idPQRS).subscribe((datapu: any) => {
        this.dialog.open(DialogPqrsComponent);
      });
    });
  }
  log(): void {
    this.count++;
    console.log('Clicked!');
  }

}

@Component({
  selector: 'app-dialog-pqrs',
  templateUrl: 'dialog-pqrs.html',
})
export class DialogPqrsComponent {}
