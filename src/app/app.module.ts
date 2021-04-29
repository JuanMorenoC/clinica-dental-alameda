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
import { PerfectScrollbarModule, PERFECT_SCROLLBAR_CONFIG, PerfectScrollbarConfigInterface } from 'ngx-perfect-scrollbar';
import { NgScrollbarModule } from 'ngx-scrollbar';


const DEFAULT_PERFECT_SCROLLBAR_CONFIG: PerfectScrollbarConfigInterface = {
  suppressScrollX: true
};

@NgModule({
  declarations: [
    AppComponent,
    NosotrosComponent,
    AgendaComponent,
    HomeComponent,
    RegistroAdministradorComponent,
    RegistroCitaComponent,
    RegistroHomeComponent,
    RegistroPacienteComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    NgbModule,
    FormsModule,
    ReactiveFormsModule,
    BrowserAnimationsModule,
    PerfectScrollbarModule,
    NgScrollbarModule
  ],
  providers: [
    {
      provide: PERFECT_SCROLLBAR_CONFIG,
      useValue: DEFAULT_PERFECT_SCROLLBAR_CONFIG
    }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
