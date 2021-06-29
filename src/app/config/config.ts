import { Injectable } from '@angular/core';


@Injectable()
export class AppConfig{

  private configuracionj = '';
  private _configuracion: any;
  private path: any;

  constructor() {
    this.initConfiguracion();
  }

  /**
   * Trae la url del backend
   * @private
   */
  private initConfiguracion(): void{
    // this.configuracionj = 'http://localhost:3000';
    this._configuracion = {
      Url: 'http://localhost:8080',
      Patch: '/api'
    };
  }

  public get configuracion(): any{
    return this._configuracion;
  }


}
