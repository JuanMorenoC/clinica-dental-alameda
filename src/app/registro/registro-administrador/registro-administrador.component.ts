import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormControl, FormGroup, Validators} from '@angular/forms';
import  { AdministradorService } from '../../Service/administrador/administrador.service';

@Component({
  selector: 'app-registro-administrador',
  templateUrl: './registro-administrador.component.html',
  styleUrls: ['./registro-administrador.component.css']
})
export class RegistroAdministradorComponent implements OnInit {
  form: FormGroup | any;
  data = [];
  mostrar: any = false;
  constructor(private fb: FormBuilder, private administradorService: AdministradorService) {
    this.initEditForm();
  }

  ngOnInit(): void {
    this.builForm();
  }

  private builForm(){
    this.form = this.fb.group({
      id: ['', [Validators.required]],
      nombre: ['', [Validators.required]],
      apellido: ['', [Validators.required]],
      email: ['', [Validators.required, Validators.email]],
      usuario: ['', [Validators.required]],
      contrasena: ['', [Validators.required]],
    });

    // this.form.valueChanges.pipe(debounceTime(500)).subscribe((value: any) => {
    // console.log(value);});
  }

  initEditForm(): void{
    this.form = this.fb.group({
      id: new FormControl(),
      nombre: new FormControl(),
      apellido: new FormControl(),
      email: new FormControl(),
      usuario: new FormControl(),
      contrasena: new FormControl(),
    });
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

  agregarAdministrador(): void {
    this.mostrar = true;
    this.administradorService.addAdministrador(this.form.value).subscribe( (data: any) => {
      console.log('agregado');
      console.log(data);
    });
  }

}
