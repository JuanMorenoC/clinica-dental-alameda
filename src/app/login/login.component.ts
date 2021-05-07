import { Component, OnInit } from '@angular/core';
import {FormGroup, FormControl, Validators} from '@angular/forms';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  constructor() { }

  loginForm = new FormGroup({
    email: new FormControl('', Validators.required),
    password : new FormControl('', Validators.required)
  });


  // tslint:disable-next-line:typedef
  ngOnInit(){
  }

  // tslint:disable-next-line:typedef
  onLogin(form: any) {
    console.log('Form', form);
  }
}
