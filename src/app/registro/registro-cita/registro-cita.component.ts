import {ChangeDetectionStrategy, Component, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, Validators, FormControl} from '@angular/forms';
import { MatFormFieldControl } from '@angular/material/form-field';


@Component({
  selector: 'app-registro-cita',
  templateUrl: './registro-cita.component.html',
  styleUrls: ['./registro-cita.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class RegistroCitaComponent implements OnInit {
  // @ts-ignore
  ctrl = new FormControl('', (control: FormControl) => {
    const value = control.value;

    if (!value) {
      return null;
    }

    if (value.hour < 7) {
      return {tooEarly: true};
    }
    if (value.hour > 19) {
      return {tooLate: true};
    }

    return null;
  });

  private currentYear = new Date().getFullYear();
  private currentDate = new Date();
  minDate = new Date(this.currentDate);
  maxDate = new Date(this.currentYear + 0, 11, 31);

  form: FormGroup | any;
  constructor(private formBuilder: FormBuilder) {
    this.builForm();
  }
  ngOnInit(): void {
  }
  private builForm(){
    this.form = this.formBuilder.group({
      rut: ['', [Validators.required]],
      nombre: ['', [Validators.required]],
      apellido: ['', [Validators.required]],
      email: ['', [Validators.required, Validators.email]],
      tipo_consulta: ['', [Validators.required]],
      odontologo: ['', [Validators.required]],
      fecha_cita: ['', [Validators.required]],
      hora: ['', [Validators.required]],
    });

    console.log(typeof this.form.get('hora'));
    console.log(typeof this.form);

    //this.form.valueChanges.pipe(debounceTime(500)).subscribe((value: any) => {
      //console.log(value);});
  }

  registrarCita(event: Event){
    event.preventDefault();
    if (this.form.valid){
      const value = this.form.value;
      console.log(value);
    } else {
      this.form.markAllAsTouched();
    }
  }

  /*compararTiempo({hora}: { hora: any }) {
    const tiempo1 = new Date("2021/03/18 07:00:00");
    const tiempo2 = new Date("2021/03/18 19:00:00");

    console.log(typeof hora);
    console.log(hora);
    console.log(typeof tiempo1);
    console.log(tiempo1.getHours());

    if (hora > tiempo1 &&  hora < tiempo2){
      return false;
    } else {
      return true;
    }
  }*/

}
