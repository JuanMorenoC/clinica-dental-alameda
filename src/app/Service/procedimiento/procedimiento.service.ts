import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { AppConfig } from '../../config/config';

@Injectable({
  providedIn: 'root'
})
export class ProcedimientoService {
  private url: string;
  private path: string;
  constructor( private httpClient: HttpClient, private configuracion: AppConfig) {
    console.log('servicio procedimiento listo para usar');
    this.url = this.configuracion.configuracion.Url;
    this.path = this.configuracion.configuracion.Patch;
  }
  getAllProcedimiento(){
    return this.httpClient.get(`${this.url}${this.path}/procedimientos/`);
  }
  getProcedimiento(id: string){
    return this.httpClient.get(`${this.url}${this.path}/procedimiento/${id}`);
  }
  addProcedimiento(procedimiento: any){
    // console.log(procedimiento);
    return this.httpClient.post(`${this.url}${this.path}/procedimiento/`, procedimiento);
  }
  updateProcedimiento(procedimiento: any){
    return this.httpClient.put(`${this.url}${this.path}/procedimiento/${procedimiento.id}`, procedimiento);
  }
  deleteProcedimiento(id: string) {
    return this.httpClient.delete(`${this.url}${this.path}/procedimiento/${id}`);
  }
}
