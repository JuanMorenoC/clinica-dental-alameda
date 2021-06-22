import { Component, OnInit, ChangeDetectionStrategy, ViewChild,
  TemplateRef, Input, ViewEncapsulation } from '@angular/core';
import { AgendaService } from '../Service/agenda/agenda.service';
import { UsuarioService } from '../Service/usuario/usuario.service';
import {RoleService} from '../Service/role/role.service';
import {CitaService} from '../Service/cita/cita.service';
import {
  CalendarEvent,
  CalendarEventAction,
  CalendarEventTimesChangedEvent,
  CalendarView,
} from 'angular-calendar';
import {
  startOfDay,
  endOfDay,
  subDays,
  addDays,
  endOfMonth,
  isSameDay,
  isSameMonth,
  addHours,
} from 'date-fns';
import { Subject } from 'rxjs';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import {
  FormBuilder,
  FormControl,
  FormGroup, NgControl
} from '@angular/forms';

const colors: any = {
  red: {
    primary: '#ad2121',
    secondary: '#FAE3E3',
  },
  gray: {
    primary: '#535454',
    secondary: '#b5b5b5',
  },
  yellow: {
    primary: '#e3bc08',
    secondary: '#fcf0c2',
  },
  purple: {
    primary: '#66189f',
    secondary: '#c4aaf5',
  },
  green: {
    primary: '#109b37',
    secondary: '#95f1c0',
  },
  black: {
    primary: '#000000',
    secondary: '#000000',
  },
};

@Component({
  selector: 'app-agenda',
  changeDetection: ChangeDetectionStrategy.OnPush,
  encapsulation: ViewEncapsulation.None,
  templateUrl: './agenda.component.html',
  styleUrls: ['./agenda.component.css']
})
export class AgendaComponent implements OnInit {
  @ViewChild('modalContent', { static: true }) private modalContent: TemplateRef<any> | undefined;

  view: CalendarView = CalendarView.Week;

  CalendarView = CalendarView;

  viewDate: Date = new Date();

  public modalData: {
    action: string;
    event: CalendarEvent;
  } | undefined;

  actions: CalendarEventAction[] = [
    {
      label: '<i class="fas fa-fw fa-pencil-alt"></i>',
      a11yLabel: 'Edit',
      onClick: ({ event }: { event: CalendarEvent }): void => {
        this.handleEvent('Edited', event);
      },
    },
    {
      label: '<i class="fas fa-fw fa-trash-alt"></i>',
      a11yLabel: 'Delete',
      onClick: ({ event }: { event: CalendarEvent }): void => {
        this.events = this.events.filter((iEvent) => iEvent !== event);
        this.handleEvent('Deleted', event);
      },
    },
  ];

  refresh: Subject<any> = new Subject();
  form: FormGroup | any;
  public listaOdontologo: any[] = [];
  public listaAgenda: any[] = [];
  public dataUsuario: any = [];
  events: CalendarEvent[] = [];

  @Input() hourSegmentHeight: number = 30;
  @Input() hourSegments: number = 2;
  @Input() dayStartHour: number = 8;
  @Input() dayStartMinute: number = 0;
  @Input() dayEndHour: number = 17;
  @Input() dayEndMinute: number = 0;

  activeDayIsOpen = true;

  constructor(private modal: NgbModal,
              private agendaService: AgendaService,
              private usuarioService: UsuarioService,
              private rolService: RoleService,
              private citaService: CitaService,
              private fb: FormBuilder) {
    this.rolService.getAllRol().subscribe((datar: any) => {
      console.log('ENTRO ROL');
      this.usuarioService.getAllUsuario().subscribe((datasO: any) => {
        console.log('ENTRO USUARIO');
        for (let j = 0; j < datar.length; j++) {
          console.log('ROL 1');
          for (const item of datasO) {
            console.log('USER 1');
            if (datar[j].cedula === item.cedula && datar[j].nombre === 'odontologo'){
              this.listaOdontologo.push(item.nombre + ' ' + item.apellido);
              console.log(this.listaOdontologo);
            }
          }
        }
        this.listaOdontologo.push('Todos');
        this.listaOdontologo.push('Ninguno');
        console.log(this.listaOdontologo);
        console.log(datasO);
      });
    });
    this.builForm();
    // this.cargarData();
  }
  initEditForm(): void{
    this.form = this.fb.group({
      odontologo: new FormControl(),
    });
  }
  private builForm(): void{
    this.form = this.fb.group({
      odontologo: [''],
    });
  }

  dayClicked({ date, events }: { date: Date; events: CalendarEvent[] }): void {
    if (isSameMonth(date, this.viewDate)) {
      if (
        (isSameDay(this.viewDate, date) && this.activeDayIsOpen === true) ||
        events.length === 0
      ) {
        this.activeDayIsOpen = false;
      } else {
        this.activeDayIsOpen = true;
      }
      this.viewDate = date;
    }
  }

  eventTimesChanged({
                      event,
                      newStart,
                      newEnd,
                    }: CalendarEventTimesChangedEvent): void {
    this.events = this.events.map((iEvent) => {
      if (iEvent === event) {
        return {
          ...event,
          start: newStart,
          end: newEnd,
        };
      }
      return iEvent;
    });
    this.handleEvent('Dropped or resized', event);
  }

