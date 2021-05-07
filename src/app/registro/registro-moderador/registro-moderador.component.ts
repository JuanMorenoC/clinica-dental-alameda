import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormControl, FormGroup, Validators} from '@angular/forms';
import { ModeradorService } from '../../Service/moderador/moderador.service';

@Component({
  selector: 'app-registro-moderador',
  templateUrl: './registro-moderador.component.html',
  styleUrls: ['./registro-moderador.component.css']
})
export class RegistroModeradorComponent implements OnInit {
  form: FormGroup | any;
  data = [];
  mostrar: any = false;
  constructor(private fb: FormBuilder, private moderadorService: ModeradorService) {
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
  registrarModerador(event: Event){
    event.preventDefault();
    if (this.form.valid){
      const value = this.form.value;
      console.log(value);
    } else {
      this.form.markAllAsTouched();
    }
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
  agregarModerador(): void {
    this.mostrar = true;
    this.moderadorService.addModerador(this.form.value).subscribe( (data: any) => {
      console.log('agregado');
      console.log(data);
    });
  }

}
