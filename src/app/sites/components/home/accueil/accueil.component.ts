import { Component, OnInit } from '@angular/core';
import { ProprieteService } from 'src/app/admin/components/propriete/_services/propriete.service';
import { Propriete } from 'src/assets/Models/propriete';

@Component({
  selector: 'app-accueil',
  templateUrl: './accueil.component.html',
  styleUrls: ['./accueil.component.scss']
})
export class AccueilComponent implements OnInit {
  email = "expressimmo@gmail.com"
constructor(private service : ProprieteService
){}
  ngOnInit(): void {
    this.getPropriete()
    this.getDashbord()
  }

  data !: Propriete[]
  infoPropriete: any = {};
  getPropriete () {
    this.service.getall('propriete', 'readAll.php').subscribe({
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


  infoDashBoard: any;
  getDashbord() {
    this.service.getall('dashboard', 'statistiquesJour.php').subscribe({
      next: (reponse: any) => {
        console.log('REPONSE SUCCESS : ', reponse);
        this.infoDashBoard = reponse;
      },
      error: (err: any) => {
        console.log('REPONSE ERROR : ', err);
      },
    });
  }
}
