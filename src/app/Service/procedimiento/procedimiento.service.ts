import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { AppConfig } from '../../config/config';

@Injectable({
  providedIn: 'root'
})
export class ProcedimientoService {
  private url: string;
  constructor( private httpClient: HttpClient, private configuracion: AppConfig) {
    console.log('servicio procedimiento listo para usar');
    this.url = this.configuracion.configuracion;
  }
  getProcedimiento(id: string){
    return this.httpClient.get(`${this.url}/procedimiento/${id}`);
  }
  addProcedimiento(procedimiento: any){
    // console.log(procedimiento);
    return this.httpClient.post(`${this.url}/procedimiento/`, procedimiento);
  }
  updateProcedimiento(procedimiento: any){
    return this.httpClient.put(`${this.url}/procedimiento/${procedimiento.id}`, procedimiento);
  }
  deleteProcedimiento(id: string) {
    return this.httpClient.delete(`${this.url}/procedimiento/${id}`);
  }
}
