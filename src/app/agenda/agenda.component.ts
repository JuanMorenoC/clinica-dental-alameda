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
    });
  }
}


