import { Component, ChangeDetectionStrategy, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators, NgControl, FormControl } from '@angular/forms';
import { UsuarioService } from '../../Service/usuario/usuario.service';
import { debounceTime } from 'rxjs/operators';
import {Observable} from 'rxjs';
import {map, startWith} from 'rxjs/operators';
import { MatFormFieldControl} from '@angular/material/form-field';
import {MatDialog} from '@angular/material/dialog';
import {DialogErrorBuscarPacienteComponent} from '../buscar-paciente/buscar-paciente.component';

/** Data structure for Usuario. */
export class Usuario {
  constructor(
    public id: string,
    public tipoidentificacion: string,
    public nombre: string,
    public apellido: string,
    public email: string,
    public celular: string,
    public fechanacimiento: Date,
    public direccion: string,
    public departamento: string,
    public ciudad: string,
    public seudonimo: string,
    public clave: string
  ) {}
}

@Component({
  selector: 'app-actualizar-paciente',
  templateUrl: './actualizar-paciente.component.html',
  styleUrls: ['./actualizar-paciente.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  providers: [{ provide: MatFormFieldControl, useExisting: ActualizarPacienteComponent }]
})
export class ActualizarPacienteComponent implements MatFormFieldControl<Usuario>, OnInit {
  data: any = [];
  constructor(private fb: FormBuilder, private usuarioService: UsuarioService, public dialog: MatDialog) {
  }
  form: FormGroup | any;
  mostrar: any = false;
  mensaje = '';
  hide = true;  public ident = 0;
  public tipoidentificacion = '';
  public nombre = '';
  public apellido = '';
  public email = '';
  public celular = '';
  public fechanacimiento = new Date();
  public direccion = '';
  public departamento = '';
  public ciudad = '';

  options: string[] = ['Alerce', 'Algarrobo', 'Alto Hospicio', 'Alto Jahuel', 'Ancud', 'Andacollo',
    'Andacollo', 'Antofagasta', 'Arauco', 'Arica', 'Batuco', 'Bollenar', 'Buin', 'Bulnes', 'Cabildo',
    'Cabrero', 'Cajón', 'Calama', 'Calbuco', 'Caldera', 'Calera de Tango', 'Calle Larga', 'Cañete',
    'Carahue', 'Cartagena', 'Casablanca', 'Castro', 'Catemu', 'Cauquenes', 'Cerrillos', 'Cerro Navia',
    'Chaitén', 'Chamisero', 'Chañaral', 'Chépica', 'Chicureo', 'Chiguayante', 'Chile Chico', 'Chillán',
    'Chillán Viejo', 'Chimbarongo', 'Chonchi', 'Ciudad del Valle', 'Cochrane', 'Codegua', 'Coelemu',
    'Coihueco', 'Colbún', 'Colina', 'Collipulli', 'Coltauco', 'Combarbalá', 'Concepción', 'Conchalí',
    'Concón', 'Constitución', 'Copiapó', 'Coquimbo', 'Coronel', 'Coyhaique', 'Culenar', 'Cunco',
    'Curacaví', 'Curanilahue', 'Curicó', 'Dalcahue', 'Diego de Almagro', 'Doñihue', 'El Bosque',
    'El Melón', 'El Monte', 'El Palqui', 'El Principal', 'El Quisco', 'El Salvador', 'El Tabo',
    'Estación Central', 'Freire', 'Fresia', 'Frutillar', 'Futrono', 'Gorbea', 'Graneros', 'Gultro',
    'Hanga Roa', 'Hijuelas', 'Hospital', 'Hualañé', 'Hualpén', 'Hualqui', 'Huasco', 'Huechuraba',
    'Huépil', 'Illapel', 'Independencia', 'Iquique', 'Isla de Maipo', 'La Calera', 'La Cisterna',
    'La Cruz', 'La Florida', 'La Granja', 'La Islita', 'La Laja', 'La Ligua', 'La Pintana', 'La Punta',
    'La Reina', 'La Serena', 'La Unión', 'Labranza', 'Lampa', 'Lanco', 'Laraquete', 'Las Cabras',
    'Las Condes', 'Las Cruces', 'Las Ventanas', 'Lautaro', 'Lebu', 'Limache', 'Linares', 'Llaillay',
    'Llanquihue', 'Lo Barnechea', 'Lo Espejo', 'Lo Miranda', 'Lo Prado', 'Loncoche', 'Longaví',
    'Los Álamos', 'Los Andes', 'Los Ángeles', 'Los Lagos', 'Los Muermos', 'Los Vilos', 'Lota', 'Machalí',
    'Macul', 'Maipú', 'Maule', 'Mejillones', 'Melipilla', 'Molina', 'Monte Águila', 'Monte Patria',
    'Mulchén', 'Ñuñoa', 'Nacimiento', 'Nancagua', 'Nogales', 'Nueva Imperial', 'Olmué', 'Osorno',
    'Ovalle', 'Padre Las Casas', 'Paillaco', 'Paine', 'Panguipulli', 'Parral', 'Pedro Aguirre Cerda',
    'Peñaflor', 'Peñalolén', 'Penco', 'Peralillo', 'Peumo', 'Pichidegua', 'Pichilemu', 'Pitrufquén',
    'Placilla de Peñuelas', 'Porvenir', 'Pozo Almonte', 'Providencia', 'Puchuncaví', 'Pucón', 'Pudahuel',
    'Puente Alto', 'Puerto Aysén', 'Puerto Montt', 'Puerto Natales', 'Puerto Varas', 'Puerto Williams',
    'Punitaqui', 'Punta Arenas', 'Purén', 'Purranque', 'Putaendo', 'Putre', 'Quellón', 'Quilicura',
    'Quillón', 'Quillota', 'Quilpué', 'Quinta de Tilcoco', 'Quinta Normal', 'Quintero', 'Quirihue',
    'Rancagua', 'Rauco', 'Recoleta', 'Renaico', 'Renca', 'Rengo', 'Requínoa', 'Retiro', 'Rinconada',
    'Río Bueno', 'Río Negro', 'Romeral', 'Salamanca', 'San Antonio', 'San Bernardo', 'San Carlos',
    'San Clemente', 'San Esteban', 'San Felipe', 'San Fernando', 'San Francisco de Mostazal',
    'San Javier', 'San Joaquín', 'San José de la Mariquina', 'San José de Maipo', 'San Miguel',
    'San Pedro de Atacama', 'San Pedro de la Paz', 'San Ramón', 'San Vicente de Tagua Tagua',
    'Santa Bárbara', 'Santa Cruz', 'Santa Juana', 'Santa María', 'Santiago', 'Santo Domingo',
    'Talagante', 'Talca', 'Talcahuano', 'Taltal', 'Temuco', 'Teno', 'Tierra Amarilla', 'Tiltil',
    'Tocopilla', 'Tomé', 'Tongoy', 'Traiguén', 'Valdivia', 'Valle Grande', 'Vallenar', 'Valparaíso',
    'Victoria', 'Vicuña', 'Vilcún', 'Villa Alegre', 'Villa Alemana', 'Villarrica', 'Viña del Mar',
    'Vitacura', 'Yumbel', 'Yungay'];
  public filteredOptions: Observable<string[]> = new Observable<string[]>();
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
  value: Usuario | null | undefined;
  ngOnInit(): void {
    this.builForm();
    this.filteredOptions = this.form.get('ciudad').valueChanges.pipe(
      startWith(''),
      map((value: string) => this._filter(value))
    );
  }
  initEditForm(): void{
    this.form = this.fb.group({
      id: new FormControl(),
      tipoidentificacion: new FormControl(),
      nombre: new FormControl(),
      apellido: new FormControl(),
      email: new FormControl(),
      celular: new FormControl(),
      fechanacimiento: new FormControl(),
      direccion: new FormControl(),
      departamento: new FormControl(),
      ciudad: new FormControl(),
      seudonimo: new FormControl(),
      clave: new FormControl(),
    });
  }
  private builForm(): void{
    this.form = this.fb.group({
      id: ['', [Validators.required]],
      tipoidentificacion: ['', [Validators.required]],
      nombre: ['', [Validators.required]],
      apellido: ['', [Validators.required]],
      email: ['', [Validators.required, Validators.email]],
      celular: ['', [Validators.required]],
      fechanacimiento: ['', [Validators.required]],
      direccion: ['', [Validators.required]],
      departamento: ['', [Validators.required]],
      ciudad: ['', [Validators.required]],
      seudonimo: ['', [Validators.required]],
      clave: ['', [Validators.required]],
    });
  }

  actualizarUsuario(): void {
    this.usuarioService.updateUsuario(this.form.value).subscribe( (data: any) => {
      console.log('actualizado');
      console.log(data);
      this.dialog.open(DialogActualizarPacienteComponent);
    });
  }

  cargarData(): void {
    this.usuarioService.getAllUsuario().subscribe((datoId: any) => {
      let idencontrado = false;
      for (let i = 0 ; i < datoId.length ; i ++){
        if (this.form.value.id === datoId[i].id){
          idencontrado = true;
          break;
        }
      }
      if (idencontrado === false){
        this.dialog.open(DialogErrorActualizarPacienteComponent);
      } else {
        this.usuarioService.getUsuario(this.form.value.id).subscribe( data => {
          console.log(data);
          this.data = data;
          console.log(this.data);
          this.form.patchValue({
            tipoidentificacion: this.data.tipoidentificacion,
            nombre: this.data.nombre,
            apellido: this.data.apellido,
            email: this.data.email,
            celular: this.data.celular,
            // fechanacimiento: String(new Date(this.data.fechanacimiento).toISOString().replace(/T.*$/, '')),
            fechanacimiento: this.data.fechanacimiento,
            direccion: this.data.direccion,
            departamento: this.data.departamento,
            ciudad: this.data.ciudad,
            seudonimo: this.data.seudonimo,
            clave: this.data.clave,
          });
        });
      }
    });
  }
  private _filter(value: string): string[] {
    const filterValue = value.toLowerCase();
    return this.options.filter(option => option.toLowerCase().includes(filterValue));
  }
  onContainerClick(event: MouseEvent): void {
  }

  setDescribedByIds(ids: string[]): void {
  }
}

@Component({
  selector: 'app-dialog-actualizar-paciente',
  templateUrl: 'dialog-actualizar-paciente.html',
})
export class DialogActualizarPacienteComponent {}

@Component({
  selector: 'app-dialog-error-actualizar-paciente',
  templateUrl: 'dialog-error-actualizar-paciente.html',
})
export class DialogErrorActualizarPacienteComponent {}
