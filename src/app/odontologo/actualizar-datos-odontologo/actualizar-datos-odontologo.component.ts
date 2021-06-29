import { Component, ChangeDetectionStrategy, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators, NgControl, FormControl } from '@angular/forms';
import { UsuarioService } from '../../Service/usuario/usuario.service';
import {Observable} from 'rxjs';
import { MatFormFieldControl} from '@angular/material/form-field';
import {MatDialog} from '@angular/material/dialog';

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
  selector: 'app-actualizar-datos-odontologo',
  templateUrl: './actualizar-datos-odontologo.component.html',
  styleUrls: ['./actualizar-datos-odontologo.component.css']
})
export class ActualizarDatosOdontologoComponent implements OnInit {
  data: any = [];
  constructor(private fb: FormBuilder, private usuarioService: UsuarioService, public dialog: MatDialog) {
    console.log('ACTUALIZAR JJJJJ');
  }
  form: FormGroup | any;
  datapersona: any;
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
      pais: new FormControl(),
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
      pais: ['', [Validators.required]],
      departamento: ['', [Validators.required]],
      ciudad: ['', [Validators.required]],
      seudonimo: ['', [Validators.required]],
      clave: ['', [Validators.required]],
    });
  }

  actualizarUsuario(): void {
    this.usuarioService.getAllUsuario().subscribe((datauall: any) => {
      for (let i = 0 ; i < datauall.length ; i ++){
        if (this.form.value.id === datauall[i].cedula){
          this.datapersona = {
            cedula: this.form.value.id,
            nombre: this.form.value.nombre,
            apellido: this.form.value.apellido,
            seudonimo: this.form.value.seudonimo,
            tipo_identificacion: this.form.value.tipoidentificacion,
            correo: this.form.value.email,
            clave: this.form.value.clave,
            fecha_nacimiento: this.form.value.fechanacimiento,
            celular: this.form.value.celular,
            ciudad: this.form.value.ciudad,
            departamento: this.form.value.departamento,
            pais: this.form.value.pais
          };
        }
      }
      this.usuarioService.updateUsuario(this.datapersona, this.form.value.id).subscribe( (data: any) => {
        console.log('actualizado');
        console.log(data);
        this.dialog.open(DialogActualizarOdontologoComponent);
      });
    });
  }

  cargarData(): void {
    this.usuarioService.getAllUsuario().subscribe((data: any) => {
      let error = true;
      for (let i = 0 ; i < data.length ; i++){
        if (data[i].cedula === this.form.value.id){
          error = false;
        }
      }
      if (error === true){
        this.dialog.open(DialogErrorActualizarOdontologoComponent);
      } else  {
        this.usuarioService.getUsuario(this.form.value.id).subscribe( datas => {
          console.log(datas);
          this.data = datas;
          console.log(this.data);
          this.form.patchValue({
            tipoidentificacion: this.data.tipo_identificacion,
            nombre: this.data.nombre,
            apellido: this.data.apellido,
            email: this.data.correo,
            celular: this.data.celular,
            // fechanacimiento: String(new Date(this.data.fechanacimiento).toISOString().replace(/T.*$/, '')),
            fechanacimiento: this.data.fecha_nacimiento,
            pais: this.data.pais,
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
  selector: 'app-dialog-actualizar-odontologo',
  templateUrl: 'dialog-actualizar-odontologo.html',
})
export class DialogActualizarOdontologoComponent {}

@Component({
  selector: 'app-dialog-error-actualizar-odontologo',
  templateUrl: 'dialog-error-actualizar-odontologo.html',
})
export class DialogErrorActualizarOdontologoComponent {}
