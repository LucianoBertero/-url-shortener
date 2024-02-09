import { Component, HostListener } from '@angular/core';
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
    // this.verificarExistenciaPagina(this.url || '');
    // return;
    if (this.url != undefined) {
      this.http
        .post('https://backendkkk.fly.dev/url', { url: this.url })
        .subscribe(
          (response: any) => {
            console.log('respondio');
            console.log('Respuesta del backend:', response);
            this.mensaje = `https://backendkkk.fly.dev/${response.id}`;
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
  mensajeCopiado: boolean = false;

  copiarMensaje(mensaje: string) {
    const el = document.createElement('textarea');
    el.value = mensaje;
    document.body.appendChild(el);
    el.select();
    document.execCommand('copy');
    document.body.removeChild(el);
    this.mensajeCopiado = true;

    // Reiniciar el mensaje después de 3 segundos
    setTimeout(() => {
      this.mensajeCopiado = false;
    }, 1500);
  }

  verificarExistenciaPagina(url: string): Promise<boolean> {
    return this.http
      .head(url)
      .toPromise()
      .then((response) => {
        console.log('si existe');
        return true;
      })
      .catch((error) => false);
  }
}
