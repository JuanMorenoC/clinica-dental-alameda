import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormControl, FormGroup, NgControl} from '@angular/forms';
import {Observable} from 'rxjs';
import {NgbCarouselConfig} from '@ng-bootstrap/ng-bootstrap';
import {DomSanitizer} from '@angular/platform-browser';
import { Router, NavigationEnd } from '@angular/router';
import {filter} from 'rxjs/operators';
import {ClinicaService} from '../../Service/clinica/clinica.service';

@Component({
  selector: 'app-banner-personal',
  templateUrl: './banner-personal.component.html',
  styleUrls: ['./banner-personal.component.css']
})
export class BannerPersonalComponent implements OnInit {
  data: any = [];
  images: any[] = [];
  public previsualizacion = '';
  public loading = false;
  public archivos: any = [];

  // ANOTHER
  public selectedFiles: FileList[];
  // Es el array que contiene los items para mostrar el progreso de subida de cada archivo
  public progressInfo = [];
  public message = '';
  public imageName = '';

  constructor(private fb: FormBuilder,
              private config: NgbCarouselConfig,
              private sanitizer: DomSanitizer,
              private router: Router,
              private clinica: ClinicaService) {
    this.clinica.getAllClinica().subscribe((Response: any) => {
      let archivo = '';
      for (let i = 0; i < Response.length; i++) {
        archivo = Response[i].url;
        this.images.push(archivo);
      }
      console.log(this.images);
      console.log(this.images[0]);
      console.log(this.images[1]);
    });
    this.selectedFiles = [];
    /*
    this.images = ['../assets/img/im1.jpg',
      '../assets/img/im2.jpg', '../assets/img/im3.jpg', '../assets/img/im4.jpg'
    ];*/
    /*
    this.images = [
      {url: '../assets/img/im1.jpg'},
      {url: '../assets/img/im2.jpg'},
      {url: '../assets/img/im3.jpg'},
      {url: '../assets/img/im4.jpg'}
    ];
     */
    config.interval = 5000;
  }

  form: FormGroup | any;

  ngOnInit(): void {
    this.builForm();
  }

  initEditForm(): void {
    this.form = this.fb.group({
      img: new FormControl(),
    });
  }

  private builForm(): void {
    this.form = this.fb.group({
      img: [''],
    });
  }

  guardarImagenes(event: any): void {
    console.log('INTRO');
    this.progressInfo = [];
    event.target.files.length === 1 ? this.imageName = event.target.files[0].name : this.imageName = event.target.files.length +
      ' archivos';
    this.selectedFiles = event.target.files;
    console.log(this.selectedFiles);
    console.log('OUT');
    // Anth
  }
  guardarUrlImagenes(event: any): void {
    console.log('INTRO');
    this.progressInfo = [];
    event.target.files.length === 1 ? this.imageName = event.target.files[0].name : this.imageName = event.target.files.length +
      ' archivos';
    this.selectedFiles = event.target.files;
    console.log(this.selectedFiles);
    console.log('OUT');
    // Anth
    this.clinica.getAllClinica().subscribe((data: any) => {
      console.log(data[0].url);
      this.images.push(data[0].url);
      console.log(data[1].url);
      this.images.push(data[1].url);
    });
  }

  capturarFile(event: any): void {
    console.log('IMAGENES');
    console.log(typeof event.target.files[0].name);
    console.log(event.target.files[0].name);
    console.log(event.target.files[0].name.length);
    console.log(event.target.files);
    this.clinica.getAllClinica().subscribe((data: any) => {
      for (let i = 0; i < data.length; i++) {
        let id = data[i].idImagen;
        console.log(id);
        this.clinica.deleteClinica(id).subscribe();
      }
      for (const element of event.target.files){
        const archivoCapturado = element;
        this.extraerBase64(archivoCapturado).then((imagen: any) => {
          this.previsualizacion = imagen.base;
          this.images.push(imagen.base);
          console.log('IMAGEN YA CON BASE');
          console.log(imagen);
          console.log(typeof imagen);
          console.log(imagen.base);
          console.log(typeof imagen.base);
          console.log(imagen.base.length);
          this.cargar(imagen.base);
        });
      }
      // this.archivos.push(archivoCapturado);
      // this.images.push(event.target.files[0].name);
      console.log(this.images.length);
      console.log('IMAGEN SEGUNDA');
      console.log(this.images[1]);
    });
  }
  extraerBase64 = async ($event: any) => new Promise((resolve, reject): any => {
    try {
      const unsafeImg = window.URL.createObjectURL($event);
      const image = this.sanitizer.bypassSecurityTrustUrl(unsafeImg);
      const reader = new FileReader();
      reader.readAsDataURL($event);
      reader.onload = () => {
        resolve({
          base: reader.result
        });
      };
      reader.onerror = error => {
        resolve({
          base: null
        });
      };

    } catch (e) {
      return null;
    }
  })
  cargar(imagen: any): void {
    const contador = this.images.length;
    console.log(this.images[0]);
    console.log(typeof this.images[0]);
    if (contador === 0){
      let datosi = {
        id: 1,
        url: imagen
      };
      // this.data.push(datosi);
      this.clinica.addClinica(datosi).subscribe();
    } else {
      let datosi = {
        id: contador,
        url: imagen
      };
      // this.data.push(datosi);
      this.clinica.addClinica(datosi).subscribe((dataadd: any) => {
        window.location.reload();
      });
    }
  }

  deleteFile(file: any): void{
  }
}
