import { Component, Inject, Optional } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-add-locataire',
  templateUrl: './add-locataire.component.html',
  styleUrls: ['./add-locataire.component.scss']
})
export class AddLocataireComponent {

    Locataire = new FormGroup({
      nomComplet: new FormControl(''),
      telephone: new FormControl(''),
      email: new FormControl(''),
      nationnalite :new FormControl(''),
      propriete :new FormControl(''),
    })
  
    constructor(
      public dialogRef: MatDialogRef<AddLocataireComponent>,
      @Optional() @Inject(MAT_DIALOG_DATA) public data: any,
  
    ) { }
    saveDataLocataire() {
      if (this.Locataire.valid) {
        this.dialogRef.close({
          event: "insert",
          data: this.Locataire.value
        })
      }
    }
}
