import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators, FormControl } from '@angular/forms';
import { UsuarioService } from '../../Service/usuario/usuario.service';
import { debounceTime } from 'rxjs/operators';

@Component({
  selector: 'app-registro-paciente',
  templateUrl: './registro-paciente.component.html',
  styleUrls: ['./registro-paciente.component.css']
})
export class RegistroPacienteComponent implements OnInit {
  form: FormGroup | any;
  data = [];
  mostrar: any = false;
  constructor(private fb: FormBuilder, private usuarioService: UsuarioService) {
    this.initEditForm();
  }

  ngOnInit(): void {
    this.builForm();
  }

  initEditForm(): void{
    this.form = this.fb.group({
      rut: new FormControl(),
      nombre: new FormControl(),
      apellido: new FormControl(),
      email: new FormControl(),
      telefono: new FormControl(),
      celular: new FormControl(),
      fecha_nacimiento: new FormControl(),
      direccion: new FormControl(),
    });
  }

  private builForm(): void{
    this.form = this.fb.group({
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
  onThirdFormSubmit(): void {
    this.mostrar = true;
    this.usuarioService.addUsuario(this.form.value).subscribe( (data: any) => {
      console.log(data);
    });
  }
}
