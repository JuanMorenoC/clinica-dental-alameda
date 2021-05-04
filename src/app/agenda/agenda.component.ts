import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormGroup} from '@angular/forms';

@Component({
  selector: 'app-agenda',
  templateUrl: './agenda.component.html',
  styleUrls: ['./agenda.component.css']
})
export class AgendaComponent implements OnInit {

  constructor(private fb: FormBuilder) {
  }
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
      fecha: new Date('2021/04/30'),
    },
    agenda2: {
      hora: '8:30 a.m.',
      nombre: 'lina',
      estado: 'cancelado',
      fecha: new Date('2021/04/30'),
    },
    agenda3: {
      hora: '10:30 a.m.',
      nombre: 'valeria',
      estado: 'reservado',
      fecha: new Date('2021/05/01'),
    }
  };

  dataAgenda = Object.values(this.agenda);
  public form: FormGroup | any;
  arregloFecha = {
    fecha: new Date()
  };
  dataFecha = Object.values(this.arregloFecha);
  ngOnInit(): void {
    console.log(typeof this.agenda.agenda1.fecha);
    console.log(typeof this.dataAgenda);
    console.log('dataagenda:  ', this.dataAgenda);
    console.log(typeof this.agenda);
    console.log(typeof this.currentDate);
    console.log('currentDate:  ', this.currentDate);
    // console.log("form: ", this.form.value.fecha);
    // console.log("form: ", typeof this.form.value.fecha);

    this.form = this.fb.group({
      fecha: [''],
    });
  }
  comparar(event: Event): void {
    const f = this.form.get('fecha');
    event.preventDefault();
    if (this.form.valid){
      const value = this.form.value;
      console.log(value);
    }
  }
}
