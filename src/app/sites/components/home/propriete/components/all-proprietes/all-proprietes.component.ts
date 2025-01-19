import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { ProprieteService } from 'src/app/admin/components/propriete/_services/propriete.service';
import { Propriete } from 'src/assets/Models/propriete';

@Component({
  selector: 'app-all-proprietes',
  templateUrl: './all-proprietes.component.html',
  styleUrls: ['./all-proprietes.component.scss']
})
export class AllProprietesComponent {

constructor(private router : Router, private propriete : ProprieteService){}

ngOnInit() {
  this.getPropriete()
 }

 data !: Propriete[]
getPropriete () {
   this.propriete.getall('propriete', 'readAll.php').subscribe({
     next: (reponse: any) => {
        console.log('REPONSE SUCCESS : ', reponse)
       this.data = reponse
       console.log("Data de cheick", this.data);
       
     },
     error: (err: any) => {
       console.log('REPONSE ERROR : ', err)
     }
   })
 }
  scrollToTop(): void {
    window.scrollTo({ top: 0, behavior: 'smooth' }); // Le 'smooth' permet un défilement fluide
  }
}
