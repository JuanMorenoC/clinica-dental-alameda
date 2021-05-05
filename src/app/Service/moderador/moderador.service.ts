import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { AppConfig } from '../../config/config';

@Injectable({
  providedIn: 'root'
})
export class ModeradorService {
  private url: string;
  constructor( private httpClient: HttpClient, private configuracion: AppConfig) {
    console.log('servicio moderador listo para usar');
    this.url = this.configuracion.configuracion;
  }
  getModerador(rut: string){
    return this.httpClient.get(`${this.url}/moderador/${rut}`);
  }
  addModerador(moderador: any){
    // console.log(moderador);
    return this.httpClient.post(`${this.url}/moderador/`, moderador);
  }
  updateModerador(moderador: any){
    return this.httpClient.put(`${this.url}/moderador/${moderador.rut}`, moderador);
  }
  deleteModerador(rut: string) {
    return this.httpClient.delete(`${this.url}/moderador/${rut}`);
  }
}
