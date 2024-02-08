import { Component } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';
import { ShortUrlService } from './services/short-url.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent {
  constructor(private shortUrlService: ShortUrlService) {}
  title = 'ShortUrl';
  url: string | undefined;

  acortarLink() {
    console.log(this.url);

    if (this.url != undefined) {
      this.shortUrlService.acortar(this.url);
    }
  }
}
