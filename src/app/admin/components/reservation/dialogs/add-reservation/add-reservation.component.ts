import { Component, Inject, OnInit, Optional } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { AddLocataireComponent } from '../../../locataire/dialogs/add-locataire/add-locataire.component';
import { ProprieteService } from '../../../propriete/_services/propriete.service';



@Component({
  selector: 'app-add-reservation',
  templateUrl: './add-reservation.component.html',
  styleUrls: ['./add-reservation.component.scss']
})
export class AddReservationComponent implements OnInit{
  created_by = localStorage.getItem('id_user');

  Reservation = new FormGroup({
    nom: new FormControl(''),
    prenom: new FormControl(''),
    telephone: new FormControl(''),
    adresse: new FormControl(''),
    statut: new FormControl(''),
    propriete_id: new FormControl(''),
    source: new FormControl('en ligne',Validators.required),
    created_by: new FormControl(this.created_by, Validators.required),
  })
saveDataPropriete: any;

  constructor(
    public dialogRef: MatDialogRef<AddLocataireComponent>,
    @Optional() @Inject(MAT_DIALOG_DATA) public data: any,
    private service :ProprieteService ,
     ) { }

  ngOnInit(): void {
    this.getPropriete()
  }

  Propriete: any = []
  getPropriete() {
    this.service.getall('propriete', 'readAll2.php').subscribe({
      next: (reponse: any) => {
        console.log('LISTE DES PROPRIETES REPONSE SUCCESS : ', reponse)
        this.Propriete = reponse
        console.log(this.Propriete);

      },
      error: (err: any) => {
        console.log('REPONSE ERROR : ', err)
      }
    })
  }

  saveDataReservation() {
    if (this.Reservation.valid) {
      this.dialogRef.close({
        event: "insert",
        data: this.Reservation.value
      })

    }
  }

}
