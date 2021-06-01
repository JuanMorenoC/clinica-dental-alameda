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
import {Observable} from 'rxjs';
import {MatDialog} from '@angular/material/dialog';
import {DialogErrorRegistroPacienteComponent} from '../registro-paciente/registro-paciente.component';
import {MatDatepickerInputEvent} from '@angular/material/datepicker';

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
              public dialog: MatDialog) {
    /*
    let fechaactual = '';
    let fechacita = '';
    let encontro = 0;
    this.citaService.getAllCita().subscribe((data: any) => {
      for(let i = 0 ; i < this.horas.length ; i++){
        for (let j = 0; j < data.length; j++) {
          fechaactual = String(new Date(this.form.value.fechacita).toISOString().replace(/T.*$/, ''));
          fechacita = String(new Date(data[i].fechacita).toISOString().replace(/T.*$/, ''));
          if(this.horas[i] === data[j].hora && fechaactual === fechacita){
            encontro = 1;
          }
        }
        if (encontro === 0){
          this.listahoras.push(this.horasMostrar[i]);
        }
      }

    });
     */
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
        if (this.form.value.id === datoId[i].id){
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
            email: this.data.email,
          });
        });
      }
    });
  }
  crearData(): void {
    this.usuarioService.getAllUsuario().subscribe((datoId: any) => {
      let idencontrado = false;
      for (let i = 0 ; i < datoId.length ; i ++){
        if (this.form.value.id === datoId[i].id){
          idencontrado = true;
          break;
        }
      }
      if (idencontrado === false){
        this.dialog.open(DialogErrorRegistroCitaComponent);
      } else {
        this.mostrar = true;
        console.log('creardata');
        console.log(this.form.value.fechacita.getFullYear());
        console.log(typeof this.form.value);
        let cantidadCita = 0;
        this.citaService.getAllCita().subscribe( (dataAll: any) => {
          cantidadCita = dataAll.length;
          let dataCita = {
            id: cantidadCita + 1,
            idusuario: this.form.value.id,
            nombre: this.form.value.nombre,
            apellido: this.form.value.apellido,
            email: this.form.value.email,
            tipoespecialidad: this.form.value.tipoespecialidad,
            fechacita: this.form.value.fechacita,
            hora: this.form.value.hora,
          };
          this.citaService.addCita(dataCita).subscribe( (data: any) => {
            console.log(data);
          });
          this.crearDataAgenda();
          this.dialog.open(DialogRegistroCitaComponent);
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
  actualizarData(): void{
    let cantidadCita = 0;
    let id = 0;
    this.citaService.getAllCita().subscribe( (dataAll: any) => {
      for (let i = 0; i < dataAll.length ; i++) {
        if (this.form.value.id === dataAll[i].idusuario){
          id = dataAll[i].id;
        }
      }
      cantidadCita = dataAll.length;
      let dataCitaAct = {
        id: id,
        idusuario: this.form.value.id,
        nombre: this.form.value.nombre,
        apellido: this.form.value.apellido,
        email: this.form.value.email,
        tipoespecialidad: this.form.value.tipoespecialidad,
        fechacita: this.form.value.fechacita,
        hora: this.form.value.hora,
      };
      this.usuarioService.updateUsuario(dataCitaAct).subscribe( (data: any) => {
        console.log(data);
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
          console.log(data[j].fechacita);
          console.log(typeof data[j].fechacita);
          fechacita = String(new Date(data[j].fechacita).toISOString().replace(/T.*$/, '')) + 'T' + '00:00:00';
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
