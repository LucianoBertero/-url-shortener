import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class ShortUrlService {
  constructor(private http: HttpClient) {}

  acortar(url: string) {
    console.log('entro');
    this.http.post('https://backendkkk.fly.dev/', { url: url }).subscribe(
      (response) => {
        console.log('respondio');
        console.log('Respuesta del backend:', response);
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
}
