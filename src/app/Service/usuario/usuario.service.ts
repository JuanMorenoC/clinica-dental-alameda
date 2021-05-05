import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { AppConfig } from '../../config/config';

@Injectable({
  providedIn: 'root'
})
export class UsuarioService {
  private usuario: Usuario[] = [];
  private url: string;
  constructor( private httpClient: HttpClient, private configuracion: AppConfig) {
    console.log('servicio usuario listo para usar');
    this.url = this.configuracion.configuracion;
  }
  getUsuario(rut: string){
    return this.httpClient.get(`${this.url}/usuario/${rut}`);
  }
  addUsuario(usuario: any){
    // console.log(usuario);
    return this.httpClient.post(`${this.url}/usuario/`, usuario);
  }
  updateUsuario(usuario: any){
    return this.httpClient.put(`${this.url}/usuario/${usuario.rut}`, usuario);
  }
  deleteUsuario(rut: string) {
    return this.httpClient.delete(`${this.url}/usuario/${rut}`);
  }
}
export interface Usuario{
  rut: string;
  nombre: string;
  apellido: string;
  email: string;
  telefono: string;
  celular: string;
  fecha_nacimiento: string;
  direccion: string;
}
