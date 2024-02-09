import { Component } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';
import { ShortUrlService } from './services/short-url.service';
import { HttpClient } from '@angular/common/http';
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent {
  constructor(
    private shortUrlService: ShortUrlService,
    private http: HttpClient
  ) {}
  title = 'ShortUrl';
  url: string | undefined;
  mensaje: string | undefined;

  acortarLink() {
    console.log(this.url);

    if (this.url != undefined) {
      this.http
        .post('https://backendkkk.fly.dev/url', { url: this.url })
        .subscribe(
          (response) => {
            console.log('respondio');
            console.log('Respuesta del backend:', response);
            this.mensaje = `https://backendkkk.fly.dev/url/${this.url}`;
            // Puedes mostrar un mensaje de éxito al usuario o realizar otras acciones según la respuesta
          },
          (error) => {
            // Manejar cualquier error de la solicitud
            console.error('Error al enviar la solicitud:', error);
            console.log('Norespondio');
            // Puedes mostrar un mensaje de error al usuario o realizar otras acciones
          }
        );
    }

    //si resulto
  }
}
