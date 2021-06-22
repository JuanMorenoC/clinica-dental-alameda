import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {AppConfig} from '../../config/config';

@Injectable({
  providedIn: 'root'
})
export class PaisService {
  private url: string;
  private path: string;
  constructor( private httpClient: HttpClient, private configuracion: AppConfig) {
    console.log('servicio pais listo para usar');
    this.url = this.configuracion.configuracion.Url;
    this.path = this.configuracion.configuracion.Patch;
  }
  getAllPais(){
    return this.httpClient.get(`${this.url}${this.path}/paises/`);
  }
  getPais(id: number){
    return this.httpClient.get(`${this.url}${this.path}/pais/${id}`);
  }
  addPais(pais: any){
    // console.log(usuario);
    return this.httpClient.post(`${this.url}${this.path}/pais`, pais);
  }
  updatePais(pais: any){
    return this.httpClient.put(`${this.url}${this.path}/pais/${pais.id}`, pais);
  }
  deletePais(id: number) {
    return this.httpClient.delete(`${this.url}${this.path}/pais/${id}`);
  }
}
