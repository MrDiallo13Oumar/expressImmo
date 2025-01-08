import { Component } from '@angular/core';
import { FormGroup, FormControl } from '@angular/forms';
import { PartenaireService } from '../../../partenaire/services/partenaire.service';

@Component({
  selector: 'app-details-propriete',
  templateUrl: './details-propriete.component.html',
  styleUrls: ['./details-propriete.component.scss']
})
export class DetailsProprieteComponent {
 Propriete = new FormGroup({
    partenaire_id :new FormControl(''),
    libelle: new FormControl(''),
    adresse: new FormControl(''),
    description: new FormControl(''),
    etat :new FormControl(''),
    disponible :new FormControl(''),
    prix_journalier :new FormControl(''),
    prix_mensuel :new FormControl(''),

  })
 constructor(
  private service :PartenaireService
 ){

 }

  ngOnInit(){
    this.getPartenaire()
  }

  Partenaire : any =[]
   getPartenaire () {
     this.service.getall('partenaire', 'readAll.php').subscribe({
       next: (reponse: any) => {
          console.log('REPONSE SUCCESS : ', reponse)
         this.Partenaire = reponse

       },
       error: (err: any) => {
         console.log('REPONSE ERROR : ', err)
       }
     })
   }
}
