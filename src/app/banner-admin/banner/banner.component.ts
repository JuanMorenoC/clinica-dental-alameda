import { Component, OnInit } from '@angular/core';
import {NgbCarouselConfig} from '@ng-bootstrap/ng-bootstrap';
import {ClinicaService} from '../../Service/clinica/clinica.service';

@Component({
  selector: 'app-banner',
  templateUrl: './banner.component.html',
  styleUrls: ['./banner.component.css']
})
export class BannerComponent implements OnInit {
  images: any[] = [];
  constructor(private config: NgbCarouselConfig, private clinica: ClinicaService) {
    /*
    this.images = [
      {url: '../assets/img/im1.jpg'},
      {url: '../assets/img/im2.jpg'},
      {url: '../assets/img/im3.jpg'},
      {url: '../assets/img/im4.jpg'}
      ];
     */
    this.clinica.getAllClinica().subscribe((Response: any) => {
      let archivo = '';
      for (let i = 0; i < Response.length; i++) {
        archivo = Response[i].url;
        this.images.push(archivo);
      }
    });
    config.interval = 5000;
  }

  ngOnInit(): void {
  }

}
