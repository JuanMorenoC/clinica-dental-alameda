import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators, NgControl, FormControl } from '@angular/forms';

@Component({
  selector: 'app-recuperacion-contrasena',
  templateUrl: './recuperacion-contrasena.component.html',
  styleUrls: ['./recuperacion-contrasena.component.css']
})
export class RecuperacionContrasenaComponent implements OnInit {
  form: FormGroup | any;
  constructor(private fb: FormBuilder) { }

  ngOnInit(): void {
  }

  initEditForm(): void{
    this.form = this.fb.group({
      email: new FormControl(),
      clave: new FormControl(),
    });
  }
  private builForm(): void{
    this.form = this.fb.group({
      email: ['', [Validators.email]],
    });
  }
  envio(): void{
  }

}
