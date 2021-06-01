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
import { UsuarioService } from '../../Service/usuario/usuario.service';
import { CitaService } from '../../Service/cita/cita.service';
import { AgendaService } from '../../Service/agenda/agenda.service';
import {Observable} from 'rxjs';
import {MatDialog} from '@angular/material/dialog';
import {DialogErrorBuscarPacienteComponent} from '../../paciente/buscar-paciente/buscar-paciente.component';

/** Data structure for cita. */
export class Cita {
  constructor(
    public id: string,
    public nombre: string,
    public apellido: string,
    public email: string,
    public tipoespecialidad: string,
    public fechacita: Date,
    public hora: string,
    public estado: string
  ) {}
}

@Component({
  selector: 'app-confirmar-cita',
  templateUrl: './confirmar-cita.component.html',
  styleUrls: ['./confirmar-cita.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  providers: [{ provide: MatFormFieldControl, useExisting: ConfirmarCitaComponent }]
})
export class ConfirmarCitaComponent implements MatFormFieldControl<Cita>, OnInit{
  data: any = [];
  constructor(private fb: FormBuilder,
              private usuarioService: UsuarioService,
              private citaService: CitaService,
              private agendaService: AgendaService,
              public dialog: MatDialog) {
  }

  form: FormGroup | any;
  mostrar: any = false;
  public ident = 0;
  public nombre = '';
  public apellido = '';
  public email = '';
  public tipoespecialidad = '';
  public fechacita = new Date();
  public hora = '';
  public estado = '';

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


  initEditForm(): void{
    this.form = this.fb.group({
      id: new FormControl(),
      nombre: new FormControl(),
      apellido: new FormControl(),
      email: new FormControl(),
      tipoespecialidad: new FormControl(),
      fechacita: new FormControl(),
      hora: new FormControl(),
      estado: new FormControl(),
      estadonuevo: new FormControl(),
    });
  }
  private builForm(): void{
    this.form = this.fb.group({
      id: ['', [Validators.required]],
      nombre: ['', [Validators.required]],
      apellido: ['', [Validators.required]],
      email: ['', [Validators.required, Validators.email]],
      tipoespecialidad: ['', [Validators.required]],
      fechacita: ['', [Validators.required]],
      hora: ['', [Validators.required]],
      estado: ['', [Validators.required]],
      estadonuevo: ['', [Validators.required]],
    });

    console.log(typeof this.form.get('hora'));
    console.log(typeof this.form);
  }
  cargarData(): void{
    this.usuarioService.getAllUsuario().subscribe((datoId: any) => {
      let idencontrado = false;
      for (let i = 0 ; i < datoId.length ; i ++){
        if (this.form.value.id === datoId[i].id){
          idencontrado = true;
          break;
        }
      }
      if (idencontrado === false){
        this.dialog.open(DialogErrorConfirmarCitaComponent);
      } else {
        let id = '';
        this.citaService.getAllCita().subscribe( (dataAll: any) => {
          for (let i = 0; i < dataAll.length; i++) {
            if (this.form.value.id === dataAll[i].idusuario){
              id = String(dataAll[i].id);
            }
          }
          this.citaService.getCita(id).subscribe( data => {
            console.log(data);
            this.data = data;
            console.log(this.data);
            this.form.patchValue({
              nombre: this.data.nombre,
              apellido: this.data.apellido,
              email: this.data.email,
              tipoespecialidad: this.data.tipoespecialidad,
              fechacita: this.data.fechacita,
              hora: this.data.hora,
            });
          });
          this.agendaService.getAgenda().subscribe((datas: any) => {
            for (let i = 0 ; i < datas.length; i++){
              if (datas[i].idusuario === this.form.value.id){
                this.form.patchValue({
                  estado: datas[i].estado,
                });
              }
            }
          });
        });
      }
    });
  }
  actualizarEstadoConfirmado(): void {
    this.usuarioService.getAllUsuario().subscribe((datoId: any) => {
      let idencontrado = false;
      for (let i = 0 ; i < datoId.length ; i ++){
        if (this.form.value.id === datoId[i].id){
          idencontrado = true;
          break;
        }
      }
      if (idencontrado === false){
        this.dialog.open(DialogErrorConfirmarCitaComponent);
      } else {
        let dataAgenda = {};
        this.agendaService.getAgenda().subscribe((dataAgendaAll: any) => {
          for (let n = 0 ; n < dataAgendaAll.length ; n++){
            if (dataAgendaAll[n].idusuario === this.form.value.id){
              dataAgenda = {
                id: dataAgendaAll[n].id,
                idusuario: dataAgendaAll[n].idusuario,
                hora: dataAgendaAll[n].hora,
                nombre: dataAgendaAll[n].nombre,
                estado: this.form.value.estado,
                fechacita: dataAgendaAll[n].fechacita,
                odontologo: dataAgendaAll[n].odontologo,
              };
            }
          }
          this.agendaService.updateAgenda(dataAgenda).subscribe((dataAgendaAgregar: any) => {
            console.log(dataAgendaAgregar);
            this.dialog.open(DialogConfirmarCitaComponent);
          });
        });
      }
    });
  }
  confirmarCita(): void{
  }
  onContainerClick(event: MouseEvent): void {
  }

  setDescribedByIds(ids: string[]): void {
  }
}

@Component({
  selector: 'app-dialog-confirmar-cita',
  templateUrl: 'dialog-confirmar-cita.html',
})
export class DialogConfirmarCitaComponent {}

@Component({
  selector: 'app-dialog-error-confirmar-cita',
  templateUrl: 'dialog-error-confirmar-cita.html',
})
export class DialogErrorConfirmarCitaComponent {}
