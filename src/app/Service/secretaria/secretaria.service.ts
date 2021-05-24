import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { AppConfig } from '../../config/config';

@Injectable({
  providedIn: 'root'
})
export class SecretariaService {
  private url: string;
  constructor( private httpClient: HttpClient, private configuracion: AppConfig) {
    console.log('servicio secretaria listo para usar');
    this.url = this.configuracion.configuracion;
  }
  getAllSecretaria(){
    return this.httpClient.get(`${this.url}/secretaria/`);
  }
  getSecretaria(id: string){
    return this.httpClient.get(`${this.url}/secretaria/${id}`);
  }
  addSecretaria(secretaria: any){
    // console.log(odontologo);
    return this.httpClient.post(`${this.url}/secretaria/`, secretaria);
  }
  updateSecretaria(secretaria: any){
    return this.httpClient.put(`${this.url}/secretaria/${secretaria.id}`, secretaria);
  }
  deleteSecretaria(id: string) {
    return this.httpClient.delete(`${this.url}/secretaria/${id}`);
  }
}
