import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatTableDataSource } from '@angular/material/table';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { ReservationService } from 'src/app/admin/components/reservation/services/reservation.service';
import { convertObjectInFormData } from 'src/app/app.component';
import Swal from 'sweetalert2'

@Component({
  selector: 'app-inscription-site',
  templateUrl: './inscription-site.component.html',
  styleUrls: ['./inscription-site.component.scss']
})
export class InscriptionSiteComponent {
  idPropriete: any;
  email = "expressimmo@gmail.com"
  constructor(private snackBar: MatSnackBar, private route: Router, private reservationService: ReservationService, private activeroute: ActivatedRoute) { }

  get telephoneControl() {
    return this.Reservation.get('telephone')!;
  }


  Reservation = new FormGroup({
    nom: new FormControl(''),
    prenom: new FormControl(''),
    telephone: new FormControl('', Validators.required),
    adresse: new FormControl(''),
    statut: new FormControl('en attente'),
    source: new FormControl('en ligne'),
    wifi: new FormControl(''),
    restauration: new FormControl(''),
    conciergerie: new FormControl(''),
    blanchisserie: new FormControl(''),
    propriete_id: new FormControl(''),
    date_souhaite: new FormControl(''),
  })
  ngOnInit() {
    this.getPartenaire(),
      this.getQuartier(),
      this.getTypePropriete(),
      (this.idPropriete = this.activeroute.snapshot.params['id']),
      this.setProprieteId();
    console.log("id propriete", this.idPropriete);

    console.log('This is init method');
    this.scrollToTop()


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

  
  data: any
  saveDataReservations() {
    const formData = convertObjectInFormData(this.Reservation.value);
    if (this.Reservation.valid) {
      console.log("formData", formData);

      this.reservationService.create('reservation', 'create.php', formData).subscribe((data) => {
        console.log(data);
        this.data = data
        Swal.fire('Merci ...', 'De reserver notre propriete!', 'success')
        this.route.navigateByUrl("/home/propriete")
      }
      )

    }
  }

  scrollToTop(): void {
    window.scrollTo({ top: 0, behavior: 'smooth' }); // Le 'smooth' permet un défilement fluide
  }
  navigate() {
    this.route.navigateByUrl("/hoomeAdmin/login")
  }

  // AJOUT DE L'IMAGE AVEC L'OBJET PROPRIETE

  Propriete = new FormGroup({
    partenaire_id: new FormControl(''),
    quartier_id: new FormControl(''),
    reference: new FormControl(''),
    adresse: new FormControl(''),
    descriptions: new FormControl(''),
    etat: new FormControl(''),
    disponible: new FormControl(''),
    prix_journalier: new FormControl(''),
    prix_mensuel: new FormControl(''),
    typepropriete_id: new FormControl(''),
    poster: new FormControl(''),

  })
  imagePreview: string | ArrayBuffer | null = null
  selectedFile: any
  uploadResponse: string | null = null
  onFileChange(event: any) {
    const file: File = event.target.files[0]
    if (file) {
      const reader = new FileReader()
      reader.onload = (e: any) => {
        this.imagePreview = e.target.result
      }
      reader.readAsDataURL(file)
      console.log("file", file);

      this.selectedFile = file
      console.log("SelectedFile", file);

    }
  }
  dataSource = new MatTableDataSource([]);
  getPropriete() {
    this.reservationService.getall('propriete', 'readAll.php').subscribe({
      next: (reponse: any) => {
        console.log('REPONSE SUCCESS : ', reponse)
        this.dataSource.data = reponse
      },
      error: (err: any) => {
        console.log('REPONSE ERROR : ', err)
      }
    })
  }


  saveDataPropriete() {
    if (this.Propriete.valid) {
      // if (this.selectedFile) {
      //   // formData.append('file', this.selectedFile, this.selectedFile.name);
      //   console.log("this.selectedFile", this.selectedFile.name);
      //   // this.Propriete.value.poster = this.selectedFile.name

      // }
      // if (this.selectedFile) {
      //   // formData.append('file', this.selectedFile, this.selectedFile.name);
      //   console.log("this.selectedFile", this.selectedFile.name);
      //   // this.Propriete.value.poster = this.selectedFile.name

      // }

      const formData = convertObjectInFormData(this.Propriete.value);
      // Si un fichier a été sélectionné, ajoute-le à FormData

      console.log("propriete", this.Propriete.value.poster);

      if (this.selectedFile) {
        formData.append('file', this.selectedFile, this.selectedFile.name);
        console.log("this.selectedFile", this.selectedFile.name);
        // this.Propriete.value.poster = this.selectedFile.name 

      }
      // Envoie les données au serveur
      this.reservationService.create('propriete', 'create.php', formData).subscribe({
      
        next: (response) => {
          
          this.snackBar.open(response, "Okay", {
            duration: 3000,
            horizontalPosition: "right",
            verticalPosition: "top",
            panelClass: ['bg-success', 'text-white']
          });
          console.log("response",response); 
          this.getPropriete();
        },
        error: (err: any) => {
          
          this.snackBar.open("Erreur lors de l'enregistrement", "Okay", {
            duration: 3000,
            horizontalPosition: "right",
            verticalPosition: "top",
            panelClass: ['bg-danger', 'text-white']
          });
          
        }
      });

    }
  }

  typePropriete: any = []
  getTypePropriete() {
    this.reservationService.getall('typePropriete', 'readAll.php').subscribe({
      next: (reponse: any) => {
        console.log('typePropriete : ', reponse)
        this.typePropriete = reponse
      },
      error: (err: any) => {
        console.log('REPONSE ERROR : ', err)
      }
    })
  }
  Partenaire: any = []
  getPartenaire() {
    this.reservationService.getall('partenaire', 'readAll.php').subscribe({
      next: (reponse: any) => {
        console.log('Partenaire: ', reponse)
        this.Partenaire = reponse

      },
      error: (err: any) => {
        console.log('REPONSE ERROR : ', err)
      }
    })
  }

  Quartier: any = []
  getQuartier() {
    this.reservationService.getall('quartier', 'readAll.php').subscribe({
      next: (reponse: any) => {
        console.log('Quartier : ', reponse)
        this.Quartier = reponse

      },
      error: (err: any) => {
        console.log('REPONSE ERROR : ', err)
      }
    })
  }

}

