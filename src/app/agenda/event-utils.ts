import { EventInput } from '@fullcalendar/angular';
import { AgendaService } from '../Service/agenda/agenda.service';
import {Subscription} from 'rxjs';

let eventGuid = 0;
const TODAY_STR = new Date().toISOString().replace(/T.*$/, ''); // YYYY-MM-DD of today
// export let INITIAL_EVENTS: Subscription = [];
/*
export const INITIAL_EVENTS: EventInput[] = [
  {
    id: createEventId(),
    title: 'All-day event',
    start: TODAY_STR
  },
  {
    id: createEventId(),
    title: 'Timed event',
    start: TODAY_STR + 'T12:00:00'
  },
  {
    id: createEventId(),
    title: 'Timed event',
    start: TODAY_STR + 'T08:00:00'
  },
  {
    id: createEventId(),
    title: 'Timed event',
    start: TODAY_STR + 'T16:15:00'
  },
  {
    id: createEventId(),
    title: 'Juan Moreno',
    start: '2021-05-09' + 'T08:15:00',
    color: 'green'
  }
];
*/
export function createEventId(): string {
  return String(eventGuid++);
}

function constructor(agendaService: AgendaService): void {
  let dataAgenda: any[] = [];
  agendaService.getAgenda().subscribe((data: any) => {
    // tslint:disable-next-line:prefer-for-of
    for (let i = 0 ; i < data.length ; i++){
      dataAgenda = [{
        id: data[i].id,
        title: String(data[i].nombre),
        start: String(new Date(data[i].fecha_cita).toISOString().replace(/T.*$/, '')) + 'T' + String(data[i].hora) + ':00',
        // start: '2021-05-09' + 'T08:15:00',
        color: obtenerColor(data, i)
      }];
    }
  });
}
export function obtenerColor(data: any, n: number): string {
  let color = '';
  if (data[n].estado === 'Sala espera'){
    color = 'yellow';
  }
  if (data[n].estado === 'Cancelado'){
    color = 'gray';
  }
  if (data[n].estado === 'Pendiente'){
    color = 'red';
  }
  if (data[n].estado === 'Confirmado'){
    color = 'purple';
  }
  if (data[n].estado === 'Esta en el Box'){
    color = 'green';
  }
  return color;
}
