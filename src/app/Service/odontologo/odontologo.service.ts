import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { AppConfig } from '../../config/config';

@Injectable({
  providedIn: 'root'
})
export class OdontologoService {
  private url: string;
  constructor( private httpClient: HttpClient, private configuracion: AppConfig) {
    console.log('servicio odontologo listo para usar');
    this.url = this.configuracion.configuracion;
  }
  getAllOdontologo(){
    return this.httpClient.get(`${this.url}/odontologo/`);
  }
  getOdontologo(id: string){
    return this.httpClient.get(`${this.url}/odontologo/${id}`);
  }
  addOdontologo(odontologo: any){
    // console.log(odontologo);
    return this.httpClient.post(`${this.url}/odontologo/`, odontologo);
  }
  updateOdontologo(odontologo: any){
    return this.httpClient.put(`${this.url}/odontologo/${odontologo.id}`, odontologo);
  }
  deleteOdontologo(id: string) {
    return this.httpClient.delete(`${this.url}/odontologo/${id}`);
  }
}
