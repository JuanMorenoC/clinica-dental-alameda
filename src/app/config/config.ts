import { Injectable } from '@angular/core';


@Injectable()
export class AppConfig{

  private _configuracion: any;

  constructor() {
    this.initConfiguracion();
  }



  private initConfiguracion(): void{
    this._configuracion = 'http://localhost:3000';
    // this._configuracion = 'jdbc:mysql://localhost:3306/clinica?serverTimezone=UTC';
  }


  public get configuracion(): any{
    return this._configuracion;
  }


}
