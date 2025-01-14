import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ReservationService } from '../../services/reservation.service';
import { FormControl, FormGroup } from '@angular/forms';

@Component({
  selector: 'app-detail-reservation',
  templateUrl: './detail-reservation.component.html',
  styleUrls: ['./detail-reservation.component.scss']
})
export class DetailReservationComponent {
 Reservation = new FormGroup({
    nom: new FormControl(''),
    prenom: new FormControl(''),
    telephone: new FormControl(''),
    adresse: new FormControl(''),
    statut: new FormControl(''),
    propriete_id: new FormControl(''),
  })
  constructor(
        private service: ReservationService,
        private activeroute: ActivatedRoute,

      ) // protected location: Location
      {}

      idReservation: any;
      ngOnInit(): void {
        (this.idReservation = this.activeroute.snapshot.params['id']),
          this.getOneReservation();
      }
      infoReservation: any = {};
      getOneReservation() {
        console.log('ID en GET : ', this.idReservation);
        this.service.getOne('reservation', 'getOne.php', this.idReservation).subscribe({
          next: (response: any) => {
            console.log('Info : ', response);
            this.infoReservation = response[0] ;
           // this.Reservation.patchValue(this.infoReservation);

          },
          error: (error: any) => {
            console.log('Error : ', error);
          },
        });
      }



}
