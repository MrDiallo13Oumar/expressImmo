
import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ReservationService } from '../../services/reservation.service';
import { FormControl, FormGroup } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { convertObjectInFormData } from 'src/app/app.component';
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
        private snackBar :MatSnackBar ,
        private router : Router,

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
      creerContrat() {
        // Données pour le contrat
        const contratData = {
          reservation_id: this.infoReservation.id,
          statut: 'actif',
        };

        // Convertir les données en FormData
        const formData = convertObjectInFormData(contratData);
        console.log('contratInfo', contratData);

        // Envoi des données au backend
        this.service.create('contrat', 'create.php', formData).subscribe({
          next: (response) => {
            this.snackBar.open('Contrat créé avec succès !', 'Okay', {
              duration: 3000,
              horizontalPosition: 'right',
              verticalPosition: 'top',
              panelClass: ['bg-success', 'text-white'],
            });


           this.router.navigate(['/contrat/list-contrat']);
          },
          error: (err: any) => {
            this.snackBar.open('Échec de la création du contrat !', 'Okay', {
              duration: 3000,
              horizontalPosition: 'right',
              verticalPosition: 'top',
              panelClass: ['bg-danger', 'text-white'],
            });
          },
        });
      }



}
