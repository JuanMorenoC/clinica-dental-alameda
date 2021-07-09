import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators, NgControl, FormControl } from '@angular/forms';
import {UsuarioService} from '../Service/usuario/usuario.service';
import {RecuperarContrasenaService} from '../Service/recuperar-contrasena/recuperar-contrasena.service';

/**
 * Componente para recuperar la contraseña
 */
@Component({
  selector: 'app-recuperacion-contrasena',
  templateUrl: './recuperacion-contrasena.component.html',
  styleUrls: ['./recuperacion-contrasena.component.css']
})
export class RecuperacionContrasenaComponent implements OnInit {
  form: FormGroup | any;
  dataUsuario: any;
  constructor(private fb: FormBuilder,
              private usuarioService: UsuarioService,
              private envioCorreoService: RecuperarContrasenaService) { }

  /**
   * Metodo inicializador que hace funcionar los demas metodos que no dependen de un boton
   */
  ngOnInit(): void {
    this.builForm();
  }

  /**
   * Inicializa los formControlname
   */
  initEditForm(): void{
    this.form = this.fb.group({
      email: new FormControl(),
      clave: new FormControl(),
    });
  }
  /**
   * Validar que cada campo sea requerido
   * @private
   */
  private builForm(): void{
    this.form = this.fb.group({
      email: ['', [Validators.email]],
    });
  }
  envio(): void{
    this.usuarioService.getAllUsuario().subscribe((datau: any) => {
      for (let i = 0 ; i < datau.length ; i++){
        if (datau[i].correo === this.form.value.email){
          this.dataUsuario = {
            cedula: datau[i].cedula,
            nombre: datau[i].nombre,
            apellido: datau[i].apellido,
            seudonimo: datau[i].seudonimo,
            tipo_identificacion: datau[i].tipo_identificacion,
            correo: datau[i].correo,
            clave: datau[i].cedula,
            fecha_nacimiento: datau[i].fecha_nacimiento,
            celular: datau[i].celular,
            ciudad: datau[i].ciudad,
            departamento: datau[i].departamento,
            pais: datau[i].pais
          };
        }
      }
      this.usuarioService.updateUsuario(this.dataUsuario, this.dataUsuario.cedula).subscribe((dataup: any) => {
        this.envioCorreoService.addCorreoRecuperar(this.dataUsuario).subscribe((datae: any) => {
          window.location.reload();
        });
      });
    });
  }

}
