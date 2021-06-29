import { Component, ChangeDetectionStrategy, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators, NgControl, FormControl } from '@angular/forms';
import { UsuarioService } from '../../Service/usuario/usuario.service';
import {PaisService} from '../../Service/pais/pais.service';
import {DepartamentoService} from '../../Service/departamento/departamento.service';
import {CiudadService} from '../../Service/ciudad/ciudad.service';
import {RoleService} from '../../Service/role/role.service';
import { debounceTime } from 'rxjs/operators';
import {Observable} from 'rxjs';
import {map, startWith} from 'rxjs/operators';
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
    public pais: string,
    public departamento: string,
    public ciudad: string,
    public seudonimo: string,
    public clave: string
  ) {}
}

@Component({
  selector: 'app-registro-moderador',
  templateUrl: './registro-moderador.component.html',
  styleUrls: ['./registro-moderador.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  providers: [{ provide: MatFormFieldControl, useExisting: RegistroModeradorComponent }]
})
export class RegistroModeradorComponent implements MatFormFieldControl<Usuario>, OnInit {
  constructor(private fb: FormBuilder,
              private usuarioService: UsuarioService,
              private ciudadSerice: CiudadService,
              private departamentoSerice: DepartamentoService,
              private paisSerice: PaisService,
              private roleService: RoleService,
              public dialog: MatDialog) {
  }
  form: FormGroup | any;
  data = [];
  datarol: any;
  datapais: any;
  datadepartamento: any;
  dataciudad: any;
  datapersona: any;
  mostrar: any = false;
  mensaje = '';
  mostrarmensaje = false;
  hide = true;
  contadorciudad = 0;
  contadordepartamento = 0;
  contadorpais = 0;
  contadorrol = 0;
  // CIUDADES
  optionsCiudad: string[] = ['Alerce', 'Algarrobo', 'Alto Hospicio', 'Alto Jahuel', 'Ancud', 'Andacollo',
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
  public filteredOptionsCiudad: Observable<string[]> = new Observable<string[]>();
  // PAISES
  optionPais: string[] = ['Chile', 'Afganistán', 'Albania', 'Alemania', 'Andorra', 'Angola', 'Antigua y Barbuda',
    'Arabia Saudita', 'Argelia', 'Argentina', 'Armenia', 'Australia', 'Austria', 'Azerbaiyán', 'Bahamas',
    'Bangladés', 'Barbados', 'Baréin', 'Bélgica', 'Belice', 'Bielorrusia', 'Benín', 'Birmania / Myanmar', 'Bolivia',
    'Bosnia y Herzegovina', 'Botsuana', 'Brasil', 'Brunéi', 'Bulgaria', 'Burkina Faso', 'Burundi', 'Bután',
    'Cabo Verde', 'Camboya', 'Camerún', 'Canadá', 'Catar', 'República Centroafricana', 'Chad', 'República Checa',
    'China', 'Chipre', 'Colombia', 'Comoras', 'República del Congo', 'República Democrática del Congo',
    'Corea del Norte', 'Corea del Sur', 'Costa de Marfil', 'Costa Rica', 'Croacia', 'Cuba', 'Dinamarca',
    'Dominica', 'República Dominicana', 'Ecuador', 'Egipto', 'El Salvador', 'Emiratos Árabes Unidos', 'Eritrea',
    'Eslovaquia', 'Eslovenia', 'España', 'Estados Unidos', 'Estonia', 'Etiopía', 'Filipinas', 'Finlandia',
    'Fiyi', 'Francia', 'Gabón', 'Gambia', 'Georgia', 'Ghana', 'Granada', 'Grecia',
    'Guatemala', 'Guinea', 'Guinea-Bisáu', 'Guinea Ecuatorial', 'Guyana', 'Haití', 'Honduras', 'Hungría', 'India',
    'Indonesia', 'Irak', 'Irán', 'Irlanda', 'Islandia', 'Israel', 'Italia', 'Jamaica',
    'Japón', 'Jordania', 'Kazajistán', 'Kenia', 'Kirguistán', 'Kiribati', 'Kuwait',
    'Laos', 'Lesoto', 'Letonia', 'Líbano', 'Liberia', 'Libia', 'Liechtenstein', 'Lituania',
    'Luxemburgo', 'Macedonia del Norte', 'Madagascar', 'Malasia', 'Malaui', 'Maldivas', 'Malí', 'Malta',
    'Marruecos', 'Islas Marshall', 'Mauricio', 'Mauritania', 'México', 'Micronesia', 'Moldavia', 'Mónaco',
    'Mongolia', 'Montenegro', 'Mozambique', 'Namibia', 'Nauru', 'Nepal', 'Nicaragua',
    'Níger', 'Nigeria', 'Noruega', 'Nueva Zelanda', 'Omán', 'Países Bajos', 'Pakistán', 'Palaos',
    'Palestina', 'Panamá', 'Papúa Nueva Guinea', 'Paraguay', 'Perú', 'Polonia', 'Portugal', 'Reino Unido',
    'Ruanda', 'Rumania', 'Rusia', 'Islas Salomón', 'Samoa', 'San Cristóbal y Nieves', 'San Marino',
    'San Vicente y las Granadinas', 'Santa Lucía', 'Santo Tomé y Príncipe', 'Senegal', 'Serbia', 'Seychelles',
    'Sierra Leona', 'Singapur', 'Siria', 'Somalia', 'Sri Lanka', 'Suazilandia', 'Sudáfrica', 'Sudán',
    'Sudán del Sur', 'Suecia', 'Suiza', 'Surinam', 'Tailandia', 'Tanzania',
    'Tayikistán', 'Timor Oriental', 'Togo', 'Tonga', 'Trinidad y Tobago', 'Túnez', 'Turkmenistán',
    'Turquía', 'Tuvalu', 'Ucrania', 'Uganda', 'Uruguay', 'Uzbekistán', 'Vanuatu',
    'Ciudad del Vaticano', 'Venezuela', 'Vietnam', 'Yemen', 'Yibuti', 'Zambia', 'Zimbabue'];
  public filteredOptionsPais: Observable<string[]> = new Observable<string[]>();
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
    this.filteredOptionsCiudad = this.form.get('ciudad').valueChanges.pipe(
      startWith(''),
      map((valuec: string) => this._filterCiudad(valuec))
    );
    this.filteredOptionsPais = this.form.get('pais').valueChanges.pipe(
      startWith(''),
      map((valuep: string) => this._filterPais(valuep))
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

  agregarUsuario(): void {
    console.log(this.form.value.id);
    console.log(typeof this.form.value.id);
    this.usuarioService.getAllUsuario().subscribe((datoId: any) => {
      let idencontrado = false;
      for (let i = 0 ; i < datoId.length ; i ++){
        if (this.form.value.id === datoId[i].cedula){
          idencontrado = true;
          break;
        }
      }
      if (idencontrado === true){
        this.mostrar = false;
        console.log('El usuario ya esta registrado');
        this.dialog.open(DialogErrorRegistroModeradorComponent);
      } else {
        if (this.form.value.clave.length > 7){
          console.log('ENTRO A AGREGAR');
          this.roleService.getAllRol().subscribe((datar: any) => {
            this.contadorrol = datar.length + 1;
            this.datarol = {
              id: datar.length + 1,
              cedula: this.form.value.id,
              nombre: 'paciente'
            };
            console.log(this.datarol);
            this.roleService.addRol(this.datarol).subscribe((datara: any) => {
              // AGREGAR

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
              console.log(this.datapersona);
              this.usuarioService.addUsuario(this.datapersona).subscribe( (datau: any) => {
                // console.log(datau.roles.id);
                console.log('agregado usuario');
                console.log(datau);
                this.mostrar = true;
                console.log('El registro ha sido exitoso');
                this.dialog.open(DialogRegistroModeradorComponent);
              });
              // FIN DE PERSONA
            });
          });
        } else {
          this.mostrarmensaje = true;
          // this.mensaje = 'La contraseña debe ser minimo de 8 caracteres';
        }
      }
    });
  }
  private _filterCiudad(value: string): string[] {
    const filterValue = value.toLowerCase();
    return this.optionsCiudad.filter(option => option.toLowerCase().includes(filterValue));
  }
  private _filterPais(value: string): string[] {
    const filterValue = value.toLowerCase();
    return this.optionPais.filter(option => option.toLowerCase().includes(filterValue));
  }
  onContainerClick(event: MouseEvent): void {
  }

  setDescribedByIds(ids: string[]): void {
  }
}

@Component({
  selector: 'app-dialog-registro-moderador',
  templateUrl: 'dialog-registro-moderador.html',
})
export class DialogRegistroModeradorComponent {}

@Component({
  selector: 'app-dialog-error-registro-moderador',
  templateUrl: 'dialog-error-registro-moderador.html',
})
export class DialogErrorRegistroModeradorComponent {}
