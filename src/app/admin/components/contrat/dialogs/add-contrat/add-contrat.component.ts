import { Component, Inject, Optional } from '@angular/core';
import { FormGroup, FormControl } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { ContratService } from '../../_services/contrat.service';

@Component({
  selector: 'app-add-contrat',
  templateUrl: './add-contrat.component.html',
  styleUrls: ['./add-contrat.component.scss']
})
export class AddContratComponent {

  Contrat = new FormGroup({
    reservation_id: new FormControl(''),
    date_debut: new FormControl(''),
    date_fin: new FormControl(''),
    montant_total: new FormControl(''),
    statut :new FormControl(''),

  })

  constructor(
    public dialogRef: MatDialogRef<AddContratComponent>,
    @Optional() @Inject(MAT_DIALOG_DATA) public data: any,
    private service : ContratService,
  ) { }

  Reservation : any =[]
  getReservation () {
    this.service.getall('reservation', 'readAll.php').subscribe({
      next: (reponse: any) => {
         console.log('REPONSE SUCCESS : ', reponse)
        this.Reservation = reponse

      },
      error: (err: any) => {
        console.log('REPONSE ERROR : ', err)
      }
    })
  }


  saveDataContrat() {
    if (this.Contrat.valid) {
      this.dialogRef.close({
        event: "insert",
        data: this.Contrat.value
      })
    }
  }
}
