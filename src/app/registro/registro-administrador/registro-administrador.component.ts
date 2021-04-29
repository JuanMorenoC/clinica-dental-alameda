import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';

@Component({
  selector: 'app-registro-administrador',
  templateUrl: './registro-administrador.component.html',
  styleUrls: ['./registro-administrador.component.css']
})
export class RegistroAdministradorComponent implements OnInit {
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
      usuario: ['', [Validators.required]],
      contrasena: ['', [Validators.required]],
    });

    //this.form.valueChanges.pipe(debounceTime(500)).subscribe((value: any) => {
    //console.log(value);});
  }

  registrarAdministrador(event: Event){
    event.preventDefault();
    if (this.form.valid){
      const value = this.form.value;
      console.log(value);
    } else {
      this.form.markAllAsTouched();
    }
  }

}
