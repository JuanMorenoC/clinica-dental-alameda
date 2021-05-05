import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { AppConfig } from '../../config/config';

@Injectable({
  providedIn: 'root'
})
export class AdministradorService {
  private url: string;
  constructor( private httpClient: HttpClient, private configuracion: AppConfig) {
    console.log('servicio administrador listo para usar');
    this.url = this.configuracion.configuracion;
  }
  getAdministrador(rut: string){
    return this.httpClient.get(`${this.url}/administrador/${rut}`);
  }
  addAdministrador(administrador: any){
    // console.log(administrador);
    return this.httpClient.post(`${this.url}/administrador/`, administrador);
  }
  updateAdministrador(administrador: any){
    return this.httpClient.put(`${this.url}/administrador/${administrador.rut}`, administrador);
  }
  deleteAdministrador(rut: string) {
    return this.httpClient.delete(`${this.url}/administrador/${rut}`);
  }
}
