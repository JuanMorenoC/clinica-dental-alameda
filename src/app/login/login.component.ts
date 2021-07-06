import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators, FormControl } from '@angular/forms';
import {UsuarioService} from '../Service/usuario/usuario.service';
import {RoleService} from '../Service/role/role.service';
import {LoginService} from '../Service/login/login.service';
import {Router} from '@angular/router';

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
  resolved(captchaResponse: string) {
    console.log(`Resolved captcha with response: ${captchaResponse}`);
  }

  // siteKey = '';
  loginForm: FormGroup | any;
  constructor(private fb: FormBuilder,
              private usuarioService: UsuarioService,
              private roleService: RoleService,
              private loginService: LoginService,
              private router: Router) {
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
    this.roleService.getAllRol().subscribe((datar: any) => {
      this.usuarioService.getAllUsuario().subscribe((datau: any) => {
        for (let i = 0 ; i < datar.length ; i++ ){
          for (let j = 0 ; j < datau.length ; j++ ){
            if (datau[j].correo === this.loginForm.value.email && datau[j].clave === this.loginForm.value.password){
              if (datar[i].cedula === datau[j].cedula && datar[i].nombre === 'paciente'){
                /*
                let data = {
                  email: this.loginForm.value.email,
                  password: this.loginForm.value.password
                };
                this.loginService.setUser(data);
                 */
                this.router.navigate(['/paciente/paciente-home']);
              }
              if (datar[i].cedula === datau[j].cedula && datar[i].nombre === 'administrador'){
                this.router.navigate(['/administrador']);
              }
              if (datar[i].cedula === datau[j].cedula && datar[i].nombre === 'odontologo'){
                this.router.navigate(['/odontologo']);
              }
              if (datar[i].cedula === datau[j].cedula && datar[i].nombre === 'secretaria'){
                this.router.navigate(['/secretaria']);
              }
            }
          }
        }
      });
    });
  }
  public get onSesionIniciada(): any{
    return this.sesionIniciada;
  }
}
