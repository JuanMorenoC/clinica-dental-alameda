import {ChangeDetectionStrategy, Component, OnInit} from '@angular/core';
import {FormBuilder, FormControl, FormGroup, NgControl, Validators} from '@angular/forms';
import {UsuarioService} from '../../Service/usuario/usuario.service';
import {MatFormFieldControl} from '@angular/material/form-field';
import {Observable} from 'rxjs';
import {Cita, DialogErrorRegistroCitaComponent} from '../../registro/registro-cita/registro-cita.component';
import {CitaService} from '../../Service/cita/cita.service';
import {RoleService} from '../../Service/role/role.service';
import {MatDialog} from '@angular/material/dialog';

/** Data structure for usuario. */
export class Usuario {
  constructor(
    public ide: string
  ) {}
}
/**
 * Componente de actualizar datos del odontologo
 */
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

  /**
   * Llena el array de odontologos solo con el nombre y el apellido
   * @param fb - formulario
   * @param usuarioService - servicio de la entidad usuario
   * @param citaService - servicio de la entidad cita
   * @param rolService - servicio de la entidad rol
   * @param dialog - mensaje en ventana emergente
   */
  constructor(private fb: FormBuilder,
              private usuarioService: UsuarioService,
              private citaService: CitaService,
              private rolService: RoleService,
              private dialog: MatDialog) {
    this.rolService.getAllRol().subscribe((datar: any) => {
      this.usuarioService.getAllUsuario().subscribe((datasO: any) => {
        console.log(datasO);
        for (let i = 0 ; i < datar.length ; i++){
          for (let j = 0; j < datasO.length ; j++) {
            if (datar[i].cedula === datasO[j].cedula && datar[i].nombre === 'odontologo'){
              this.listaOdontologo.push(datasO[j].nombre + ' ' + datasO[j].apellido);
            }
          }
        }
      });
    });
  }

  /**
   * Atributos utilizados
   */
  formBuscar: FormGroup | any;
  formHistorial: FormGroup | any;
  public datosF = {};
  count = 0;
  dataAgenda: any;
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

  /**
   * Atributos requeridos por MatFormControl
   */
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

  /**
   * Metodo inicializador que hace funcionar los demas metodos que no dependen de un boton
   */
  ngOnInit(): void {
    this.builFormB();
    this.builFormH();
  }

  /**
   * Cuenta los doble click
   */
  log(): void {
    this.count++;
  }

  /**
   * Inicializa los formControlname
   */
  initEditFormB(): void{
    this.formBuscar = this.fb.group({
      id: new FormControl(),
      ident: new FormControl(),
      nombre: new FormControl(),
      apellido: new FormControl(),
    });
  }
  /**
   * Validar que cada campo sea requerido
   * @private
   */
  private builFormB(): void{
    this.formBuscar = this.fb.group({
      id: [''],
      ident: [''],
      nombre: [''],
      apellido: [''],
    });
  }
  /**
   * Inicializa los formControlname
   */
  initEditFormH(): void{
    this.formHistorial = this.fb.group({
      descripcion: new FormControl(),
      odontologo: new FormControl(),
    });
  }
  /**
   * Validar que cada campo sea requerido
   * @private
   */
  private builFormH(): void{
    this.formHistorial = this.fb.group({
      descripcion: ['', [Validators.required]],
      odontologo: ['', [Validators.required]],
    });
  }

  /**
   * Cargar los datos del paciente que se esta buscando
   */
  cargarData(): void {
    if (this.formBuscar.value.apellido === '' && this.formBuscar.value.nombre === ''){
      this.usuarioService.getAllUsuario().subscribe((datoId: any) => {
        let idencontrado = false;
        for (let i = 0 ; i < datoId.length ; i ++){
          if (this.formBuscar.value.id === datoId[i].cedula){
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

  /**
   * Cargar los datos del paciente que es buscado por la cedula
   */
  cargarDataporId(): void {
    this.usuarioService.getAllUsuario().subscribe((data: any) => {
      let ident = '';
      let tipo = '';
      let nom = '';
      let ape = '';
      let ema = '';
      let cel = '';
      let fecha = '';
      let pai = '';
      let depa = '';
      let ciu = '';
      console.log(data);
      for (let i = 0; i < data.length; i++) {
        if (this.formBuscar.value.id === data[i].cedula) {
          ident = data[i].cedula;
          this.listaPaciente.push(ident);
          tipo = data[i].tipo_identificacion;
          this.listaPaciente.push(tipo);
          nom = data[i].nombre;
          this.listaPaciente.push(nom);
          ape = data[i].apellido;
          this.listaPaciente.push(ape);
          ema = data[i].correo;
          this.listaPaciente.push(ema);
          cel = data[i].celular;
          this.listaPaciente.push(cel);
          fecha = String(new Date(data[i].fecha_nacimiento).toLocaleDateString());
          this.listaPaciente.push(fecha);
          depa = data[i].departamento;
          this.listaPaciente.push(depa);
          ciu = data[i].ciudad;
          this.listaPaciente.push(ciu);
          pai = data[i].pais;
          this.listaPaciente.push(pai);
        }
      }
    });
  }

  /**
   * Cargar los datos del paciente que es buscado por el nombre
   */
  cargarDataporNombre(): void {
    this.rolService.getAllRol().subscribe((datar: any) => {
      this.usuarioService.getAllUsuario().subscribe((data: any) => {
        let ident = '';
        let tipo = '';
        let nom = '';
        let ape = '';
        let ema = '';
        let cel = '';
        let fecha = '';
        let pai = '';
        let depa = '';
        let ciu = '';
        console.log(data);
        for (let j = 0; j < datar.length ; j++) {
          for (let i = 0; i < data.length; i++) {
            if (this.formBuscar.value.nombre.toLowerCase() === data[i].nombre.toLowerCase() && 'paciente' === datar[j].nombre && data[i].cedula === datar[j].cedula) {
              ident = data[i].cedula;
              this.listaPaciente.push(ident);
              tipo = data[i].tipo_identificacion;
              this.listaPaciente.push(tipo);
              nom = data[i].nombre;
              this.listaPaciente.push(nom);
              ape = data[i].apellido;
              this.listaPaciente.push(ape);
              ema = data[i].correo;
              this.listaPaciente.push(ema);
              cel = data[i].celular;
              this.listaPaciente.push(cel);
              fecha = String(new Date(data[i].fecha_nacimiento).toLocaleDateString());
              this.listaPaciente.push(fecha);
              depa = data[i].departamento;
              this.listaPaciente.push(depa);
              ciu = data[i].ciudad;
              this.listaPaciente.push(ciu);
              pai = data[i].pais;
              this.listaPaciente.push(pai);
            }
          }
        }
      });
    });
  }

  /**
   * Cargar los datos del paciente que es buscado por el apellido
   */
  cargarDataporApellido(): void {
    this.rolService.getAllRol().subscribe((datar: any) => {
      this.usuarioService.getAllUsuario().subscribe((data: any) => {
        let ident = '';
        let tipo = '';
        let nom = '';
        let ape = '';
        let ema = '';
        let cel = '';
        let fecha = '';
        let pai = '';
        let depa = '';
        let ciu = '';
        for (let j = 0; j < datar.length ; j++) {
          for (let i = 0; i < data.length; i++) {
            if (this.formBuscar.value.apellido.toLowerCase() === data[i].apellido.toLowerCase() && 'paciente' === datar[j].nombre && data[i].cedula === datar[j].cedula) {
              ident = data[i].cedula;
              this.listaPaciente.push(ident);
              tipo = data[i].tipo_identificacion;
              this.listaPaciente.push(tipo);
              nom = data[i].nombre;
              this.listaPaciente.push(nom);
              ape = data[i].apellido;
              this.listaPaciente.push(ape);
              ema = data[i].correo;
              this.listaPaciente.push(ema);
              cel = data[i].celular;
              this.listaPaciente.push(cel);
              fecha = String(new Date(data[i].fecha_nacimiento).toLocaleDateString());
              this.listaPaciente.push(fecha);
              depa = data[i].departamento;
              this.listaPaciente.push(depa);
              ciu = data[i].ciudad;
              this.listaPaciente.push(ciu);
              pai = data[i].pais;
              this.listaPaciente.push(pai);
            }
          }
        }
      });
    });
  }

  /**
   * Borra los campos de texto de cedula, nombre y apellido
   */
  borrarCampos(): void {
    this.formBuscar.patchValue({
      id: '',
      nombre: '',
      apellido: ''
    });
    // this.form.reset();
    this.listaPaciente.splice(0);
  }

  /**
   * Metodo para guardar el historial odontologico del paciente
   */
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

  /**
   * Metodo para guardar el historial odontologico buscado por cedula
   */
  guardarDataporId(): void {
    this.citaService.getAllCita().subscribe((dataAgendaAll: any) => {
      for (let n = 0 ; n < dataAgendaAll.length ; n++){
        if (dataAgendaAll[n].paciente.cedula === this.formBuscar.value.id){
          this.dataAgenda = {
            idCita: dataAgendaAll[n].idCita,
            hora: dataAgendaAll[n].hora,
            descripcion: this.formHistorial.value.descripcion,
            estado: dataAgendaAll[n].estado,
            fecha_cita: dataAgendaAll[n].fecha_cita,
            paciente: {
              cedula: dataAgendaAll[n].paciente.cedula,
              nombre: dataAgendaAll[n].paciente.nombre,
              apellido: dataAgendaAll[n].paciente.apellido,
              seudonimo: dataAgendaAll[n].paciente.seudonimo,
              tipo_identificacion: dataAgendaAll[n].paciente.tipo_identificacion,
              correo: dataAgendaAll[n].paciente.correo,
              clave: dataAgendaAll[n].paciente.clave,
              fecha_nacimiento: dataAgendaAll[n].paciente.fecha_nacimiento,
              celular: dataAgendaAll[n].paciente.celular,
              ciudad: dataAgendaAll[n].paciente.ciudad,
              departamento: dataAgendaAll[n].paciente.departamento,
              pais: dataAgendaAll[n].paciente.pais
            },
            odontologo: {
              cedula: dataAgendaAll[n].odontologo.cedula,
              nombre: dataAgendaAll[n].odontologo.nombre,
              apellido: dataAgendaAll[n].odontologo.apellido,
              seudonimo: dataAgendaAll[n].odontologo.seudonimo,
              tipo_identificacion: dataAgendaAll[n].odontologo.tipo_identificacion,
              correo: dataAgendaAll[n].odontologo.correo,
              clave: dataAgendaAll[n].odontologo.clave,
              fecha_nacimiento: dataAgendaAll[n].odontologo.fecha_nacimiento,
              celular: dataAgendaAll[n].odontologo.celular,
              ciudad: dataAgendaAll[n].odontologo.ciudad,
              departamento: dataAgendaAll[n].odontologo.departamento,
              pais: dataAgendaAll[n].odontologo.pais
            },
            procedimiento: {
              idProcedimiento: dataAgendaAll[n].procedimiento.idProcedimiento,
              tipo: dataAgendaAll[n].procedimiento.tipo
            }
          };
        }
      }
      this.citaService.updateCita(this.dataAgenda, this.dataAgenda.idCita).subscribe((dataAgendaAgregar: any) => {
        this.dialog.open(DialogBuscarPacienteComponent);
      });
    });
  }

  /**
   * Metodo para guardar el historial odontologico del paciente buscado por nombre
   */
  guardarDataporNombre(): void {
    this.rolService.getAllRol().subscribe((datar: any) => {
      this.citaService.getAllCita().subscribe((dataAgendaAll: any) => {
        for (let j = 0; j < datar.length ; j++) {
          for (let n = 0 ; n < dataAgendaAll.length ; n++){
            if (this.formBuscar.value.nombre.toLowerCase() === dataAgendaAll[n].paciente.nombre.toLowerCase() && 'paciente' === datar[j].nombre && dataAgendaAll[n].paciente.cedula === datar[j].cedula){
              this.dataAgenda = {
                idCita: dataAgendaAll[n].idCita,
                hora: dataAgendaAll[n].hora,
                descripcion: this.formHistorial.value.descripcion,
                estado: dataAgendaAll[n].estado,
                fecha_cita: dataAgendaAll[n].fecha_cita,
                paciente: {
                  cedula: dataAgendaAll[n].paciente.cedula,
                  nombre: dataAgendaAll[n].paciente.nombre,
                  apellido: dataAgendaAll[n].paciente.apellido,
                  seudonimo: dataAgendaAll[n].paciente.seudonimo,
                  tipo_identificacion: dataAgendaAll[n].paciente.tipo_identificacion,
                  correo: dataAgendaAll[n].paciente.correo,
                  clave: dataAgendaAll[n].paciente.clave,
                  fecha_nacimiento: dataAgendaAll[n].paciente.fecha_nacimiento,
                  celular: dataAgendaAll[n].paciente.celular,
                  ciudad: dataAgendaAll[n].paciente.ciudad,
                  departamento: dataAgendaAll[n].paciente.departamento,
                  pais: dataAgendaAll[n].paciente.pais
                },
                odontologo: {
                  cedula: dataAgendaAll[n].odontologo.cedula,
                  nombre: dataAgendaAll[n].odontologo.nombre,
                  apellido: dataAgendaAll[n].odontologo.apellido,
                  seudonimo: dataAgendaAll[n].odontologo.seudonimo,
                  tipo_identificacion: dataAgendaAll[n].odontologo.tipo_identificacion,
                  correo: dataAgendaAll[n].odontologo.correo,
                  clave: dataAgendaAll[n].odontologo.clave,
                  fecha_nacimiento: dataAgendaAll[n].odontologo.fecha_nacimiento,
                  celular: dataAgendaAll[n].odontologo.celular,
                  ciudad: dataAgendaAll[n].odontologo.ciudad,
                  departamento: dataAgendaAll[n].odontologo.departamento,
                  pais: dataAgendaAll[n].odontologo.pais
                },
                procedimiento: {
                  idProcedimiento: dataAgendaAll[n].procedimiento.idProcedimiento,
                  tipo: dataAgendaAll[n].procedimiento.tipo
                }
              };
            }
          }
        }
        this.citaService.updateCita(this.dataAgenda, this.dataAgenda.idCita).subscribe((dataAgendaAgregar: any) => {
          this.dialog.open(DialogBuscarPacienteComponent);
        });
      });
    });
  }
  /**
   * Metodo para guardar el historial odontologico del paciente buscado por apellido
   */
  guardarDataporApellido(): void {
    this.rolService.getAllRol().subscribe((datar: any) => {
      this.citaService.getAllCita().subscribe((dataAgendaAll: any) => {
        for (let j = 0; j < datar.length ; j++) {
          for (let n = 0 ; n < dataAgendaAll.length ; n++){
            if (this.formBuscar.value.apellido.toLowerCase() === dataAgendaAll[n].paciente.apellido.toLowerCase() && 'paciente' === datar[j].nombre && dataAgendaAll[n].paciente.cedula === datar[j].cedula){
              this.dataAgenda = {
                idCita: dataAgendaAll[n].idCita,
                hora: dataAgendaAll[n].hora,
                descripcion: this.formHistorial.value.descripcion,
                estado: dataAgendaAll[n].estado,
                fecha_cita: dataAgendaAll[n].fecha_cita,
                paciente: {
                  cedula: dataAgendaAll[n].paciente.cedula,
                  nombre: dataAgendaAll[n].paciente.nombre,
                  apellido: dataAgendaAll[n].paciente.apellido,
                  seudonimo: dataAgendaAll[n].paciente.seudonimo,
                  tipo_identificacion: dataAgendaAll[n].paciente.tipo_identificacion,
                  correo: dataAgendaAll[n].paciente.correo,
                  clave: dataAgendaAll[n].paciente.clave,
                  fecha_nacimiento: dataAgendaAll[n].paciente.fecha_nacimiento,
                  celular: dataAgendaAll[n].paciente.celular,
                  ciudad: dataAgendaAll[n].paciente.ciudad,
                  departamento: dataAgendaAll[n].paciente.departamento,
                  pais: dataAgendaAll[n].paciente.pais
                },
                odontologo: {
                  cedula: dataAgendaAll[n].odontologo.cedula,
                  nombre: dataAgendaAll[n].odontologo.nombre,
                  apellido: dataAgendaAll[n].odontologo.apellido,
                  seudonimo: dataAgendaAll[n].odontologo.seudonimo,
                  tipo_identificacion: dataAgendaAll[n].odontologo.tipo_identificacion,
                  correo: dataAgendaAll[n].odontologo.correo,
                  clave: dataAgendaAll[n].odontologo.clave,
                  fecha_nacimiento: dataAgendaAll[n].odontologo.fecha_nacimiento,
                  celular: dataAgendaAll[n].odontologo.celular,
                  ciudad: dataAgendaAll[n].odontologo.ciudad,
                  departamento: dataAgendaAll[n].odontologo.departamento,
                  pais: dataAgendaAll[n].odontologo.pais
                },
                procedimiento: {
                  idProcedimiento: dataAgendaAll[n].procedimiento.idProcedimiento,
                  tipo: dataAgendaAll[n].procedimiento.tipo
                }
              };
            }
          }
        }
        this.citaService.updateCita(this.dataAgenda, this.dataAgenda.idCita).subscribe((dataAgendaAgregar: any) => {
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
/**
 * Se llaman los dialogos para mostrar los mensajes correspondientes
 */
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
