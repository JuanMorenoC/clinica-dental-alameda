import {ChangeDetectionStrategy, Component, OnInit} from '@angular/core';
import {FormBuilder, FormControl, FormGroup, NgControl, Validators} from '@angular/forms';
import {UsuarioService} from '../../Service/usuario/usuario.service';
import {MatFormFieldControl} from '@angular/material/form-field';
import {Observable} from 'rxjs';
import {Cita, DialogErrorRegistroCitaComponent} from '../../registro/registro-cita/registro-cita.component';
import {ProcedimientoService} from '../../Service/procedimiento/procedimiento.service';
import {OdontologoService} from '../../Service/odontologo/odontologo.service';
import {MatDialog} from '@angular/material/dialog';

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
  public listaOdontologo: Array<any> = [];
  constructor(private fb: FormBuilder,
              private usuarioService: UsuarioService,
              private procedimientoService: ProcedimientoService,
              private odontologoService: OdontologoService,
              private dialog: MatDialog) {
    this.odontologoService.getAllOdontologo().subscribe((datasO: any) => {
      console.log(datasO);
      // tslint:disable-next-line:prefer-for-of
      for (let i = 0; i < datasO.length ; i++) {
        this.listaOdontologo.push(datasO[i].nombre + ' ' + datasO[i].apellido);
      }
    });
  }

  formBuscar: FormGroup | any;
  formHistorial: FormGroup | any;
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
    this.builFormB();
    this.builFormH();
  }

  log(): void {
    this.count++;
    console.log('Clicked!');
  }

  initEditFormB(): void{
    this.formBuscar = this.fb.group({
      id: new FormControl(),
      ident: new FormControl(),
      nombre: new FormControl(),
      apellido: new FormControl(),
    });
  }

  private builFormB(): void{
    this.formBuscar = this.fb.group({
      id: [''],
      ident: [''],
      nombre: [''],
      apellido: [''],
    });
  }

  initEditFormH(): void{
    this.formHistorial = this.fb.group({
      descripcion: new FormControl(),
      odontologo: new FormControl(),
    });
  }

  private builFormH(): void{
    this.formHistorial = this.fb.group({
      descripcion: ['', [Validators.required]],
      odontologo: ['', [Validators.required]],
    });
  }

  cargarData(): void {
    if (this.formBuscar.value.apellido === '' && this.formBuscar.value.nombre === ''){
      this.usuarioService.getAllUsuario().subscribe((datoId: any) => {
        let idencontrado = false;
        for (let i = 0 ; i < datoId.length ; i ++){
          if (this.formBuscar.value.id === datoId[i].id){
            idencontrado = true;
            break;
          }
        }
        if (idencontrado === false){
          this.dialog.open(DialogErrorBuscarPacienteComponent);
        } else {
          this.cargarDataporId();
        }
      });
    }
    if (this.formBuscar.value.id === '' && this.formBuscar.value.apellido === ''){
      this.usuarioService.getAllUsuario().subscribe((datoId: any) => {
        let idencontrado = false;
        for (let i = 0 ; i < datoId.length ; i ++){
          if (this.formBuscar.value.nombre === datoId[i].nombre){
            idencontrado = true;
            break;
          }
        }
        if (idencontrado === false){
          this.dialog.open(DialogErrorBuscarPacienteComponent);
        } else {
          this.cargarDataporNombre();
        }
      });
    }
    if (this.formBuscar.value.id === '' && this.formBuscar.value.nombre === ''){
      this.usuarioService.getAllUsuario().subscribe((datoId: any) => {
        let idencontrado = false;
        for (let i = 0 ; i < datoId.length ; i ++){
          if (this.formBuscar.value.apellido === datoId[i].apellido){
            idencontrado = true;
            break;
          }
        }
        if (idencontrado === false){
          this.dialog.open(DialogErrorBuscarPacienteComponent);
        } else {
          this.cargarDataporApellido();
        }
      });
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
        if (this.formBuscar.value.id === data[i].id) {
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
        if (this.formBuscar.value.nombre.toLowerCase() === data[i].nombre.toLowerCase()) {
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
        if (this.formBuscar.value.apellido.toLowerCase() === data[i].apellido.toLowerCase()) {
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
    this.formBuscar.patchValue({
      id: '',
      nombre: '',
      apellido: ''
    });
    // this.form.reset();
    this.listaPaciente.splice(0);
  }

  guardarHistorial(): void {
    if (this.formBuscar.value.apellido === '' && this.formBuscar.value.nombre === ''){
      this.guardarDataporId();
    }
    if (this.formBuscar.value.id === '' && this.formBuscar.value.apellido === ''){
      this.guardarDataporNombre();
    }
    if (this.formBuscar.value.id === '' && this.formBuscar.value.nombre === ''){
      this.guardarDataporApellido();
    }
  }

  guardarDataporId(): void {
    let fecha = '';
    let hora = '';
    let countIde = 0;
    this.procedimientoService.getAllProcedimiento().subscribe((datap: any) => {
      countIde = datap.length;
      this.usuarioService.getUsuario(this.formBuscar.value.id).subscribe((datau: any) => {
        fecha = String(new Date().toISOString().replace(/T.*$/, ''));
        hora = String(new Date().getHours()) + ':' + String(new Date().getMinutes());
        const dataProcedimiento = {
          id: countIde + 1,
          idusuario: this.formBuscar.value.id,
          nombre: datau.nombre,
          apellido: datau.apellido,
          fechahora: fecha + ' ' + hora,
          descripcion: this.formHistorial.value.descripcion,
          odontologo: this.formHistorial.value.odontologo
        };
        console.log(dataProcedimiento);
        this.procedimientoService.addProcedimiento(dataProcedimiento).subscribe((data: any) => {
          console.log(data);
          this.dialog.open(DialogBuscarPacienteComponent);
        });
      });
    });
  }
  guardarDataporNombre(): void {
    let iden = '';
    let nomb = '';
    let apel = '';
    let fecha = '';
    let hora = '';
    let countIde = 0;
    this.procedimientoService.getAllProcedimiento().subscribe((datap: any) => {
      countIde = datap.length;
      this.usuarioService.getAllUsuario().subscribe((datau: any) => {
        // tslint:disable-next-line:prefer-for-of
        for (let i = 0; i < datau.length ; i++) {
          if (this.formBuscar.value.nombre.toLowerCase() === datau[i].nombre.toLowerCase()){
            iden = datau[i].id;
            nomb = datau[i].nombre;
            apel = datau[i].apellido;
          }
        }
        fecha = String(new Date().toISOString().replace(/T.*$/, ''));
        hora = String(new Date().getHours()) + ':' + String(new Date().getMinutes());
        const dataProcedimiento = {
          id: countIde + 1,
          idusuario: iden,
          nombre: nomb,
          apellido: apel,
          fechahora: fecha + ' ' + hora,
          descripcion: this.formHistorial.value.descripcion,
          odontologo: this.formHistorial.value.odontologo
        };
        console.log(dataProcedimiento);
        this.procedimientoService.addProcedimiento(dataProcedimiento).subscribe((data: any) => {
          console.log(data);
          this.dialog.open(DialogBuscarPacienteComponent);
        });
      });
    });
  }
  guardarDataporApellido(): void {
    let iden = '';
    let nomb = '';
    let apel = '';
    let fecha = '';
    let hora = '';
    let countIde = 0;
    this.procedimientoService.getAllProcedimiento().subscribe((datap: any) => {
      countIde = datap.length;
      this.usuarioService.getAllUsuario().subscribe((datau: any) => {
        // tslint:disable-next-line:prefer-for-of
        for (let i = 0; i < datau.length ; i++) {
          if (this.formBuscar.value.apellido.toLowerCase() === datau[i].apellido.toLowerCase()){
            iden = datau[i].id;
            nomb = datau[i].nombre;
            apel = datau[i].apellido;
          }
        }
        fecha = String(new Date().toISOString().replace(/T.*$/, ''));
        hora = String(new Date().getHours()) + ':' + String(new Date().getMinutes());
        const dataProcedimiento = {
          id: countIde + 1,
          idusuario: iden,
          nombre: nomb,
          apellido: apel,
          fechahora: fecha + ' ' + hora,
          descripcion: this.formHistorial.value.descripcion,
          odontologo: this.formHistorial.value.odontologo
        };
        console.log(dataProcedimiento);
        this.procedimientoService.addProcedimiento(dataProcedimiento).subscribe((data: any) => {
          console.log(data);
          this.dialog.open(DialogBuscarPacienteComponent);
        });
      });
    });
  }

  onContainerClick(event: MouseEvent): void {
  }

  setDescribedByIds(ids: string[]): void {
  }
}

@Component({
  selector: 'app-dialog-buscar-paciente',
  templateUrl: 'dialog-buscar-paciente.html',
})
export class DialogBuscarPacienteComponent {}

@Component({
  selector: 'app-dialog-error-buscar-paciente',
  templateUrl: 'dialog-error-buscar-paciente.html',
})
export class DialogErrorBuscarPacienteComponent {}
