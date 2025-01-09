import { Component, Inject, OnInit, Optional } from '@angular/core';
import { FormGroup, FormControl } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { ContratService } from '../../_services/contrat.service';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-add-contrat',
  templateUrl: './add-contrat.component.html',
  styleUrls: ['./add-contrat.component.scss']
})
export class AddContratComponent implements OnInit{

  Contrat = new FormGroup({
    reservation_id: new FormControl(''),
    propriete_id: new FormControl(''),
    partenaire_id: new FormControl(''),
    date_debut: new FormControl(''),
    date_fin: new FormControl(''),
    montant_total: new FormControl(''),
    statut :new FormControl(''),

  })

  constructor(
    public dialogRef: MatDialogRef<AddContratComponent>,
    @Optional() @Inject(MAT_DIALOG_DATA) public data: any,
    private service : ContratService,
    private activeroute:ActivatedRoute,
  ) { }
  idReservation:any
  ngOnInit(){
    (this.idReservation = this.activeroute.snapshot.params['id']),
    this.getPartenaire(),
    this.getPropriete(),
    this.getReservation()
    this.getOneReservation()
  }
 
 
  infoReservation: any = {};
  getOneReservation() {
    console.log('ID en GET : ', this.idReservation);
    this.service.getOne('reservation', 'getOne.php', this.idReservation).subscribe({
      next: (response: any) => {
        console.log('InfoReservation : ', response);
        this.infoReservation = response;
        this.Reservation.patchValue(this.infoReservation);
      },
      error: (error: any) => {
        console.log('Error : ', error);
      },
    });
  }



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
  Partenaire : any =[]
  getPartenaire () {
    this.service.getall('partenaire', 'readAll.php').subscribe({
      next: (reponse: any) => {
         console.log('REPONSE SUCCESS : ', reponse)
        this.Partenaire = reponse

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
