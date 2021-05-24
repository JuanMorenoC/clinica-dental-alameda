import {ChangeDetectionStrategy, Component, OnInit} from '@angular/core';
import {FormBuilder, FormControl, FormGroup, NgControl, Validators} from '@angular/forms';
import {UsuarioService} from '../../Service/usuario/usuario.service';
import {MatFormFieldControl} from '@angular/material/form-field';
import {Observable} from 'rxjs';
import {Cita} from '../../registro/registro-cita/registro-cita.component';

/** Data structure for usuario. */
export class Usuario {
  constructor(
    public ide: string
  ) {}
}

@Component({
  selector: 'app-buscar-paciente',
  templateUrl: './buscar-paciente.component.html',
  styleUrls: ['./buscar-paciente.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  providers: [{ provide: MatFormFieldControl, useExisting: BuscarPacienteComponent }]
})
export class BuscarPacienteComponent implements OnInit, MatFormFieldControl<Usuario> {
  data: any = [];
  public listaPaciente: Array<any> = [];
  constructor(private fb: FormBuilder,
              private usuarioService: UsuarioService) { }

  form: FormGroup | any;
  public listaUsuario: any[] = [];
  public datosF = {};
  count = 0;
  public listaTitulo: Array<any> = [ 'Identificacion',
    'Tipo de Identificacion', 'Nombre', 'Apellido',
  'Email', 'Celular', 'Fecha de Nacimiento',
  'Direccion', 'Departamento', 'Ciudad'];
  public idet = 0;
  public tipoidentificacion = '';
  public nombre = '';
  public apellido = '';
  public email = '';
  public celular = '';
  public fechanacimiento = new Date();
  public direccion = '';
  public departamento = '';
  public ciudad = '';

  readonly autofilled: boolean | undefined;
  readonly controlType: string | undefined;
  // @ts-ignore
  readonly disabled: boolean | undefined;
  // @ts-ignore
  readonly empty: boolean | undefined;
  // @ts-ignore
  readonly errorState: boolean | undefined;
  // @ts-ignore
  readonly focused: boolean | undefined;
  // @ts-ignore
  readonly id: string | undefined;
  // @ts-ignore
  readonly ngControl: NgControl | null | undefined;

  // @ts-ignore
  readonly placeholder: string | undefined;
  // @ts-ignore
  readonly required: boolean | undefined;

  // @ts-ignore
  readonly shouldLabelFloat: boolean | undefined;
  // @ts-ignore
  readonly stateChanges: Observable<void> | undefined;
  readonly userAriaDescribedBy: string | undefined;
  // @ts-ignore
  value: Cita | null | undefined;

  ngOnInit(): void {
    this.builForm();
  }

  log(): void {
    this.count++;
    console.log('Clicked!');
  }

  initEditForm(): void{
    this.form = this.fb.group({
      id: new FormControl(),
      ident: new FormControl(),
      tipoidentificacion: new FormControl(),
      nombre: new FormControl(),
      apellido: new FormControl(),
      email: new FormControl(),
      celular: new FormControl(),
      fechanacimiento: new FormControl(),
      direccion: new FormControl(),
      departamento: new FormControl(),
      ciudad: new FormControl(),
    });
  }

  private builForm(): void{
    this.form = this.fb.group({
      id: [''],
      ident: [''],
      tipoidentificacion: [''],
      nombre: [''],
      apellido: [''],
      email: [''],
      celular: [''],
      fechanacimiento: [''],
      direccion: [''],
      departamento: [''],
      ciudad: [''],
    });
  }

  cargarData(): void {
    if (this.form.value.apellido === '' && this.form.value.nombre === ''){
      this.cargarDataporId();
    }
    if (this.form.value.id === '' && this.form.value.apellido === ''){
      this.cargarDataporNombre();
    }
    if (this.form.value.id === '' && this.form.value.nombre === ''){
      this.cargarDataporApellido();
    }
  }

  cargarDataporId(): void {
    this.usuarioService.getAllUsuario().subscribe((data: any) => {
      let ident = '';
      let tipo = '';
      let nom = '';
      let ape = '';
      let ema = '';
      let cel = '';
      let fecha = '';
      let dire = '';
      let depa = '';
      let ciu = '';
      console.log(data);
      for (let i = 0; i < data.length; i++) {
        if (this.form.value.id === data[i].id) {
          ident = data[i].id;
          this.listaPaciente.push(ident);
          tipo = data[i].tipoidentificacion;
          this.listaPaciente.push(tipo);
          nom = data[i].nombre;
          this.listaPaciente.push(nom);
          ape = data[i].apellido;
          this.listaPaciente.push(ape);
          ema = data[i].email;
          this.listaPaciente.push(ema);
          cel = data[i].celular;
          this.listaPaciente.push(cel);
          fecha = String(new Date(data[i].fechanacimiento).toISOString().replace(/T.*$/, ''));
          this.listaPaciente.push(fecha);
          dire = data[i].direccion;
          this.listaPaciente.push(dire);
          depa = data[i].departamento;
          this.listaPaciente.push(depa);
          ciu = data[i].ciudad;
          this.listaPaciente.push(ciu);
        }
      }
    });
  }

  cargarDataporNombre(): void {
    this.usuarioService.getAllUsuario().subscribe((data: any) => {
      let ident = '';
      let tipo = '';
      let nom = '';
      let ape = '';
      let ema = '';
      let cel = '';
      let fecha = '';
      let dire = '';
      let depa = '';
      let ciu = '';
      console.log(data);
      for (let i = 0; i < data.length; i++) {
        if (this.form.value.nombre.toLowerCase() === data[i].nombre.toLowerCase()) {
          ident = data[i].id;
          this.listaPaciente.push(ident);
          tipo = data[i].tipoidentificacion;
          this.listaPaciente.push(tipo);
          nom = data[i].nombre;
          this.listaPaciente.push(nom);
          ape = data[i].apellido;
          this.listaPaciente.push(ape);
          ema = data[i].email;
          this.listaPaciente.push(ema);
          cel = data[i].celular;
          this.listaPaciente.push(cel);
          fecha = String(new Date(data[i].fechanacimiento).toISOString().replace(/T.*$/, ''));
          this.listaPaciente.push(fecha);
          dire = data[i].direccion;
          this.listaPaciente.push(dire);
          depa = data[i].departamento;
          this.listaPaciente.push(depa);
          ciu = data[i].ciudad;
          this.listaPaciente.push(ciu);
        }
      }
    });
  }

  cargarDataporApellido(): void {
    this.usuarioService.getAllUsuario().subscribe((data: any) => {
      let ident = '';
      let tipo = '';
      let nom = '';
      let ape = '';
      let ema = '';
      let cel = '';
      let fecha = '';
      let dire = '';
      let depa = '';
      let ciu = '';
      console.log(data);
      for (let i = 0; i < data.length; i++) {
        if (this.form.value.apellido.toLowerCase() === data[i].apellido.toLowerCase()) {
          ident = data[i].id;
          this.listaPaciente.push(ident);
          tipo = data[i].tipoidentificacion;
          this.listaPaciente.push(tipo);
          nom = data[i].nombre;
          this.listaPaciente.push(nom);
          ape = data[i].apellido;
          this.listaPaciente.push(ape);
          ema = data[i].email;
          this.listaPaciente.push(ema);
          cel = data[i].celular;
          this.listaPaciente.push(cel);
          fecha = String(new Date(data[i].fechanacimiento).toISOString().replace(/T.*$/, ''));
          this.listaPaciente.push(fecha);
          dire = data[i].direccion;
          this.listaPaciente.push(dire);
          depa = data[i].departamento;
          this.listaPaciente.push(depa);
          ciu = data[i].ciudad;
          this.listaPaciente.push(ciu);
        }
      }
    });
  }

  borrarCampos(): void {
    this.form.patchValue({
      id: '',
      nombre: '',
      apellido: ''
    });
    // this.form.reset();
    this.listaPaciente.splice(0);
  }

  onContainerClick(event: MouseEvent): void {
  }

  setDescribedByIds(ids: string[]): void {
  }
}
