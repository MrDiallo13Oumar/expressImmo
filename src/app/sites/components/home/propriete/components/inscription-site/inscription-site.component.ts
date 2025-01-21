import { Component } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { ReservationService } from 'src/app/admin/components/reservation/services/reservation.service';
import { convertObjectInFormData } from 'src/app/app.component';
import { Reservation } from 'src/assets/Models/reservation';
import Swal from 'sweetalert2'

@Component({
  selector: 'app-inscription-site',
  templateUrl: './inscription-site.component.html',
  styleUrls: ['./inscription-site.component.scss']
})
export class InscriptionSiteComponent {
  idPropriete: any;

  constructor(private route: Router, private reservationService: ReservationService, private activeroute : ActivatedRoute) { }

    Reservation = new FormGroup({
    nom: new FormControl(''),
    prenom: new FormControl(''),
    telephone: new FormControl(''),
    adresse: new FormControl(''),
    statut: new FormControl(''),
    wifi: new FormControl(''),
    restauration: new FormControl(''),
    conciergerie: new FormControl(''),
    blanchisserie: new FormControl(''), 
    propriete_id: new FormControl('') ,
  })
  ngOnInit() {
    (this.idPropriete = this.activeroute.snapshot.params['id']),
    this.setProprieteId();
    console.log("id propriete",this.idPropriete);
    
    console.log('This is init method');
  }

  setProprieteId() {
    this.Reservation.patchValue({
      propriete_id: this.idPropriete
    });
  }
  simpleAlert() {
    Swal.fire('Hello world!');

  }

  alertWithSuccess() {

    Swal.fire('Felicitation ...', 'Vous ête inscrit avec succes!', 'success')
    this.route.navigateByUrl("/home/detailProprieteSite")
  }

  confirmBox() {

    Swal.fire({

      title: 'Are you sure want to remove?',

      text: 'You will not be able to recover this file!',

      icon: 'warning',

      showCancelButton: true,

      confirmButtonText: 'Yes, delete it!',

      cancelButtonText: 'No, keep it'

    }).then((result) => {

      if (result.value) {

        Swal.fire(

          'Deleted!',

          'Your imaginary file has been deleted.',

          'success'

        )

      } else if (result.dismiss === Swal.DismissReason.cancel) {

        Swal.fire(

          'Cancelled',

          'Your imaginary file is safe :)',

          'error'

        )

      }

    })

  }

  // reservation = Reservation
  // saveDataReservation() {
  //   if (this.Reservation.valid) {
  //     this.reservationService.create('reservation', 'create.php', this.reservation).subscribe(data => {
  //       console.log("Reservation", this.reservation);
  //       console.log("Data", data);


  //     })

  //   }
  // }

  data : any
  saveDataReservations() {
    const formData = convertObjectInFormData(this.Reservation.value);
    if (this.Reservation.valid) {
      console.log("formData",formData);
      
      this.reservationService.create('reservation','create.php',formData).subscribe((data)=>{
        console.log(data);
        this.data = data
        Swal.fire('Felicitation ...', 'Vous aviez reserver avec succes!', 'success')
        this.route.navigateByUrl("/home/propriete") 
      }
    )

    }
  }

  scrollToTop(): void {
    window.scrollTo({ top: 0, behavior: 'smooth' }); // Le 'smooth' permet un défilement fluide
  }
  navigate(){
    this.route.navigateByUrl("/hoomeAdmin/login")
  }
}