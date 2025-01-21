import { Component, Inject, Optional } from '@angular/core';
import { FormGroup, FormControl } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { ContratService } from '../../_services/contrat.service';

@Component({
  selector: 'app-add-paiement',
  templateUrl: './add-paiement.component.html',
  styleUrls: ['./add-paiement.component.scss']
})
export class AddPaiementComponent {
 Paiement = new FormGroup({
    contrat_id: new FormControl(''),
    montant: new FormControl(''),
    mode_paiement: new FormControl(''),
    date_debut: new FormControl(''),
    date_fin: new FormControl(''),
})
constructor(
  public dialogRef: MatDialogRef<AddPaiementComponent>,
  @Optional() @Inject(MAT_DIALOG_DATA) public data: any,
  private service : ContratService,

) { }
  ngOnInit(){

  }
saveDataPaiement() {
  if (this.Paiement.valid) {
    this.dialogRef.close({
      event: "insert",
      data: this.Paiement.value
    })
  }
}
}
