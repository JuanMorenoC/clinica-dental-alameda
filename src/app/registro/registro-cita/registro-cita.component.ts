import {ChangeDetectionStrategy, Component, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, Validators, FormControl} from '@angular/forms';
import { MatFormFieldControl } from '@angular/material/form-field';
import { UsuarioService, Usuario } from '../../Service/usuario/usuario.service';
import { CitaService } from '../../Service/cita/cita.service';
import { AgendaService } from '../../Service/agenda/agenda.service';

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
  data: any = [];
  mostrar: any = false;
  // dataUsuario: Usuario[] = [];
  constructor(private fb: FormBuilder, private usuarioService: UsuarioService, private citaService: CitaService, private agendaService: AgendaService) {
    this.initEditForm();
  }
  ngOnInit(): void {
    this.builForm();
    // this.dataUsuario = this.usuarioServicio.getUsuario();
  }
  initEditForm(): void{
    this.form = this.fb.group({
      id: new FormControl(),
      nombre: new FormControl(),
      apellido: new FormControl(),
      email: new FormControl(),
      tipo_consulta: new FormControl(),
      odontologo: new FormControl(),
      fecha_cita: new FormControl(),
      hora: new FormControl(),
    });
  }
  private builForm(): void{
    this.form = this.fb.group({
      id: ['', [Validators.required]],
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

    // this.form.valueChanges.pipe(debounceTime(500)).subscribe((value: any) => {
      // console.log(value);});
  }
  cargarData(): void{
    this.usuarioService.getUsuario(Number(this.form.value.id)).subscribe( data => {
      console.log(data);
      this.data = data;
      console.log(this.data);
      this.form.patchValue({
        nombre: this.data.nombre,
        apellido: this.data.apellido,
        email: this.data.email,
      });
    });
  }
  crearData(): void {
    this.mostrar = true;
    console.log('creardata');
    console.log(this.form.value.fecha_cita.getFullYear());
    console.log(typeof this.form.value);
    this.citaService.addCita(this.form.value).subscribe( (data: any) => {
      console.log(data);
    });
    this.crearDataAgenda();
  }
  crearDataAgenda(): void{
    let cantidadAgenda = 0;
    this.agendaService.getAgenda().subscribe((dataAgendaAll: any) =>{
      cantidadAgenda = dataAgendaAll.length;
      console.log('cantiad all agenda');
      console.log(dataAgendaAll.length);
      console.log('cantiad agenda');
      console.log(cantidadAgenda);
      let dataAgenda = {
        id: cantidadAgenda + 1,
        hora: this.form.value.hora,
        nombre: this.form.value.nombre,
        estado: 'Confirmado',
        fecha_cita: this.form.value.fecha_cita
      };
      this.agendaService.addAgenda(dataAgenda).subscribe((dataAgendaAgregar: any) => {
        console.log(dataAgendaAgregar);
      });
    });
    /*console.log('cantiad agenda');
    console.log(cantidadAgenda);
    let dataAgenda = {
      id: cantidadAgenda + 1,
      hora: this.form.value.hora,
      nombre: this.form.value.nombre,
      estado: 'Confirmado',
      fecha_cita: this.form.value.fecha_cita
    };
    this.agendaService.addAgenda(dataAgenda).subscribe((dataAgendaAgregar: any) => {
      console.log(dataAgendaAgregar);
    });*/
  }
  actualizarData(): void{
    this.usuarioService.updateUsuario(this.form.value).subscribe( (data: any) => {
      console.log(data);
    });
  }
  editarCampos(datos: any []) {
    for (const i of datos){
      this.form.value.nombre = i.nombre;
      this.form.value.apellido = i.apellido;
      this.form.value.email = i.email;
    }
  }

  registrarCita(event: Event): void{
    event.preventDefault();
    if (this.form.valid){
      const value = this.form.value;
      console.log(value);
    } else {
      this.form.markAllAsTouched();
    }
  }

  buscarCita(rut: string): void {
    /*for (const iter of this.dataUsuario){
      if (rut === iter.rut){
        this.form.patchValue({
          nombre: iter.nombre,
          apellido: iter.apellido,
          email: iter.email,
        });
      }
    }*/
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
