import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {AppConfig} from '../../config/config';

@Injectable({
  providedIn: 'root'
})
export class RecuperarContrasenaService {
  private url: string;
  private path: string;
  constructor( private httpClient: HttpClient, private configuracion: AppConfig) {
    console.log('servicio envio recuperar listo para usar');
    this.url = this.configuracion.configuracion.Url;
    this.path = this.configuracion.configuracion.Patch;
  }
  addCorreoRecuperar(mail: string){
    debugger;
    return this.httpClient.post(`${this.url}${this.path}/enviocontrasena`, mail);
  }
}
