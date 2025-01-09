import { Component, Inject, Optional } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { ProprieteService } from '../../../propriete/_services/propriete.service';

@Component({
  selector: 'app-add-locataire',
  templateUrl: './add-locataire.component.html',
  styleUrls: ['./add-locataire.component.scss']
})
export class AddLocataireComponent {

    Locataire = new FormGroup({
      propriete_id: new FormControl(''),
      nomComplet: new FormControl(''),
      telephone: new FormControl(''),
      email: new FormControl(''),
      nationalite :new FormControl(''),
      date_naissance: new FormControl(''),
      lieu_naissance: new FormControl(''),
      typePiece :new FormControl(''),
      numeroPiece :new FormControl(''),
      codePin :new FormControl(''),
      adresse :new FormControl(''),
      contrat_id : new FormControl('')
    })

    constructor(
      public dialogRef: MatDialogRef<AddLocataireComponent>,
      @Optional() @Inject(MAT_DIALOG_DATA) public data: any,
      private service : ProprieteService
    ) { }

    ngOnInit(){
      this.getPropriete()
      this.getContrat ()
    }

    Propriete : any =[]
    getPropriete () {
      this.service.getall('propriete', 'readAll.php').subscribe({
        next: (reponse: any) => {
           console.log('REPONSE SUCCESS : ', reponse)
          this.Propriete = reponse

        },
        error: (err: any) => {
          console.log('REPONSE ERROR : ', err)
        }
      })
    }
    Contrat : any =[]
    getContrat () {
      this.service.getall('contrat', 'readAll.php').subscribe({
        next: (reponse: any) => {
           console.log('REPONSE SUCCESS : ', reponse)
          this.Contrat = reponse

        },
        error: (err: any) => {
          console.log('REPONSE ERROR : ', err)
        }
      })
    }

    saveDataLocataire() {
      if (this.Locataire.valid) {
        this.dialogRef.close({
          event: "insert",
          data: this.Locataire.value
        })
      }
    }
}
