import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { AppConfig } from '../../config/config';

@Injectable({
  providedIn: 'root'
})
export class ClinicaService {
  private url: string;
  constructor( private httpClient: HttpClient, private configuracion: AppConfig) {
    console.log('servicio clinica listo para usar');
    this.url = this.configuracion.configuracion;
  }
  getClinica(id: string){
    return this.httpClient.get(`${this.url}/clinica/${id}`);
  }
  addClinica(clinica: any){
    // console.log(clinica);
    return this.httpClient.post(`${this.url}/clinica/`, clinica);
  }
  updateClinica(clinica: any){
    return this.httpClient.put(`${this.url}/clinica/${clinica.id}`, clinica);
  }
  deleteClinica(id: string) {
    return this.httpClient.delete(`${this.url}/clinica/${id}`);
  }
}
