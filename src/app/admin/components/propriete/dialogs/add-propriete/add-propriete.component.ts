import { Component, Inject, Optional } from '@angular/core';
import { FormGroup, FormControl } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { ProprieteService } from '../../_services/propriete.service';

@Component({
  selector: 'app-add-propriete',
  templateUrl: './add-propriete.component.html',
  styleUrls: ['./add-propriete.component.scss']
})
export class AddProprieteComponent {
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
    public dialogRef: MatDialogRef<AddProprieteComponent>,
    @Optional() @Inject(MAT_DIALOG_DATA) public data: any,
    private service :ProprieteService

  ) { }
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
  saveDataPropriete() {
    if (this.Propriete.valid) {
      this.dialogRef.close({
        event: "insert",
        data: this.Propriete.value
      })
    }
  }
}
