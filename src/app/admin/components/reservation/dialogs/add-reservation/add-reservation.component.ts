import { Component, Inject, OnInit, Optional } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { AddLocataireComponent } from '../../../locataire/dialogs/add-locataire/add-locataire.component';
import { ProprieteService } from '../../../propriete/_services/propriete.service';
import { PartenaireService } from '../../../partenaire/services/partenaire.service';

@Component({
  selector: 'app-add-reservation',
  templateUrl: './add-reservation.component.html',
  styleUrls: ['./add-reservation.component.scss']
})
export class AddReservationComponent implements OnInit{

  reservation = new FormGroup({
    nomComplet: new FormControl(''),
    telephone: new FormControl(''),
    date_reservation: new FormControl(''),
    adresse: new FormControl(''),
    statut: new FormControl(''),
    propriete_id: new FormControl(''),
  })
saveDataPropriete: any;

  constructor(
    public dialogRef: MatDialogRef<AddLocataireComponent>,
    @Optional() @Inject(MAT_DIALOG_DATA) public data: any,
    private service :ProprieteService  ) { }

  ngOnInit(): void {
    this.getPropriete()
  }

  Propriete: any = []
  getPropriete() {
    this.service.getall('propriete', 'readAll.php').subscribe({
      next: (reponse: any) => {
        console.log('REPONSE SUCCESS : ', reponse)
        this.Propriete = reponse
        console.log(this.Propriete);
        
      },
      error: (err: any) => {
        console.log('REPONSE ERROR : ', err)
      }
    })
  }

  saveDataReservation() {
    if (this.reservation.valid) {
      this.dialogRef.close({
        event: "insert",
        data: this.reservation.value
      })
    }
  }

}
