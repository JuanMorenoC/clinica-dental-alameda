import { Component, OnInit, Output} from '@angular/core';
import { FormBuilder, FormGroup, Validators, FormControl } from '@angular/forms';
import {UsuarioService} from '../Service/usuario/usuario.service';
import {RoleService} from '../Service/role/role.service';
import {LoginService} from '../Service/login/login.service';
import {Router} from '@angular/router';
import {MatDialog} from '@angular/material/dialog';

/**
 * Componente del login
 */
@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  sesionIniciada = false;
  mensajeEnviar = '';
  resolved(captchaResponse: string) {
    console.log(`Resolved captcha with response: ${captchaResponse}`);
  }

  // siteKey = '';
  loginForm: FormGroup | any;
  constructor(private fb: FormBuilder,
              private usuarioService: UsuarioService,
              private roleService: RoleService,
              private loginService: LoginService,
              private router: Router,
              public dialog: MatDialog) {
    // this.siteKey = '6Lec7lgbAAAAAO9J6NhTu3gDipR4v8S48z3gQ1Pl';
  }
  ruta = '';

  /**
   * Inicializa los campos de texto
   */
  initEditForm(): void{
    this.loginForm = this.fb.group({
      // recaptcha: new FormControl(),
      email: new FormControl(),
      password: new FormControl(),
    });
  }

  /**
   * Valida que los campos sean requeridos
   * @private
   */
  private builForm(): void{
    this.loginForm = this.fb.group({
      // recaptcha: ['', [Validators.required]],
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required]],
    });
  }

  /**
   * Metodo inicializador que hace funcionar los demas metodos que no dependen de un boton
   */
  ngOnInit(){
    this.builForm();
  }

  /**
   * Metodo que valida si se puede loguear o no
   * @param form - formulario
   */
  onLogin(form: any): void{
    this.sesionIniciada = false;
    this.roleService.getAllRol().subscribe((datar: any) => {
      this.usuarioService.getAllUsuario().subscribe((datau: any) => {
        for (let i = 0 ; i < datar.length ; i++ ){
          for (let j = 0 ; j < datau.length ; j++ ){
            if (datau[j].correo === this.loginForm.value.email && datau[j].clave === this.loginForm.value.password){
              this.sesionIniciada = true;
              if (datar[i].cedula === datau[j].cedula && datar[i].nombre === 'paciente'){
                let correo = this.loginForm.value.email;
                let data = {
                  email: this.loginForm.value.email,
                  password: this.loginForm.value.password
                };
                this.loginService.setUser(correo);
                const token = data;
                this.loginService.setToken(token);
                this.router.onSameUrlNavigation = 'reload';
                this.router.navigateByUrl('/paciente/paciente-home').then(() => {
                  window.location.reload();
                });
              }
              if (datar[i].cedula === datau[j].cedula && datar[i].nombre === 'administrador'){
                let correo = this.loginForm.value.email;
                let data = {
                  email: this.loginForm.value.email,
                  password: this.loginForm.value.password
                };
                this.loginService.setUser(correo);
                const token = data;
                this.loginService.setToken(token);
                this.router.onSameUrlNavigation = 'reload';
                this.router.navigateByUrl('/administrador').then(() => {
                  window.location.reload();
                });
              }
              if (datar[i].cedula === datau[j].cedula && datar[i].nombre === 'odontologo'){
                let correo = this.loginForm.value.email;
                let data = {
                  email: this.loginForm.value.email,
                  password: this.loginForm.value.password
                };
                this.loginService.setUser(correo);
                const token = data;
                this.loginService.setToken(token);
                this.router.onSameUrlNavigation = 'reload';
                this.router.navigateByUrl('/odontologo').then(() => {
                  window.location.reload();
                });
              }
              if (datar[i].cedula === datau[j].cedula && datar[i].nombre === 'secretaria'){
                let correo = this.loginForm.value.email;
                let data = {
                  email: this.loginForm.value.email,
                  password: this.loginForm.value.password
                };
                this.loginService.setUser(correo);
                const token = data;
                this.loginService.setToken(token);
                this.router.onSameUrlNavigation = 'reload';
                this.router.navigateByUrl('/secretaria').then(() => {
                  window.location.reload();

                });
              }
            }
          }
        }
        if (this.sesionIniciada === false){
          // alert('Email y Contraseña no coinciden');
          this.dialog.open(DialogErrorLoginComponent);
        }
      });
    });
  }
  public get onSesionIniciada(): any{
    return this.sesionIniciada;
  }
}

@Component({
  selector: 'app-dialog-error-login',
  templateUrl: 'dialog-error-login.html',
})
export class DialogErrorLoginComponent {}
