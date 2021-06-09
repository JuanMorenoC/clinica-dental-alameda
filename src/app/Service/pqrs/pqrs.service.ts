import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {AppConfig} from '../../config/config';

@Injectable({
  providedIn: 'root'
})
export class PqrsService {
  private url: string;
  private path: string;
  constructor( private httpClient: HttpClient, private configuracion: AppConfig) {
    console.log('servicio pqrs listo para usar');
    this.url = this.configuracion.configuracion.Url;
    this.path = this.configuracion.configuracion.Patch;
  }
  getAllPqrs(){
    return this.httpClient.get(`${this.url}${this.path}/pqrss`);
  }
  getPqrs(id: number){
    return this.httpClient.get(`${this.url}${this.path}/pqrs/${id}`);
  }
  addPqrs(pqrs: any){
    return this.httpClient.post(`${this.url}${this.path}/pqrs`, pqrs);
  }
  updatePqrs(pqrs: any){
    return this.httpClient.put(`${this.url}${this.path}/pqrs/${pqrs.id}`, pqrs);
  }
  deletePqrs(id: number) {
    return this.httpClient.delete(`${this.url}${this.path}/pqrs/${id}`);
  }
}
