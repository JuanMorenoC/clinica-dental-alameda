import { Component, OnInit, ChangeDetectionStrategy, ViewChild,
  TemplateRef, Input, ViewEncapsulation } from '@angular/core';
import { AgendaService } from '../Service/agenda/agenda.service';
import { UsuarioService } from '../Service/usuario/usuario.service';
import { OdontologoService } from '../Service/odontologo/odontologo.service';
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
  public listaOdontologo: Array<any> = [];
  public listaAgenda: any[] = [];
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
              private odontologoService: OdontologoService,
              private fb: FormBuilder) {
    this.odontologoService.getAllOdontologo().subscribe((datasO: any) => {
      console.log(datasO);
      for (let i = 0; i < datasO.length ; i++) {
        this.listaOdontologo.push(datasO[i].nombre + ' ' + datasO[i].apellido);
      }
      this.listaOdontologo.push('Todos');
      this.listaOdontologo.push('Ninguno');
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
    if (this.form.value.odontologo === '' || this.form.value.odontologo === 'Todos') {
      console.log('ENTRO CARGAR DATA');
      this.cargarAllData();
    } else {
      if (this.form.value.odontologo === 'Ninguno') {
        this.cargarNingunoData();
      } else {
        this.cargarDataOdontologo();
      }
    }
    let id: any[] = [];
    this.usuarioService.getAllUsuario().subscribe((data: any) => {
      id.push(data.id);
    });
  }
  cargarAllData(): void {
    this.events = [];
    this.agendaService.getAgenda().subscribe((data: any) => {
      console.log(data);
      for (let i = 0; i < data.length; i++) {
        const datosEventos = {
          start: new Date(String(new Date(data[i].fechacita).toISOString().replace(/T.*$/, '')) + 'T' + String(data[i].hora) + ':00'),
          end: new Date(String(new Date(data[i].fechacita).toISOString().replace(/T.*$/, '')) + 'T' + this.obtenerEnd(data, i)),
          title: 'Paciente: ' + data[i].nombre + ' - Numero de Identificacion: ' + data[i].idusuario,
          color: this.obtenerColor(data, i),
          resizable: {
            beforeStart: true,
            afterEnd: true,
          },
          draggable: true,
          cssClass: 'my-custom-class',
        };
        this.listaAgenda.push(datosEventos);
        this.events.push(datosEventos);
        console.log(this.events);
        console.log(this.listaAgenda);
        console.log('HORA');
        console.log(data[i].hora);
        console.log(typeof data[i].hora);
        console.log(data[i].hora);
        console.log(data[i].hora.substr(0,2) + ':' + String(Number(data[i].hora.substr(3,4)) + 15) + ':00');
        console.log(this.obtenerEnd(data, i));
        console.log('END HORA');
      }
    });
  }
  cargarNingunoData(): void {
    this.events = [];
    this.agendaService.getAgenda().subscribe((data: any) => {
      console.log(data);
      for (let i = 0; i < data.length; i++) {
        if (data[i].odontologo === 'Ninguno'){
          const datosEventos = {
            start: new Date(String(new Date(data[i].fechacita).toISOString().replace(/T.*$/, '')) + 'T' + String(data[i].hora) + ':00'),
            end: new Date(String(new Date(data[i].fechacita).toISOString().replace(/T.*$/, '')) + 'T' + this.obtenerEnd(data, i)),
            title: 'Paciente: ' + data[i].nombre + ' - Numero de Identificacion: ' + data[i].idusuario,
            color: this.obtenerColor(data, i),
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
        console.log('HORA');
        console.log(data[i].hora);
        console.log(typeof data[i].hora);
        console.log(data[i].hora);
        console.log(data[i].hora.substr(0,2) + ':' + String(Number(data[i].hora.substr(3,4)) + 15) + ':00');
        console.log(this.obtenerEnd(data, i));
        console.log('END HORA');
      }
    });
  }
  cargarDataOdontologo(): void {
    this.events = [];
    this.agendaService.getAgenda().subscribe((data: any) => {
      console.log(data);
      for (let i = 0; i < data.length; i++) {
        if (data[i].odontologo === this.form.value.odontologo){
          const datosEventos = {
            start: new Date(String(new Date(data[i].fechacita).toISOString().replace(/T.*$/, '')) + 'T' + String(data[i].hora) + ':00'),
            end: new Date(String(new Date(data[i].fechacita).toISOString().replace(/T.*$/, '')) + 'T' + this.obtenerEnd(data, i)),
            title: 'Paciente: ' + data[i].nombre + ' - Numero de Identificacion: ' + data[i].idusuario,
            color: this.obtenerColor(data, i),
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
        console.log('HORA');
        console.log(data[i].hora);
        console.log(typeof data[i].hora);
        console.log(data[i].hora);
        console.log(data[i].hora.substr(0,2) + ':' + String(Number(data[i].hora.substr(3,4)) + 15) + ':00');
        console.log(this.obtenerEnd(data, i));
        console.log('END HORA');
      }
    });
  }

  obtenerColor(data: any, i: number): any {
    let color = '';
    if (data[i].estado === 'Sala espera'){
      return colors.yellow;
    }
    if (data[i].estado === 'Cancelado'){
      return colors.gray;
    }
    if (data[i].estado === 'Pendiente'){
      return colors.red;
    }
    if (data[i].estado === 'Confirmado'){
      return colors.purple;
    }
    if (data[i].estado === 'Esta en el Box'){
      return colors.green;
    }
    return color;

  }

  obtenerEnd(data: any, i: number): string {
    console.log('HORA END EN OBTENER');
    let minuto = Number(data[i].hora.substr(3,4)) + 30;
    let hora = 0;
    if (minuto === 60){
      hora = Number(data[i].hora.substr(0,2)) + 1;
      if (hora < 10){
        console.log(hora + ':' + '00' + ':00');
        return '0' + hora + ':' + '00' + ':00';
      } else {
        console.log(hora + ':' + '00' + ':00');
        return hora + ':' + '00' + ':00';
      }
    } else {
      if (Number(data[i].hora.substr(0,2)) < 10){
        console.log(data[i].hora.substr(0,2) + ':' + String(Number(data[i].hora.substr(3,4)) + 30) + ':00');
        return '0' + data[i].hora.substr(0,2) + ':' + String(Number(data[i].hora.substr(3,4)) + 30) + ':00';
      } else {
        console.log(data[i].hora.substr(0,2) + ':' + String(Number(data[i].hora.substr(3,4)) + 30) + ':00');
        return data[i].hora.substr(0,2) + ':' + String(Number(data[i].hora.substr(3,4)) + 30) + ':00';
      }
    }
  }
}
