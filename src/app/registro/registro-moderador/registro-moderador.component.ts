import { Component, ChangeDetectionStrategy, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators, NgControl, FormControl } from '@angular/forms';
import { ModeradorService } from '../../Service/moderador/moderador.service';
import {Observable} from 'rxjs';
import { MatFormFieldControl} from '@angular/material/form-field';
import {MatDialog} from '@angular/material/dialog';
import {UsuarioService} from '../../Service/usuario/usuario.service';
import {CiudadService} from '../../Service/ciudad/ciudad.service';
import {DepartamentoService} from '../../Service/departamento/departamento.service';
import {PaisService} from '../../Service/pais/pais.service';
import {RoleService} from '../../Service/role/role.service';
import {map, startWith} from 'rxjs/operators';

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
  mostrar: any = false;
  mensaje = '';
  hide = true;
  contadorciudad = 0;
  contadordepartamento = 0;
  contadorpais = 0;
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
  public filteredOptions: Observable<string[]> = new Observable<string[]>();
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
    this.filteredOptions = this.form.get('ciudad').valueChanges.pipe(
      startWith(''),
      map((value: string) => this._filterCiudad(value))
    );
    this.filteredOptionsPais = this.form.get('pais').valueChanges.pipe(
      startWith(''),
      map((value: string) => this._filterPais(value))
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

  agregarModerador(): void {
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
        this.mensaje = 'El usuario ya esta registrado';
        this.mostrar = false;
        console.log(this.mensaje);
        this.dialog.open(DialogErrorRegistroModeradorComponent);
      } else {
        console.log('ENTRO A AGREGAR');
        let datarol = {
          nombre: 'paciente'
        };
        this.roleService.addRol(datarol).subscribe();
        this.paisSerice.getAllPais().subscribe((datagp: any) => {
          this.contadorpais = datagp.length;
          let datapais = {
            pais_id: this.contadorpais + 1,
            nombre: this.form.value.pais
          };
          this.paisSerice.addPais(datapais).subscribe( (datapa: any) => {
            console.log('agregado');
            console.log(datapa);
            this.paisSerice.getAllPais().subscribe((dataallpais: any) => {
              const conteopais = dataallpais.length - 1;
              // AGREGAR
              this.departamentoSerice.getAllDepartamento().subscribe((datagd: any) => {
                this.contadordepartamento = datagd.length;
                let datadepartamento = {
                  departamento_id: this.contadordepartamento + 1,
                  nombre: this.form.value.departamento,
                  pais_id: conteopais,
                };
                this.departamentoSerice.addDepartamento(datadepartamento).subscribe( (datad: any) => {
                  console.log('agregado');
                  console.log(datad);
                  this.departamentoSerice.getAllDepartamento().subscribe((dataalldepart: any) => {
                    const conteodepart = dataalldepart.length - 1;
                    // AGREGAR
                    this.ciudadSerice.getAllCiudad().subscribe((datagc: any) => {
                      this.contadorciudad = datagc.length;
                      let dataciudad = {
                        ciudad_id: this.contadorciudad + 1,
                        nombre: this.form.value.ciudad,
                        departamento_id: conteodepart,
                      };
                      this.ciudadSerice.addCiudad(dataciudad).subscribe( (datac: any) => {
                        console.log('agregado');
                        console.log(datac);
                        this.ciudadSerice.getAllCiudad().subscribe((dataallciudad: any) => {
                          const conteociudad = dataallciudad.length - 1;
                          // AGREGAR
                          let datapersona = {
                            cedula: this.form.value.id,
                            apellido: this.form.value.apellido,
                            celular: this.form.value.celular,
                            clave: this.form.value.clave,
                            correo: this.form.value.email,
                            fechanacimiento: this.form.value.fechanacimiento,
                            nombre: this.form.value.nombre,
                            seudonimo: this.form.value.seudonimo,
                            tipoidentificacion: this.form.value.tipoidentificacion,
                            ciudad_id: conteociudad
                          };
                          this.usuarioService.addUsuario(datapersona).subscribe( (datau: any) => {
                            console.log('agregado');
                            console.log(datau);
                            this.mensaje = 'El registro ha sido exitoso';
                            this.mostrar = true;
                            console.log(this.mensaje);
                            this.dialog.open(DialogRegistroModeradorComponent);
                          });
                        });
                      });
                    });
                  });
                });
              });
            });
          });
        });
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
