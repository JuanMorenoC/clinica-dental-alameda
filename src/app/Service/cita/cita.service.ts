import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { AppConfig } from '../../config/config';

@Injectable({
  providedIn: 'root'
})
export class CitaService {
  private url: string;
  constructor( private httpClient: HttpClient, private configuracion: AppConfig) {
    console.log('servicio cita listo para usar');
    this.url = this.configuracion.configuracion;
  }
  getAllCita(){
    return this.httpClient.get(`${this.url}/cita/`);
  }
  getCita(id: string){
    return this.httpClient.get(`${this.url}/cita/${id}`);
  }
  addCita(cita: any){
    // console.log(cita);
    return this.httpClient.post(`${this.url}/cita/`, cita);
  }
  updateCita(cita: any){
    return this.httpClient.put(`${this.url}/cita/${cita.id}`, cita);
  }
  deleteCita(id: string) {
    return this.httpClient.delete(`${this.url}/cita/${id}`);
  }
}
