import { NgModule } from '@angular/core';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { NosotrosComponent } from './nosotros/nosotros.component';
import { AgendaComponent } from './agenda/agenda.component';
import { HomeComponent } from './home/home.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { RegistroAdministradorComponent } from './registro/registro-administrador/registro-administrador.component';
import { RegistroCitaComponent } from './registro/registro-cita/registro-cita.component';
import { RegistroHomeComponent } from './registro/registro-home/registro-home.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RegistroPacienteComponent } from './registro/registro-paciente/registro-paciente.component';
import { NgScrollbarModule } from 'ngx-scrollbar';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatNativeDateModule } from '@angular/material/core';
import { MatInputModule } from '@angular/material/input';
import { RegistroModeradorComponent } from './registro/registro-moderador/registro-moderador.component';
import {MatCardModule} from '@angular/material/card';
import { UsuarioService } from './Service/usuario/usuario.service';
import { HttpClientModule } from '@angular/common/http';
import { AppConfig } from './config/config';
import { LoginComponent } from './login/login.component';
import {MatAutocompleteModule} from '@angular/material/autocomplete';
import { OdontologoComponent } from './odontologo/odontologo.component';
import { CalendarModule, DateAdapter } from 'angular-calendar';
import { adapterFactory } from 'angular-calendar/date-adapters/date-fns';
import { SecretariaComponent } from './secretaria/secretaria.component';
import {MatTabsModule} from '@angular/material/tabs';
import {MatSelectModule} from '@angular/material/select';
import {MatButtonModule} from '@angular/material/button';
import {MatDialogModule} from '@angular/material/dialog';
import {DialogRegistroCitaComponent} from './registro/registro-cita/registro-cita.component';
import {MatIconModule} from '@angular/material/icon';
import {DialogRegistroPacienteComponent} from './registro/registro-paciente/registro-paciente.component';
import {DialogErrorRegistroPacienteComponent} from './registro/registro-paciente/registro-paciente.component';
import { BuscarPacienteComponent } from './paciente/buscar-paciente/buscar-paciente.component';
import {MatTableModule} from '@angular/material/table';

// @ts-ignore
@NgModule({
  declarations: [
    AppComponent,
    NosotrosComponent,
    AgendaComponent,
    HomeComponent,
    RegistroAdministradorComponent,
    RegistroCitaComponent,
    RegistroHomeComponent,
    RegistroPacienteComponent,
    RegistroModeradorComponent,
    LoginComponent,
    OdontologoComponent,
    SecretariaComponent,
    DialogRegistroCitaComponent,
    DialogRegistroPacienteComponent,
    DialogErrorRegistroPacienteComponent,
    BuscarPacienteComponent
  ],
    imports: [
        BrowserModule,
        AppRoutingModule,
        NgbModule,
        FormsModule,
        ReactiveFormsModule,
        BrowserAnimationsModule,
        NgScrollbarModule,
        MatDatepickerModule,
        MatFormFieldModule,
        MatNativeDateModule,
        MatInputModule,
        HttpClientModule,
        MatCardModule,
        CalendarModule.forRoot({
            provide: DateAdapter,
            useFactory: adapterFactory,
        }),
        MatAutocompleteModule,
        MatTabsModule,
        MatSelectModule,
        MatButtonModule,
        MatDialogModule,
        MatIconModule,
        MatTableModule,
    ],
  exports: [
    MatDatepickerModule,
    MatFormFieldModule,
    MatNativeDateModule,
    MatInputModule,
    MatCardModule,
    MatAutocompleteModule,
    MatTabsModule,
    MatSelectModule,
    MatButtonModule,
    MatDialogModule,
    MatIconModule,
  ],
  providers: [ UsuarioService, AppConfig ],
  bootstrap: [AppComponent]
})
export class AppModule { }
