import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class PublicService {

  constructor() { }
   imprimerDiv (divToPrint: any): void {
    // let printContents = this.divToPrint.nativeElement.innerHTML;
    let printContents = divToPrint
    let styles = Array.from(
      document.querySelectorAll('link[rel="stylesheet"], style')
    )
      .map(node => node.outerHTML)
      .join('')
    let iframe: any = document.createElement('iframe')
    iframe.style.display = 'none'
    document.body.appendChild(iframe)
    let iframeDoc = iframe.contentDocument || iframe.contentWindow.document
    iframeDoc.open()
    iframeDoc.write(
      '<html><head><title>Impression</title>' +
        styles +
        '</head><body>' +
        printContents +
        '</body></html>'
    )
    iframeDoc.close()
    iframe.onload = function () {
      iframe.contentWindow.print()
      document.body.removeChild(iframe)
    }
  }
}
