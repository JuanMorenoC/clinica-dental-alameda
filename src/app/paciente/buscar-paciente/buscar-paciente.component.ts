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

  constructor(private fb: FormBuilder,
              private usuarioService: UsuarioService) { }

  form: FormGroup | any;
  public listaUsuario: any[] = [];
  public datosF = {};
  public listaTitulo = {identificacion: 'Identificaci&oacute;n',
    tipo: 'Tipo de Identificaci&oacute;n', nom: 'Nombre', ape: 'Apellido',
  ema: 'Email', cel: 'Celular', fecha: 'Fecha de Nacimiento',
  dir: 'Direcci&oacute;n', dep: 'Departamento', ciu: 'Ciudad'};
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
    this.usuarioService.getUsuario(this.form.value.id).subscribe( data => {
      console.log(data);
      this.data = data;
      console.log(this.data);
      this.form.patchValue({
        ident: this.data.ident,
        tipoidentificacion: this.data.tipoidentificacion,
        nombre: this.data.nombre,
        apellido: this.data.apellido,
        email: this.data.email,
        celular: this.data.celular,
        fechanacimiento: String(new Date(this.data.fechanacimiento).toISOString().replace(/T.*$/, '')),
        // fechanacimiento: this.data.fechanacimiento,
        direccion: this.data.direccion,
        departamento: this.data.departamento,
        ciudad: this.data.ciudad,
      });
      /*
      console.log('DATOS');
      for (let key of Object.keys(data)){
        this.idet = data[key];
        this.listaUsuario.push(this.idet);
        console.log(this.idet);
        console.log(typeof this.idet);
        this.tipoidentificacion = data[key];
        this.listaUsuario.push(this.tipoidentificacion);
        console.log(this.tipoidentificacion);
        console.log(typeof this.tipoidentificacion);
        this.nombre = data[key];
        this.listaUsuario.push(this.nombre);
        console.log(this.nombre);
        console.log(typeof this.nombre);
        this.apellido = data[key];
        this.listaUsuario.push(this.apellido);
        console.log(this.apellido);
        console.log(typeof this.apellido);
        this.email = data[key];
        this.listaUsuario.push(this.email);
        console.log(this.email);
        console.log(typeof this.email);
        this.celular = data[key];
        this.listaUsuario.push(this.celular);
        console.log(this.celular);
        console.log(typeof this.celular);
        this.fechanacimiento = data[key];
        this.listaUsuario.push(this.fechanacimiento);
        console.log(this.fechanacimiento);
        console.log(typeof this.fechanacimiento);
        this.direccion = data[key];
        this.listaUsuario.push(this.direccion);
        console.log(this.direccion);
        console.log(typeof this.direccion);
        this.departamento = data[key];
        this.listaUsuario.push(this.departamento);
        console.log(this.departamento);
        console.log(typeof this.departamento);
        this.ciudad = data[key];
        this.listaUsuario.push(this.ciudad);
        console.log(this.ciudad);
        console.log(typeof this.ciudad);
      }
      console.log('FIN DATOS');*/
      /*
      for (let i = 0; i < data.length; i++) {
        this.datosF = {
          idet: data[i].id,
          tipoidentificacion: data[i].tipoidentificacion,
          nombre: data[i].nombre,
          apellido: data[i].apellido,
          email: data[i].email,
          celular: data[i].celular,
          fechanacimiento: data[i].fechanacimiento,
          direccion: data[i].direccion,
          departamento: data[i].departamento,
          ciudad: data[i].ciudad
        };
      }*/
      // this.listaUsuario.push(data);
      // this.listaUsuario.push(data[0]);
      // console.log(this.listaUsuario[0].nombre);
    });
  }

  onContainerClick(event: MouseEvent): void {
  }

  setDescribedByIds(ids: string[]): void {
  }
}
