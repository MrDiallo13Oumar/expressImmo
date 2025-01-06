import { Component, Inject, Optional } from '@angular/core';
import { FormGroup, FormControl } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'app-add-contrat',
  templateUrl: './add-contrat.component.html',
  styleUrls: ['./add-contrat.component.scss']
})
export class AddContratComponent {

  Contrat = new FormGroup({
    reservation_id: new FormControl(''),
    date_signature: new FormControl(''),
    montant_total: new FormControl(''),
    statut :new FormControl(''),

  })

  constructor(
    public dialogRef: MatDialogRef<AddContratComponent>,
    @Optional() @Inject(MAT_DIALOG_DATA) public data: any,

  ) { }
  saveDataContrat() {
    if (this.Contrat.valid) {
      this.dialogRef.close({
        event: "insert",
        data: this.Contrat.value
      })
    }
  }
}
