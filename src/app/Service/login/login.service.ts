import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { AppConfig } from '../../config/config';

@Injectable({
  providedIn: 'root'
})
export class LoginService {
  private url: string;
  private path: string;
  constructor(private httpClient: HttpClient, private configuracion: AppConfig) {
    console.log('servicio login listo para usar');
    this.url = this.configuracion.configuracion.Url;
    this.path = this.configuracion.configuracion.Patch;
  }
  setUser(user: any): void {
    let user_string = JSON.stringify(user);
    localStorage.setItem('currentUser', user_string);
  }
  getCurrentUser(): any {
    let user_string = localStorage.getItem('currentUser');
    if (!(user_string === null) || !(user_string === undefined)) {
      if (typeof user_string === 'string') {
        let user = JSON.parse(user_string);
        return user;
      }
    } else {
      return null;
    }
  }
  logoutUser() {
    localStorage.removeItem("currentUser");
  }
}
