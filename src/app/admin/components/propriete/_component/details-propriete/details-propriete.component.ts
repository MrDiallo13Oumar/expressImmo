import { Component } from '@angular/core';
import { FormGroup, FormControl } from '@angular/forms';
import { PartenaireService } from '../../../partenaire/services/partenaire.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ActivatedRoute, Router } from '@angular/router';
import { convertObjectInFormData } from 'src/app/app.component';

@Component({
  selector: 'app-details-propriete',
  templateUrl: './details-propriete.component.html',
  styleUrls: ['./details-propriete.component.scss']
})
export class DetailsProprieteComponent {

    Propriete = new FormGroup({
       id :new FormControl(''),
       partenaire_id :new FormControl(''),
       quartier_id :new FormControl(''),
       reference: new FormControl(''),
       adresse: new FormControl(''),
       descriptions: new FormControl(''),
       etat :new FormControl(''),
       disponible :new FormControl(''),
       prix_journalier :new FormControl(''),
       prix_mensuel :new FormControl(''),

     })
 constructor(
       private service :PartenaireService,
        private snackBar: MatSnackBar,
        private activeroute: ActivatedRoute,
        private router :Router
 ){

 }
 idPropriete:any
  ngOnInit(){

    (this.idPropriete = this.activeroute.snapshot.params['id']),
   this.getOnePropriete(),
   this.getPartenaire();

   this.getQuartier();
  }
  infoPropriete: any = {};
  getOnePropriete() {
    console.log('ID en GET : ', this.idPropriete);
    this.service.getOne('propriete', 'getOne.php', this.idPropriete).subscribe({
      next: (response: any) => {
        console.log('Info : ', response);
        this.infoPropriete = response;
        this.Propriete.patchValue(this.infoPropriete);


      },
      error: (error: any) => {
        console.log('Error : ', error);
      },
    });
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

  Quartier : any =[]
  getQuartier () {
    this.service.getall('quartier', 'readAll.php').subscribe({
      next: (reponse: any) => {
         console.log('REPONSE SUCCESS : ', reponse)
        this.Quartier = reponse

      },
      error: (err: any) => {
        console.log('REPONSE ERROR : ', err)
      }
    })
  }
    confirmEditing(form: FormGroup): void {
         // Appliquez la transformation

         const formData = convertObjectInFormData(this.Propriete.value);
         console.log('Form Data Before Sending:', formData); // Vérifiez les données après la transformation

         this.service
           .update('propriete', 'update.php', formData)
           .subscribe({
             next: (response: any) => {
               this.infoPropriete = response;
               console.log('Modification:', this.infoPropriete);
               this.snackBar.open('Modification effectuée avec succès !', 'Okay', {
                 duration: 3000,
                 horizontalPosition: 'right',
                 verticalPosition: 'top',
                 panelClass: ['bg-success', 'text-white'],
               });
               this.router.navigate(['/propriete/list-propriete']);

             },
             error: (error: any) => {
               console.log('Error : ', error);
               this.snackBar.open('Modification impossible !', 'Okay', {
                 duration: 3000,
                 horizontalPosition: 'right',
                 verticalPosition: 'top',
                 panelClass: ['bg-danger', 'text-white'],
               });
             },

           });

       }

}
