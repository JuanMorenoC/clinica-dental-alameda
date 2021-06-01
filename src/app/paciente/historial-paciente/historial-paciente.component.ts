import {
  Component,
  ChangeDetectionStrategy,
  OnInit, ViewChild
} from '@angular/core';
import {
  FormBuilder,
  FormControl,
  FormGroup, NgControl
} from '@angular/forms';
import { MatFormFieldControl} from '@angular/material/form-field';
import { ProcedimientoService } from '../../Service/procedimiento/procedimiento.service';
import {OdontologoService} from '../../Service/odontologo/odontologo.service';
import {Observable} from 'rxjs';
import {UsuarioService} from '../../Service/usuario/usuario.service';
import {map, startWith} from 'rxjs/operators';

/** Data structure for cita. */
export class Procedimiento {
  constructor(
    public descripcion: string,
    public odontologo: string
  ) {}
}

@Component({
  selector: 'app-historial-paciente',
  templateUrl: './historial-paciente.component.html',
  styleUrls: ['./historial-paciente.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  providers: [{ provide: MatFormFieldControl, useExisting: HistorialPacienteComponent }]
})
export class HistorialPacienteComponent implements MatFormFieldControl<Procedimiento>, OnInit{
  data: any = [];
  public listaOdontologo: Array<any> = [];
  public listaUsuarios: Array<any> = [];
  public listaPaciente: Array<any> = [];
  public listaFecha: Array<any> = [];
  public listaDescripcion: Array<any> = [];
  public listaOdonto: Array<any> = [];
  public lista: Array<any> = [];
  public dataTabla: Array<any> = [];
  public dataH = new Object();
  public res: Array<any> = [];
  constructor(private fb: FormBuilder,
              private procedimientoService: ProcedimientoService,
              private odontologoService: OdontologoService,
              private usuarioService: UsuarioService) {
    this.odontologoService.getAllOdontologo().subscribe((datasO: any) => {
      console.log(datasO);
      for (let i = 0; i < datasO.length ; i++) {
        this.listaOdontologo.push(datasO[i].nombre + ' ' + datasO[i].apellido);
      }
    });
    let nombreCompleto = '';
    this.procedimientoService.getAllProcedimiento().subscribe((datap: any) => {
      for (let i = 0; i < datap.length ; i++) {
        nombreCompleto = datap[i].nombre + ' ' + datap[i].apellido;
        this.listaPaciente.push(nombreCompleto);
      }
      const dataArr = new Set(this.listaPaciente);
      this.listaUsuarios = [...dataArr];
    });
  }

  form: FormGroup | any;
  public paciente = '';
  public odontologo = '';
  count = 0;
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

  ngOnInit(): void{
    this.builForm();
  }
  log(): void {
    this.count++;
    console.log('Clicked!');
  }
  initEditForm(): void{
    this.form = this.fb.group({
      paciente: new FormControl(),
      odontologo: new FormControl(),
    });
  }
  private builForm(): void{
    this.form = this.fb.group({
      paciente: [''],
      odontologo: [''],
    });
  }
  cargarTabla(): void{
    let nombreCompleto = '';
    this.procedimientoService.getAllProcedimiento().subscribe((datap: any) => {
      for (let i = 0; i < datap.length ; i++) {
        nombreCompleto = datap[i].nombre + ' ' + datap[i].apellido;
        if (nombreCompleto === this.form.value.paciente && this.form.value.odontologo === datap[i].odontologo){
          this.dataH = [{
            date: String(datap[i].fechahora),
            describe: String(datap[i].descripcion),
            name: nombreCompleto,
            parent: String(datap[i].odontologo)
          }];
          // this.res = this.dataH;
          this.res.push(this.dataH);
        }
      }
      this.lista.push(this.dataTabla);
      console.log(this.res);
    });
  }
  onContainerClick(event: MouseEvent): void {
  }
  setDescribedByIds(ids: string[]): void {
  }
}
