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
    if (this.url != undefined || this.url === '') {
      if (this.url && /\.com$/.test(this.url)) {
        // La URL es válida y tiene la terminación ".com"
      } else {
        this.mensaje = 'URL no válida';
        return;
      }
      const urlConProtocolo = this.corregirURL(this.url);
      console.log(urlConProtocolo);

      this.http
        .post('https://backendkkk.fly.dev/url', { url: urlConProtocolo })
        .subscribe(
          (response: any) => {
            console.log('respondio');
            console.log('Respuesta del backend:', response);
            this.mensaje = `https://backendkkk.fly.dev/${response.id}`;
            // Puedes mostrar un mensaje de éxito al usuario o realizar otras acciones según la respuesta
          },
          (error) => {
            if (
              error.status === 400 &&
              error.error.error === 'La URL no es válida'
            ) {
              this.mensaje = 'URL no válida';
            } else {
              this.mensaje = 'Error al procesar la solicitud';
            }
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

  corregirURL(url: string): string {
    // Verificar si la URL comienza con "www."
    if (url.startsWith('www.')) {
      // Agregar el protocolo "https://" al principio de la URL
      return 'https://' + url;
    } else if (!url.startsWith('http://') && !url.startsWith('https://')) {
      // Si la URL no comienza con "http://" ni "https://", agregar "https://" al principio
      return 'https://www.' + url;
    }
    // Si la URL ya tiene el protocolo, devolver la misma URL sin cambios
    return url;
  }
}
