
import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ReservationService } from '../../services/reservation.service';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { convertObjectInFormData } from 'src/app/app.component';
import Swal from 'sweetalert2';
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
    statut: new FormControl('sur place'),
    propriete_id: new FormControl(''),
  })
 Contrat = new FormGroup({
  caution: new FormControl(0, [
    Validators.required,
    Validators.min(0),
  ]),
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
      alertWithSuccess() {

        Swal.fire('Felicitation ...', 'Contrat creer avec succes!', 'success')
        this.router.navigateByUrl("/contrat/list-contrat")
      }
      created_by =localStorage.getItem('id_user')
      modify_by =localStorage.getItem('id_user')
      data:any
      creerContrat() {
        // Données pour le contrat
        const contratData = {
          reservation_id: this.infoReservation.id,
          statut: 'actif',
         caution : this.Contrat.value.caution

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


            this.alertWithSuccess()
          //  this.router.navigate(['/contrat/list-contrat']);
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

      const  constReservationData = {
          id: this.infoReservation.id,
          statut: 'confirmée',
          modify_by:this.modify_by
        }
        const formData2 = convertObjectInFormData(constReservationData);
        this.service.update('reservation', 'update.php', formData2).subscribe({
          next: (response) => {
              console.log('message',response)
            this.data=response
            console.log('message',this.data)
          },
          error: (err: any) => {
            console.log('message',err)
          },
        });
      }
cancel (){
  this.router.navigate(['/reservation/list-reservation']);
}


}
