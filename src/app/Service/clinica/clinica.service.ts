import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { AppConfigJS } from '../../config/configJS';

@Injectable({
  providedIn: 'root'
})
export class ClinicaService {
  private url: string;
  constructor( private httpClient: HttpClient, private configuracion: AppConfigJS) {
    console.log('servicio imagen listo para usar');
    this.url = this.configuracion.configuracion;
  }
  getAllClinica(){
    return this.httpClient.get(`${this.url}/imagen/`);
  }
  getClinica(id: string){
    return this.httpClient.get(`${this.url}/imagen/${id}`);
  }
  addClinica(imagen: any){
    // console.log(clinica);
    return this.httpClient.post(`${this.url}/imagen/`, imagen);
  }
  updateClinica(imagen: any){
    return this.httpClient.put(`${this.url}/imagen/${imagen.id}`, imagen);
  }
  deleteClinica(id: string) {
    return this.httpClient.delete(`${this.url}/imagen/${id}`);
  }
}
