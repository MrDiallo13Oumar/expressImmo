import { Component } from '@angular/core';

@Component({
  selector: 'app-contact',
  templateUrl: './contact.component.html',
  styleUrls: ['./contact.component.scss']
})
export class ContactComponent {
email = "expressimmo@gmail.com"
  scrollToTop(): void {
    window.scrollTo({ top: 0, behavior: 'smooth' }); // Le 'smooth' permet un défilement fluide
  }
}
