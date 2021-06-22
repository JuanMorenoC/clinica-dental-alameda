import {
  Component,
  ChangeDetectionStrategy,
  OnInit
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
import { AgendaService } from '../../Service/agenda/agenda.service';
import {RoleService} from '../../Service/role/role.service';
import {ProcedimientoService} from '../../Service/procedimiento/procedimiento.service';
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
    public hora: string
  ) {}
}

@Component({
  selector: 'app-registro-cita',
  templateUrl: './registro-cita.component.html',
  styleUrls: ['./registro-cita.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  providers: [{ provide: MatFormFieldControl, useExisting: RegistroCitaComponent }]
})
export class RegistroCitaComponent implements MatFormFieldControl<Cita>, OnInit{
  public listahoras: Array<any> = [];
  public odontologo: any[] = [];
  public paciente: any[] = [];
  // public odontologo: object = [];
  // public paciente: object = [];
  public horas: string[] = ['08:00', '08:30', '09:00', '09:30', '10:00', '10:30',
    '11:00', '11:30', '12:00', '12:30', '13:00', '13:30', '14:00', '14:30', '15:00', '15:30',
    '16:00', '16:30'];
  public horasMostrar: string[] = ['08:00 a.m.', '08:30 a.m.', '09:00 a.m.', '09:30 a.m.',
    '10:00 a.m.', '10:30 a.m.', '11:00 a.m.', '11:30 a.m.', '12:00 p.m.', '12:30 p.m.',
    '13:00 p.m.', '13:30 p.m.', '14:00 p.m.', '14:30 p.m.', '15:00 p.m.', '15:30 p.m.',
    '16:00 p.m.', '16:30 p.m.'];
  constructor(private fb: FormBuilder,
              private usuarioService: UsuarioService,
              private citaService: CitaService,
              private agendaService: AgendaService,
              private rolService: RoleService,
              private procedimientoService: ProcedimientoService,
              public dialog: MatDialog) {
  }
  private currentYear = new Date().getFullYear();
  private currentDate = new Date();
  minDate = new Date(this.currentDate);
  maxDate = new Date(this.currentYear + 0, 11, 31);

  form: FormGroup | any;
  data: any = [];
  mostrar: any = false;

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
    });

    console.log(typeof this.form.get('hora'));
    console.log(typeof this.form);
  }
  cargarData(): void{
    this.usuarioService.getAllUsuario().subscribe((datoId: any) => {
      let idencontrado = false;
      for (let i = 0 ; i < datoId.length ; i ++){
        if (this.form.value.id === datoId[i].cedula){
          idencontrado = true;
          break;
        }
      }
      if (idencontrado === false){
        this.dialog.open(DialogErrorRegistroCitaComponent);
      } else {
        this.usuarioService.getUsuario(this.form.value.id).subscribe( data => {
          console.log(data);
          this.data = data;
          console.log(this.data);
          this.form.patchValue({
            nombre: this.data.nombre,
            apellido: this.data.apellido,
            email: this.data.correo,
          });
        });
      }
    });
  }
  crearData(): void {
    this.citaService.getAllCita().subscribe((datacall: any) => {
      let idencontrado = false;
      let diaHoy = 0;
      let diaCita = 0;
      let mesHoy = 0;
      let mesCita = 0;
      let fechaHoy = '';
      let fechaCita = '';
      let fechaO = '';
      let fechaF = '';
      for (let i = 0 ; i < datacall.length ; i ++){
        if (this.form.value.id === datacall[i].paciente.cedula) {
          fechaF = String(new Date(datacall[i].fecha_cita).toISOString());
          fechaO = String(new Date().toISOString());
          fechaHoy = String(new Date(this.form.value.fechacita).toLocaleDateString()).substr(0, 10);
          fechaCita = String(new Date(datacall[i].fecha_cita).toLocaleDateString()).substr(0, 10);
          diaHoy = Number(String(new Date(fechaO).getDate()));
          diaCita = Number(String(new Date(fechaF).getDate()));
          mesHoy = Number(String(new Date(fechaO).getMonth() + 1));
          mesCita = Number(String(new Date(fechaF).getMonth() + 1));
          if (mesHoy < mesCita){
            idencontrado = true;
            break;
          } else {
            if (diaHoy < diaCita && mesHoy === mesCita) {
              idencontrado = true;
              break;
            } else {
              if (fechaCita === fechaHoy){
                idencontrado = true;
                break;
              } else {
                break;
              }
            }
          }
        }
      }
      if (idencontrado === true){
        this.dialog.open(DialogErrorCitaRegistroCitaComponent);
      } else {
        this.mostrar = true;
        console.log('creardata');
        console.log(this.form.value.fechacita.getFullYear());
        console.log(typeof this.form.value);
        this.procedimientoService.getAllProcedimiento().subscribe((datapp: any) => {
          let procedimiento = {
            // idProcedimiento: datapp.length + 1,
            tipo: this.form.value.tipoespecialidad
          };
          this.procedimientoService.addProcedimiento(procedimiento).subscribe((datap: any) => {
            this.procedimientoService.getAllProcedimiento().subscribe((datapall: any) => {
              console.log('AGREGO PROCEDIMIENTO');
              this.rolService.getAllRol().subscribe((datar: any) => {
                console.log('SANDWICH ROL USUARIO');
                this.usuarioService.getAllUsuario().subscribe((datau: any) => {
                  console.log('RECORRER ROL USUARIO');
                  console.log(datau);
                  console.log(datar);
                  for (let i = 0; i < datar.length ; i++){
                    console.log('CONTEO u');
                    for (const item of datau) {
                      console.log('CONTEO r');
                      if (this.form.value.id === item.cedula && datar[i].nombre === 'paciente'){
                        this.paciente.push(item.cedula);
                        this.paciente.push(item.nombre);
                        this.paciente.push(item.apellido);
                        this.paciente.push(item.seudonimo);
                        this.paciente.push(item.tipo_identificacion);
                        this.paciente.push(item.correo);
                        this.paciente.push(item.clave);
                        this.paciente.push(String(item.fecha_nacimiento));
                        this.paciente.push(item.celular);
                        this.paciente.push(item.ciudad);
                        this.paciente.push(item.departamento);
                        this.paciente.push(item.pais);
                        console.log('CEDULA U PACIENTE');
                        console.log(item.cedula);
                        console.log('CEDULA R PACIENTE');
                        console.log(datar[i].cedula);
                        console.log(this.paciente);
                      }
                      if (datar[i].cedula === item.cedula && datar[i].nombre === 'odontologo'){
                        this.odontologo.push(item.cedula);
                        this.odontologo.push(item.nombre);
                        this.odontologo.push(item.apellido);
                        this.odontologo.push(item.seudonimo);
                        this.odontologo.push(item.tipo_identificacion);
                        this.odontologo.push(item.correo);
                        this.odontologo.push(item.clave);
                        this.odontologo.push(String(item.fecha_nacimiento));
                        this.odontologo.push(item.celular);
                        this.odontologo.push(item.ciudad);
                        this.odontologo.push(item.departamento);
                        this.odontologo.push(item.pais);
                        console.log('CEDULA U ODONTOLOGO');
                        console.log(item.cedula);
                        console.log('CEDULA R ODONTOLOGO');
                        console.log(datar[i].cedula);
                        console.log(this.odontologo);
                      }
                    }
                  }
                  console.log('ARRAY');
                  console.log(this.paciente);
                  console.log(this.odontologo);
                  this.citaService.getAllCita().subscribe( (dataAll: any) => {
                    let cantidadCita = 0;
                    cantidadCita = dataAll.length;
                    let dataCita = {
                      // idCita: cantidadCita + 1,
                      estado: 'pendiente',
                      hora: this.form.value.hora,
                      fecha_cita: this.form.value.fechacita,
                      descripcion: '',
                      paciente: {
                        cedula: this.paciente[0],
                        nombre: this.paciente[1],
                        apellido: this.paciente[2],
                        seudonimo: this.paciente[3],
                        tipo_identificacion: this.paciente[4],
                        correo: this.paciente[5],
                        clave: this.paciente[6],
                        fecha_nacimiento: this.paciente[7],
                        celular: this.paciente[8],
                        ciudad: this.paciente[9],
                        departamento: this.paciente[10],
                        pais: this.paciente[11]
                      },
                      odontologo: {
                        cedula: this.odontologo[0],
                        nombre: this.odontologo[1],
                        apellido: this.odontologo[2],
                        seudonimo: this.odontologo[3],
                        tipo_identificacion: this.odontologo[4],
                        correo: this.odontologo[5],
                        clave: this.odontologo[6],
                        fecha_nacimiento: this.odontologo[7],
                        celular: this.odontologo[8],
                        ciudad: this.odontologo[9],
                        departamento: this.odontologo[10],
                        pais: this.odontologo[11]
                      },
                      procedimiento: {
                        idProcedimiento: datapall.length,
                        tipo: this.form.value.tipoespecialidad
                      }
                    };
                    console.log('OBJECT DATA CITA')
                    console.log(dataCita);
                    console.log('ANTES DE AÑADIR CITA');
                    this.citaService.addCita(dataCita).subscribe( (data: any) => {
                      console.log('CITA AGREGARADA');
                      console.log(data);
                      this.dialog.open(DialogRegistroCitaComponent);
                      window.location.reload();
                    });
                    // this.crearDataAgenda();
                  });
                });
              });
            });
          });
        });
      }
    });
  }
  crearDataAgenda(): void{
    let cantidadAgenda = 0;
    this.agendaService.getAgenda().subscribe((dataAgendaAll: any) => {
      cantidadAgenda = dataAgendaAll.length;
      console.log('cantiad all agenda');
      console.log(dataAgendaAll.length);
      console.log('cantiad agenda');
      console.log(cantidadAgenda);
      let dataAgenda = {
        id: cantidadAgenda + 1,
        idusuario: this.form.value.id,
        hora: this.form.value.hora,
        nombre: this.form.value.nombre + ' ' + this.form.value.apellido,
        estado: 'Pendiente',
        fechacita: this.form.value.fechacita,
        odontologo: 'Ninguno'
      };
      this.agendaService.addAgenda(dataAgenda).subscribe((dataAgendaAgregar: any) => {
        console.log(dataAgendaAgregar);
      });
    });
  }
  capturar(): void {
    console.log('ENTRO A CAPTURAR');
    this.listahoras = [];
    let fechaactual = '';
    let fechacita = '';
    this.citaService.getAllCita().subscribe((data: any) => {
      for (let i = 0 ; i < this.horas.length ; i++){
        let encontro = 0;
        for (let j = 0; j < data.length; j++) {
          fechaactual = String(new Date(this.form.value.fechacita).toISOString().replace(/T.*$/, '')) + 'T' + '00:00:00';
          console.log(fechaactual);
          console.log(data[j].fecha_cita);
          console.log(typeof data[j].fecha_cita);
          fechacita = String(new Date(data[j].fecha_cita).toISOString().replace(/T.*$/, '')) + 'T' + '00:00:00';
          console.log(fechacita);
          console.log(data[j].hora);
          console.log(typeof data[j].hora);
          if (this.horas[i] === data[j].hora && fechaactual.substr(0, 10) === fechacita.substr(0, 10)){
            encontro = 1;
            console.log('ENTRO ULTIMO' + i);
          }
        }
        if (encontro === 0){
          this.listahoras.push(this.horasMostrar[i]);
        }
      }

    });
  }

  onContainerClick(event: MouseEvent): void {
  }

  setDescribedByIds(ids: string[]): void {
  }
}

@Component({
  selector: 'app-dialog-registro-cita',
  templateUrl: 'dialog-registro-cita.html',
})
export class DialogRegistroCitaComponent {}

@Component({
  selector: 'app-dialog-error-registro-cita',
  templateUrl: 'dialog-error-registro-cita.html',
})
export class DialogErrorRegistroCitaComponent {}

@Component({
  selector: 'app-dialog-error-cita-registro-cita',
  templateUrl: 'dialog-error-cita-registro-cita.html',
})
export class DialogErrorCitaRegistroCitaComponent {}
