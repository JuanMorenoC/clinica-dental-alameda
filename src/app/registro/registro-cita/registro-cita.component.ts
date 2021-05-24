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

/** Data structure for cita. */
export class Cita {
  constructor(
    public id: string,
    public nombre: string,
    public apellido: string,
    public email: string,
    public tipoespecialidad: string,
    public fechacita: Date,
    public hora: string
  ) {}
}

@Component({
  selector: 'app-registro-cita',
  templateUrl: './registro-cita.component.html',
  styleUrls: ['./registro-cita.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  providers: [{ provide: MatFormFieldControl, useExisting: RegistroCitaComponent }]
})
export class RegistroCitaComponent implements MatFormFieldControl<Cita>, OnInit{
  constructor(private fb: FormBuilder,
              private usuarioService: UsuarioService,
              private citaService: CitaService,
              private agendaService: AgendaService,
              public dialog: MatDialog) {
  }
  private currentYear = new Date().getFullYear();
  private currentDate = new Date();
  minDate = new Date(this.currentDate);
  maxDate = new Date(this.currentYear + 0, 11, 31);

  form: FormGroup | any;
  data: any = [];
  mostrar: any = false;

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
    });

    console.log(typeof this.form.get('hora'));
    console.log(typeof this.form);
  }
  cargarData(): void{
    this.usuarioService.getUsuario(this.form.value.id).subscribe( data => {
      console.log(data);
      this.data = data;
      console.log(this.data);
      this.form.patchValue({
        nombre: this.data.nombre,
        apellido: this.data.apellido,
        email: this.data.email,
      });
    });
  }
  crearData(): void {
    this.mostrar = true;
    console.log('creardata');
    console.log(this.form.value.fechacita.getFullYear());
    console.log(typeof this.form.value);
    this.citaService.addCita(this.form.value).subscribe( (data: any) => {
      console.log(data);
    });
    this.crearDataAgenda();
    this.dialog.open(DialogRegistroCitaComponent);
  }
  crearDataAgenda(): void{
    let cantidadAgenda = 0;
    this.agendaService.getAgenda().subscribe((dataAgendaAll: any) => {
      cantidadAgenda = dataAgendaAll.length;
      console.log('cantiad all agenda');
      console.log(dataAgendaAll.length);
      console.log('cantiad agenda');
      console.log(cantidadAgenda);
      let dataAgenda = {
        id: cantidadAgenda + 1,
        idusuario: Number(this.form.value.id),
        hora: this.form.value.hora,
        nombre: this.form.value.nombre,
        estado: 'Pendiente',
        fechacita: this.form.value.fechacita,
        odontologo: 'Ninguno'
      };
      this.agendaService.addAgenda(dataAgenda).subscribe((dataAgendaAgregar: any) => {
        console.log(dataAgendaAgregar);
      });
    });
  }
  actualizarData(): void{
    this.usuarioService.updateUsuario(this.form.value).subscribe( (data: any) => {
      console.log(data);
    });
  }

  onContainerClick(event: MouseEvent): void {
  }

  setDescribedByIds(ids: string[]): void {
  }
}

@Component({
  selector: 'app-dialog-registro-cita',
  templateUrl: 'dialog-registro-cita.html',
})
export class DialogRegistroCitaComponent {}
