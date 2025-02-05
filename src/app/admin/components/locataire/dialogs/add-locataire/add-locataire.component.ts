import { Component, Inject, Optional } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { ProprieteService } from '../../../propriete/_services/propriete.service';

@Component({
  selector: 'app-add-locataire',
  templateUrl: './add-locataire.component.html',
  styleUrls: ['./add-locataire.component.scss']
})
export class AddLocataireComponent {
  created_by = localStorage.getItem('id_user');


    Locataire = new FormGroup({
      propriete_id: new FormControl(''),
      nom: new FormControl(''),
      prenom: new FormControl(''),
      telephone: new FormControl(''),
      email: new FormControl(''),
      nationalite :new FormControl(''),
      date_naissance: new FormControl(''),
      lieu_naissance: new FormControl(''),
      typePiece :new FormControl(''),
      numeroPiece :new FormControl(''),
      adresse :new FormControl(''),
      created_by: new FormControl(this.created_by, Validators.required),
    })

    constructor(
      public dialogRef: MatDialogRef<AddLocataireComponent>,
      @Optional() @Inject(MAT_DIALOG_DATA) public data: any,
      private service : ProprieteService
    ) { }

    ngOnInit(){
      this.getPropriete()

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


    saveDataLocataire() {
      if (this.Locataire.valid) {
        this.dialogRef.close({
          event: "insert",
          data: this.Locataire.value
        })
      }
    }
}
