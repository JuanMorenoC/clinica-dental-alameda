import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {AppConfig} from '../../config/config';

@Injectable({
  providedIn: 'root'
})
export class DepartamentoService {
  private url: string;
  private path: string;
  constructor( private httpClient: HttpClient, private configuracion: AppConfig) {
    console.log('servicio departamento listo para usar');
    this.url = this.configuracion.configuracion.Url;
    this.path = this.configuracion.configuracion.Patch;
  }
  getAllDepartamento(){
    return this.httpClient.get(`${this.url}${this.path}/departamentos/`);
  }
  getDepartamento(id: number){
    return this.httpClient.get(`${this.url}${this.path}/departamento/${id}`);
  }
  addDepartamento(departamento: any){
    // console.log(usuario);
    return this.httpClient.post(`${this.url}${this.path}/departamento`, departamento);
  }
  updateDepartamento(departamento: any){
    return this.httpClient.put(`${this.url}${this.path}/departamento/${departamento.id}`, departamento);
  }
  deleteDepartamento(id: number) {
    return this.httpClient.delete(`${this.url}${this.path}/departamento/${id}`);
  }
}
