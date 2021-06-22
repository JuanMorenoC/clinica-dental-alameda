import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {AppConfig} from '../../config/config';

@Injectable({
  providedIn: 'root'
})
export class CiudadService {
  private url: string;
  private path: string;
  constructor( private httpClient: HttpClient, private configuracion: AppConfig) {
    console.log('servicio ciudad listo para usar');
    this.url = this.configuracion.configuracion.Url;
    this.path = this.configuracion.configuracion.Patch;
  }
  getAllCiudad(){
    return this.httpClient.get(`${this.url}${this.path}/ciudades/`);
  }
  getCiudad(id: number){
    return this.httpClient.get(`${this.url}${this.path}/ciudad/${id}`);
  }
  addCiudad(ciudad: any){
    // console.log(usuario);
    return this.httpClient.post(`${this.url}${this.path}/ciudad`, ciudad);
  }
  updateCiudad(ciudad: any){
    return this.httpClient.put(`${this.url}${this.path}/ciudad/${ciudad.id}`, ciudad);
  }
  deleteCiudad(id: number) {
    return this.httpClient.delete(`${this.url}${this.path}/ciudad/${id}`);
  }
}
