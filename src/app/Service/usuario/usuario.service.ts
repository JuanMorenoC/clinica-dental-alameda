import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class UsuarioService {
  private usuario: Usuario[] = [
    {
      rut: "1",
      nombre: "juan",
      apellido: "moreno",
      email: "juanmoreno@gmail.com",
      telefono: "7345263",
      celular: "311847463",
      fecha_nacimiento: "1994/05/09",
      direccion: "cll 31 # 20 - 41"
    },
    {
      rut: "2",
      nombre: "valeria",
      apellido: "rodriguez",
      email: "valerodri@gmail.com",
      telefono: "7373462",
      celular: "31198263654",
      fecha_nacimiento: "1999/04/11",
      direccion: "cll 32 # 22 - 42"
    },
    {
      rut: "3",
      nombre: "laura",
      apellido: "montoya",
      email: "lauramontoya@gmail.com",
      telefono: "73453383",
      celular: "31189383773",
      fecha_nacimiento: "2000/05/28",
      direccion: "cll 34 # 24 - 44"
    },
    {
      rut: "4",
      nombre: "katty",
      apellido: "rodriguez",
      email: "kattyrodriguez@gmail.com",
      telefono: "7345177",
      celular: "311883838",
      fecha_nacimiento: "1984/02/19",
      direccion: "cll 11 # 10 - 21"
    },
    {
      rut: "5",
      nombre: "pablo",
      apellido: "montoya",
      email: "pablomontoya@gmail.com",
      telefono: "7445263",
      celular: "3118345343",
      fecha_nacimiento: "1994/08/11",
      direccion: "cll 30 # 20 - 44"
    },
    {
      rut: "6",
      nombre: "lina",
      apellido: "moreno",
      email: "linamoreno@gmail.com",
      telefono: "7548293",
      celular: "311274006",
      fecha_nacimiento: "1996/11/09",
      direccion: "cll 21 # 20 - 44"
    }
  ];
  constructor() {
    console.log("servicio listo para usar");
  }
  getUsuario(): Usuario[]{
    return this.usuario;
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
};
