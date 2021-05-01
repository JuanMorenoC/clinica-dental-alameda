import { Component, OnInit } from '@angular/core';
import {formatDate} from '@angular/common';

@Component({
  selector: 'app-agenda',
  templateUrl: './agenda.component.html',
  styleUrls: ['./agenda.component.css']
})
export class AgendaComponent implements OnInit {
  dateActual = Date.now();
  dateF = new Date(Date.now());
  dateF2 = this.dateF.toString();
  fechaCAL = Object.values('Saturday, April 17, 2021');

  currentYear = new Date().getFullYear();
  currentDate = new Date();
  minDate = new Date(this.currentDate);
  maxDate = new Date(this.currentYear + 0, 11, 31);

  agenda = {
    agenda1: {
      hora: '7:30 a.m.',
      nombre: 'juan david',
      estado: 'confirmado',
      fecha: 'Saturday, April 17, 2021',
    },
    agenda2: {
      hora: '8:30 a.m.',
      nombre: 'lina',
      estado: 'cancelado',
      fecha: 'Saturday, April 17, 2021',
    },
    agenda3: {
      hora: '10:30 a.m.',
      nombre: 'valeria',
      estado: 'reservado',
      fecha: 'Saturday, April 18, 2021',
    }
  };

  dataAgenda = Object.values(this.agenda);
  fechaC = Number(this.agenda.agenda1.fecha);

  constructor() {
    console.log(typeof this.agenda.agenda1.fecha);
    console.log(typeof this.dataAgenda);
    console.log("dataagenda:  ", this.dataAgenda);
    console.log(typeof this.fechaC);
    console.log(typeof this.agenda);
    console.log(typeof this.currentDate);
    console.log("currentDate:  ", this.currentDate);
  }
  ngOnInit(): void {
  }

}
