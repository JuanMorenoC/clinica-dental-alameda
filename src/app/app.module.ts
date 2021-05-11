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
import { NgbTimepickerModule } from '@ng-bootstrap/ng-bootstrap';
import { MatNativeDateModule } from '@angular/material/core';
import { MatInputModule } from '@angular/material/input';
import { NavbarComponent } from './navbar/navbar.component';
import { RegistroModeradorComponent } from './registro/registro-moderador/registro-moderador.component';
import {MatCardModule} from '@angular/material/card';

import { UsuarioService } from './Service/usuario/usuario.service';
import { HttpClientModule } from '@angular/common/http';
import { AppConfig } from './config/config';
import { LoginComponent } from './login/login.component';

// FullCalendar
import { FullCalendarModule } from '@fullcalendar/angular';
import dayGridPlugin from '@fullcalendar/daygrid';
import timeGridPlugin from '@fullcalendar/timegrid';
import listPlugin from '@fullcalendar/list';
import interactionPlugin from '@fullcalendar/interaction';

FullCalendarModule.registerPlugins([
  dayGridPlugin,
  timeGridPlugin,
  listPlugin,
  interactionPlugin
])


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
    NavbarComponent,
    RegistroModeradorComponent,
    LoginComponent
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
    NgbTimepickerModule,
    MatNativeDateModule,
    MatInputModule,
    HttpClientModule,
    MatCardModule,
    FullCalendarModule
  ],
  providers: [ UsuarioService, AppConfig ],
  bootstrap: [AppComponent]
})
export class AppModule { }
