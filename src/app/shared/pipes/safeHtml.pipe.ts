import {DomSanitizer} from "@angular/platform-browser";
import {Pipe} from "@angular/core";

@Pipe({name: 'safeHtml'})
export class SafeHtml {
  constructor(private sanitizer:DomSanitizer){}

  transform(html) {
    return this.sanitizer.bypassSecurityTrustResourceUrl(html);
  }
}
