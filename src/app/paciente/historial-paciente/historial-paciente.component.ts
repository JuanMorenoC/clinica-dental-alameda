import {
  Component,
  ChangeDetectionStrategy,
  OnInit
} from '@angular/core';
import {
  FormBuilder,
  FormControl,
  FormGroup, NgControl,
  Validators
} from '@angular/forms';
import { MatFormFieldControl} from '@angular/material/form-field';
import { ProcedimientoService } from '../../Service/procedimiento/procedimiento.service';
import {OdontologoService} from '../../Service/odontologo/odontologo.service';
import {Observable} from 'rxjs';

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
  constructor(private fb: FormBuilder,
              private procedimientoService: ProcedimientoService,
              private odontologoService: OdontologoService) {
    this.odontologoService.getAllOdontologo().subscribe((datasO: any) => {
      console.log(datasO);
      for (let i = 0; i < datasO.length ; i++) {
        this.listaOdontologo.push(datasO[i].nombre);
      }
      this.listaOdontologo.push('Todos');
    });
  }

  form: FormGroup | any;
  formTabla: FormGroup | any;
  public descripcion = '';
  public odontologo = '';
  count = 0;
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
      descripcion: new FormControl(),
      odontologo: new FormControl(),
    });
  }
  private builForm(): void{
    this.form = this.fb.group({
      descripcion: [''],
      odontologo: [''],
    });
  }
  cargarData(): void{
  }
  onContainerClick(event: MouseEvent): void {
  }

  setDescribedByIds(ids: string[]): void {
  }
}
