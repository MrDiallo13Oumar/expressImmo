import { Component, Inject, Optional } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { ContratService } from '../../_services/contrat.service';

@Component({
  selector: 'app-add-paiement',
  templateUrl: './add-paiement.component.html',
  styleUrls: ['./add-paiement.component.scss']
})
export class AddPaiementComponent {
  created_by = localStorage.getItem('id_user');

 Paiement = new FormGroup({
    contrat_id: new FormControl(''),
    montant: new FormControl(''),
    mode_paiement: new FormControl(''),
    date_debut: new FormControl(''),
    date_fin: new FormControl(''),
    created_by: new FormControl(this.created_by, Validators.required),
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
