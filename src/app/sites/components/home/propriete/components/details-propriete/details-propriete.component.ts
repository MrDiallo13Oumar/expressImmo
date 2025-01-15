import { Component } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import Swal from 'sweetalert2'

@Component({
  selector: 'app-details-propriete',
  templateUrl: './details-propriete.component.html',
  styleUrls: ['./details-propriete.component.scss']
})
export class DetailsProprieteComponent {
constructor(private router : Router){}

  email = "expressimmo224@gmail.com";
Propriete = new FormGroup({
    id :new FormControl(''),
    partenaire_id :new FormControl(''),
    libelle: new FormControl(''),
    adresse: new FormControl(''),
    etat :new FormControl(''),
    disponible :new FormControl(''),
    prix_journalier :new FormControl(''),
    prix_mensuel :new FormControl(''),
    description: new FormControl(''),
  })


  alertWithSuccess(){
  
      Swal.fire('Bravo ...', 'Vous aviez reserver avec succes!', 'success')
      this.router.navigateByUrl("/home/propriete")
    }
}
