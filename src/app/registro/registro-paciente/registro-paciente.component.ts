import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import { debounceTime } from 'rxjs/operators';

@Component({
  selector: 'app-registro-paciente',
  templateUrl: './registro-paciente.component.html',
  styleUrls: ['./registro-paciente.component.css']
})
export class RegistroPacienteComponent implements OnInit {
  form: FormGroup | any;
  dataUsuario = [];
  constructor(private formBuilder: FormBuilder) {
    this.builForm();
  }

  ngOnInit(): void {
  }

  private builForm(): void{
    this.form = this.formBuilder.group({
      rut: ['', [Validators.required]],
      nombre: ['', [Validators.required]],
      apellido: ['', [Validators.required]],
      email: ['', [Validators.required, Validators.email]],
      telefono: ['', [Validators.required]],
      celular: [''],
      fecha_nacimiento: ['', [Validators.required]],
      direccion: ['', [Validators.required]],
    });

    // this.form.valueChanges.pipe(debounceTime(500)).subscribe((value: any) => {
    // console.log(value);});
  }

  registrarPaciente(event: Event): void{
    event.preventDefault();
    // @ts-ignore
    if (this.form.valid){
      // @ts-ignore
      const value = this.form.value;
      // @ts-ignore
      this.dataUsuario.push(this.form.value);
      this.dataUsuario = [...this.dataUsuario];
      console.log(value);
      console.log();
      console.log(this.dataUsuario);
    } else {
      // @ts-ignore
      this.form.markAllAsTouched();
    }
  }

}