  handleEvent(action: string, event: CalendarEvent): void {
    this.modalData = { event, action };
    this.modal.open(this.modalContent, { size: 'lg' });
  }

  addEvent(): void {
    this.events = [
      ...this.events,
      {
        title: 'New event',
        start: startOfDay(new Date()),
        end: endOfDay(new Date()),
        color: colors.red,
        draggable: true,
        resizable: {
          beforeStart: true,
          afterEnd: true,
        },
      },
    ];
  }

  deleteEvent(eventToDelete: CalendarEvent): void {
    this.events = this.events.filter((event) => event !== eventToDelete);
  }

  setView(view: CalendarView): void {
    this.view = view;
  }

  closeOpenMonthViewDay(): void {
    this.activeDayIsOpen = false;
  }
  ngOnInit(): void {
  }
  cargarData(): void{
    // this.cargarDataOdontologo();
    // this.cargarPrueba();
    if (this.form.value.odontologo === '' || this.form.value.odontologo === 'Todos') {
      console.log('ENTRO CARGAR DATA');
      this.cargarAllData();
    } else {
      console.log('cargar data kdjfksdjfjks');
      // this.cargarDataOdontologo();
      this.cargarPrueba();
    }
    /*
    let id: any[] = [];
    this.usuarioService.getAllUsuario().subscribe((data: any) => {
      id.push(data.id);
    });
     */
  }
  cargarAllData(): void {
    this.events = [];
    console.log('cargar data');
    this.citaService.getAllCita().subscribe((data: any) => {
      console.log(data);
      console.log('cedula paciente cita');
      for (const i of data) {
          const datosEventos = {
            start: new Date(String(new Date(i.fecha_cita).toISOString().replace(/T.*$/, '')) + 'T' + String(i.hora) + ':00'),
            end: new Date(String(new Date(i.fecha_cita).toISOString().replace(/T.*$/, '')) + 'T' + this.obtenerEndPrueba(i)),
            title: 'Paciente: ' + i.paciente.nombre  + ' ' + i.paciente.apellido + ' - Numero de Identificacion: ' + i.paciente.cedula,
            color: this.obtenerColorPrueba(i),
            resizable: {
              beforeStart: true,
              afterEnd: true,
            },
            draggable: true,
            cssClass: 'my-custom-class',
          };
          this.listaAgenda.push(datosEventos);
          this.events.push(datosEventos);
        debugger;
        console.log(this.events);
        console.log(this.listaAgenda);
        console.log('END HORA');
      }
    });
  }

  cargarPrueba(): void {
    this.events = [];
    console.log('cargar data');
    this.citaService.getAllCita().subscribe((data: any) => {
      console.log(data);
      console.log('cedula paciente cita');
      for (const i of data) {
        let odontologo = String(i.odontologo.nombre + ' ' + i.odontologo.apellido);
        if (odontologo === this.form.value.odontologo){
          const datosEventos = {
            start: new Date(String(new Date(i.fecha_cita).toISOString().replace(/T.*$/, '')) + 'T' + String(i.hora) + ':00'),
            end: new Date(String(new Date(i.fecha_cita).toISOString().replace(/T.*$/, '')) + 'T' + this.obtenerEndPrueba(i)),
            title: 'Paciente: ' + i.paciente.nombre  + ' ' + i.paciente.apellido + ' - Numero de Identificacion: ' + i.paciente.cedula,
            color: this.obtenerColorPrueba(i),
            resizable: {
              beforeStart: true,
              afterEnd: true,
            },
            draggable: true,
            cssClass: 'my-custom-class',
          };
          this.listaAgenda.push(datosEventos);
          this.events.push(datosEventos);
        }
        console.log(this.events);
        console.log(this.listaAgenda);
        console.log('END HORA');
      }
    });
  }

  obtenerColorPrueba(i: any): any {
    let color = '';
    if (i.estado === 'sala espera'){
      return colors.yellow;
    }
    if (i.estado === 'cancelado'){
      return colors.gray;
    }
    if (i.estado === 'pendiente'){
      return colors.red;
    }
    if (i.estado === 'confirmado'){
      return colors.purple;
    }
    if (i.estado === 'esta en el box'){
      return colors.green;
    }
    return color;

  }

  obtenerEndPrueba(i: any): string {
    console.log('HORA END EN OBTENER');
    let minuto = Number(i.hora.substr(3,4)) + 30;
    let hora = 0;
    if (minuto === 60){
      hora = Number(i.hora.substr(0,2)) + 1;
      if (hora < 10){
        console.log(hora + ':' + '00' + ':00');
        return '0' + hora + ':' + '00' + ':00';
      } else {
        console.log(hora + ':' + '00' + ':00');
        return hora + ':' + '00' + ':00';
      }
    } else {
      if (Number(i.hora.substr(0,2)) < 10){
        console.log(i.hora.substr(0,2) + ':' + String(Number(i.hora.substr(3,4)) + 30) + ':00');
        return i.hora.substr(0,2) + ':' + String(Number(i.hora.substr(3,4)) + 30) + ':00';
      } else {
        console.log(i.hora.substr(0,2) + ':' + String(Number(i.hora.substr(3,4)) + 30) + ':00');
        return i.hora.substr(0,2) + ':' + String(Number(i.hora.substr(3,4)) + 30) + ':00';
      }
    }
  }
}
