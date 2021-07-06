import {Component, OnInit} from '@angular/core';
import {LoginComponent} from './login/login.component';
import {Router} from '@angular/router';
import {LoginService} from './Service/login/login.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent{
  title = 'clinica-dental-alameda';
  public isLogged = false;
  constructor(private login: LoginComponent,
              private router: Router,
              private loginService: LoginService) {
    //this.onCheckUser();
  }
  ngOnInit(){
    // this.onCheckUser();
  }
  onCheckUser(): void {
    if (this.loginService.getCurrentUser() === null) {
      this.isLogged = false;
    } else {
      this.isLogged = true;
    }
  }
  onLogout(): void {
    this.loginService.logoutUser();
    // this.isLogged = false;
    this.router.navigate(['/home']);
  }
  reserva(): void{
    if (this.login.onSesionIniciada.sesionIniciada === true){
      this.router.navigate(['/registro/registro-cita']);
    } else {
      this.router.navigate(['/login']);
    }
  }
}
