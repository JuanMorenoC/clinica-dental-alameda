import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {AppConfig} from '../../config/config';

@Injectable({
  providedIn: 'root'
})
export class AgendaService {
  private url: string;
  constructor( private httpClient: HttpClient, private configuracion: AppConfig) {
    console.log('servicio agenda listo para usar');
    this.url = this.configuracion.configuracion;
  }
  getAgenda(){
    return this.httpClient.get(`${this.url}/agenda/`);
  }
  addAgenda(agenda: any){
    // console.log(agenda);
    return this.httpClient.post(`${this.url}/agenda/`, agenda);
  }
  updateAgenda(agenda: any){
    return this.httpClient.put(`${this.url}/agenda/${agenda.id}`, agenda);
  }
  deleteAgenda(id: string) {
    return this.httpClient.delete(`${this.url}/agenda/${id}`);
  }
}
