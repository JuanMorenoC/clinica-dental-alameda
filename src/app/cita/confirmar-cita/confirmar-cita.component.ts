import {
  Component,
  ChangeDetectionStrategy,
  OnInit, ViewChild
} from '@angular/core';
import {
  FormBuilder,
  FormControl,
  FormGroup, NgControl,
  Validators
} from '@angular/forms';
import { MatFormFieldControl} from '@angular/material/form-field';
import { UsuarioService } from '../../Service/usuario/usuario.service';
import { CitaService } from '../../Service/cita/cita.service';
import { RoleService } from '../../Service/role/role.service';
import { EnvioCorreoService } from '../../Service/envioCorreo/envio-correo.service';
import {Observable} from 'rxjs';
import {MatDialog} from '@angular/material/dialog';

/** Data structure for cita. */
export class Cita {
  constructor(
    public id: string,
    public nombre: string,
    public apellido: string,
    public email: string,
    public tipoespecialidad: string,
    public fechacita: Date,
    public hora: string,
    public estado: string
  ) {}
}

@Component({
  selector: 'app-confirmar-cita',
  templateUrl: './confirmar-cita.component.html',
  styleUrls: ['./confirmar-cita.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  providers: [{ provide: MatFormFieldControl, useExisting: ConfirmarCitaComponent }]
})
export class ConfirmarCitaComponent implements MatFormFieldControl<Cita>, OnInit{
  data: any[] = [];
  constructor(private fb: FormBuilder,
              private usuarioService: UsuarioService,
              private citaService: CitaService,
              private rolService: RoleService,
              private envioCorreoService: EnvioCorreoService,
              public dialog: MatDialog) {
    // this.cargar();
  }


  form: FormGroup | any;
  public res: Array<any> = [];
  public dataH = new Object();
  public odontologos: any[] = [];
  public paciente: any[] = [];
  dataAgenda: any;
  mostrar: any = false;
  count = 0;
  public ident = 0;
  public nombre = '';
  public apellido = '';
  public email = '';
  public tipoespecialidad = '';
  public fechacita = new Date();
  public hora = '';
  public estado = '';

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

  columnas: string[] = ['cedula', 'nombres', 'correo', 'especialidad', 'fecha_cita', 'hora',
    'confirmar', 'cancelar'];

  ngOnInit(): void{
    this.builForm();
  }
  initEditForm(): void{
    this.form = this.fb.group({
      id: new FormControl(),
      nombre: new FormControl(),
      apellido: new FormControl(),
      email: new FormControl(),
      tipoespecialidad: new FormControl(),
      fechacita: new FormControl(),
      hora: new FormControl(),
      estado: new FormControl(),
      estadonuevo: new FormControl(),
    });
  }
  private builForm(): void{
    this.form = this.fb.group({
      id: ['', [Validators.required]],
      nombre: ['', [Validators.required]],
      apellido: ['', [Validators.required]],
      email: ['', [Validators.required, Validators.email]],
      tipoespecialidad: ['', [Validators.required]],
      fechacita: ['', [Validators.required]],
      hora: ['', [Validators.required]],
      estado: ['', [Validators.required]],
      estadonuevo: ['', [Validators.required]],
    });

    console.log(typeof this.form.get('hora'));
    console.log(typeof this.form);
  }
  log(): void {
    this.count++;
    console.log('Clicked!');
  }
  confirmarCita(j: number): void{
    this.citaService.getAllCita().subscribe((dataAgendaAll: any) => {
      for (let n = 0 ; n < dataAgendaAll.length ; n++){
        if (dataAgendaAll[n].paciente.cedula === this.res[j][0].id){
          this.dataAgenda = {
            idCita: dataAgendaAll[n].idCita,
            hora: dataAgendaAll[n].hora,
            descripcion: dataAgendaAll[n].descripcion,
            estado: 'confirmado',
            fecha_cita: dataAgendaAll[n].fecha_cita,
            paciente: {
              cedula: dataAgendaAll[n].paciente.cedula,
              nombre: dataAgendaAll[n].paciente.nombre,
              apellido: dataAgendaAll[n].paciente.apellido,
              seudonimo: dataAgendaAll[n].paciente.seudonimo,
              tipo_identificacion: dataAgendaAll[n].paciente.tipo_identificacion,
              correo: dataAgendaAll[n].paciente.correo,
              clave: dataAgendaAll[n].paciente.clave,
              fecha_nacimiento: dataAgendaAll[n].paciente.fecha_nacimiento,
              celular: dataAgendaAll[n].paciente.celular,
              ciudad: dataAgendaAll[n].paciente.ciudad,
              departamento: dataAgendaAll[n].paciente.departamento,
              pais: dataAgendaAll[n].paciente.pais
            },
            odontologo: {
              cedula: dataAgendaAll[n].odontologo.cedula,
              nombre: dataAgendaAll[n].odontologo.nombre,
              apellido: dataAgendaAll[n].odontologo.apellido,
              seudonimo: dataAgendaAll[n].odontologo.seudonimo,
              tipo_identificacion: dataAgendaAll[n].odontologo.tipo_identificacion,
              correo: dataAgendaAll[n].odontologo.correo,
              clave: dataAgendaAll[n].odontologo.clave,
              fecha_nacimiento: dataAgendaAll[n].odontologo.fecha_nacimiento,
              celular: dataAgendaAll[n].odontologo.celular,
              ciudad: dataAgendaAll[n].odontologo.ciudad,
              departamento: dataAgendaAll[n].odontologo.departamento,
              pais: dataAgendaAll[n].odontologo.pais
            },
            procedimiento: {
              idProcedimiento: dataAgendaAll[n].procedimiento.idProcedimiento,
              tipo: dataAgendaAll[n].procedimiento.tipo
            }
          };
        }
      }
      this.citaService.updateCita(this.dataAgenda, this.dataAgenda.idCita).subscribe((dataAgendaAgregar: any) => {
        console.log(dataAgendaAgregar);
        console.log(this.dataAgenda.paciente.correo);
        this.envioCorreoService.addCorreo(this.dataAgenda).subscribe((datae: any) => {
          console.log(datae);
          this.dialog.open(DialogConfirmarCitaComponent);
          window.location.reload();
        });
      });
    });
  }
  cancelarCita(j: number): void{
    this.citaService.getAllCita().subscribe((dataAgendaAll: any) => {
      for (let n = 0 ; n < dataAgendaAll.length ; n++){
        if (dataAgendaAll[n].paciente.cedula === this.res[j][0].id){
          this.dataAgenda = {
            idCita: dataAgendaAll[n].idCita,
            hora: dataAgendaAll[n].hora,
            descripcion: dataAgendaAll[n].descripcion,
            estado: 'cancelado',
            fecha_cita: dataAgendaAll[n].fecha_cita,
            paciente: {
              cedula: dataAgendaAll[n].paciente.cedula,
              nombre: dataAgendaAll[n].paciente.nombre,
              apellido: dataAgendaAll[n].paciente.apellido,
              seudonimo: dataAgendaAll[n].paciente.seudonimo,
              tipo_identificacion: dataAgendaAll[n].paciente.tipo_identificacion,
              correo: dataAgendaAll[n].paciente.correo,
              clave: dataAgendaAll[n].paciente.clave,
              fecha_nacimiento: dataAgendaAll[n].paciente.fecha_nacimiento,
              celular: dataAgendaAll[n].paciente.celular,
              ciudad: dataAgendaAll[n].paciente.ciudad,
              departamento: dataAgendaAll[n].paciente.departamento,
              pais: dataAgendaAll[n].paciente.pais
            },
            odontologo: {
              cedula: dataAgendaAll[n].odontologo.cedula,
              nombre: dataAgendaAll[n].odontologo.nombre,
              apellido: dataAgendaAll[n].odontologo.apellido,
              seudonimo: dataAgendaAll[n].odontologo.seudonimo,
              tipo_identificacion: dataAgendaAll[n].odontologo.tipo_identificacion,
              correo: dataAgendaAll[n].odontologo.correo,
              clave: dataAgendaAll[n].odontologo.clave,
              fecha_nacimiento: dataAgendaAll[n].odontologo.fecha_nacimiento,
              celular: dataAgendaAll[n].odontologo.celular,
              ciudad: dataAgendaAll[n].odontologo.ciudad,
              departamento: dataAgendaAll[n].odontologo.departamento,
              pais: dataAgendaAll[n].odontologo.pais
            },
            procedimiento: {
              idProcedimiento: dataAgendaAll[n].procedimiento.idProcedimiento,
              tipo: dataAgendaAll[n].procedimiento.tipo
            }
          };
        }
      }
      this.citaService.updateCita(this.dataAgenda, this.dataAgenda.idCita).subscribe((dataAgendaAgregar: any) => {
        console.log(dataAgendaAgregar);
        console.log(this.dataAgenda.paciente.correo);
        this.envioCorreoService.addCorreo(this.dataAgenda).subscribe((datae: any) => {
          console.log(datae);
          this.citaService.deleteCita(Number(this.dataAgenda.idCita)).subscribe((datad: any) => {
            this.dialog.open(DialogCancelarCitaComponent);
            window.location.reload();
          });
        });
      });
    });
  }
  cargar(): void{
    this.citaService.getAllCita().subscribe( (data: any) => {
      let nombreCompleto = '';
      console.log('TABLA CITA');
      console.log(data);
      for (let i = 0; i < data.length ; i++) {
        if (data[i].estado === 'pendiente'){
          nombreCompleto = data[i].paciente.nombre + ' ' + data[i].paciente.apellido;
          this.dataH = [{
            id: String(data[i].paciente.cedula),
            name: nombreCompleto,
            list: String(data[i].paciente.correo),
            describe: String(data[i].procedimiento.tipo),
            date: String(new Date(data[i].fecha_cita).toLocaleDateString()),
            parent: String(data[i].hora)
          }];
          console.log('DATOS DE TABLA CITA');
          console.log(this.dataH );
          this.res.push(this.dataH);
        }
      }
      console.log('-----');
      console.log(this.res );
    });
  }
  onContainerClick(event: MouseEvent): void {
  }

  setDescribedByIds(ids: string[]): void {
  }
}

@Component({
  selector: 'app-dialog-confirmar-cita',
  templateUrl: 'dialog-confirmar-cita.html',
})
export class DialogConfirmarCitaComponent {}

@Component({
  selector: 'app-dialog-cancelar-cita',
  templateUrl: 'dialog-cancelar-cita.html',
})
export class DialogCancelarCitaComponent {}

@Component({
  selector: 'app-dialog-error-confirmar-cita',
  templateUrl: 'dialog-error-confirmar-cita.html',
})
export class DialogErrorConfirmarCitaComponent {}
