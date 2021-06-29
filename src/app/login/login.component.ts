import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators, FormControl } from '@angular/forms';
import {UsuarioService} from '../Service/usuario/usuario.service';
import {RoleService} from '../Service/role/role.service';
import {Router} from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  resolved(captchaResponse: string) {
    console.log(`Resolved captcha with response: ${captchaResponse}`);
  }
  // siteKey = '';
  loginForm: FormGroup | any;
  constructor(private fb: FormBuilder,
              private usuarioService: UsuarioService,
              private roleService: RoleService,
              private router: Router) {
    // this.siteKey = '6Lec7lgbAAAAAO9J6NhTu3gDipR4v8S48z3gQ1Pl';
  }
  // rutae: string[] = ['/moderador', '/odontologo', '/secretaria', '/paciente/paciente-home'];
  ruta = '';
  initEditForm(): void{
    this.loginForm = this.fb.group({
      // recaptcha: new FormControl(),
      email: new FormControl(),
      password: new FormControl(),
    });
  }
  private builForm(): void{
    this.loginForm = this.fb.group({
      // recaptcha: ['', [Validators.required]],
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required]],
    });
  }

  // tslint:disable-next-line:typedef
  ngOnInit(){
    this.builForm();
  }

  onLogin(form: any): void{
    this.roleService.getAllRol().subscribe((datar: any) => {
      this.usuarioService.getAllUsuario().subscribe((datau: any) => {
        for (let i = 0 ; i < datar.length ; i++ ){
          for (let j = 0 ; j < datau.length ; j++ ){
            if (datau[j].correo === this.loginForm.value.email && datau[j].clave === this.loginForm.value.password){
              if (datar[i].cedula === datau[j].cedula && datar[i].nombre === 'paciente'){
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
    console.log('Form', form);
  }
}
