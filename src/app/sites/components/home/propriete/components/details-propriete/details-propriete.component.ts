import { Component } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';

@Component({
  selector: 'app-details-propriete',
  templateUrl: './details-propriete.component.html',
  styleUrls: ['./details-propriete.component.scss']
})
export class DetailsProprieteComponent {
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
}
