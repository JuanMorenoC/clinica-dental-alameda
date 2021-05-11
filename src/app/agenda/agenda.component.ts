import { Component, OnInit } from '@angular/core';
import { AgendaService } from '../Service/agenda/agenda.service';

@Component({
  selector: 'app-agenda',
  templateUrl: './agenda.component.html',
  styleUrls: ['./agenda.component.css']
})
export class AgendaComponent implements OnInit {
  constructor(private agendaService: AgendaService) {
  }
  ngOnInit(): void {
  }
  cargarData(): void{
    this.agendaService.getAgenda().subscribe((data: any) => {
      console.log(data);
      // console.log(data);
      this.listaAgenda = data;
    });
  }

  obtenerColor(data: EventInput, n: number): string {
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
}


