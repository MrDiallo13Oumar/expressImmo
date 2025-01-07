import { Component, Inject, Optional } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { AddLocataireComponent } from '../../../locataire/dialogs/add-locataire/add-locataire.component';

@Component({
  selector: 'app-add-reservation',
  templateUrl: './add-reservation.component.html',
  styleUrls: ['./add-reservation.component.scss']
})
export class AddReservationComponent {

  Locataire = new FormGroup({
        nomComplet: new FormControl(''),
        status: new FormControl(''),
        telephone: new FormControl(''),
        date_reservation :new FormControl(''),
        propriete :new FormControl(''),
      })
    
      constructor(
        public dialogRef: MatDialogRef<AddLocataireComponent>,
        @Optional() @Inject(MAT_DIALOG_DATA) public data: any,
    
      ) { }
      saveDataReservation() {
        if (this.Locataire.valid) {
          this.dialogRef.close({
            event: "insert",
            data: this.Locataire.value
          })
        }
      }

}
