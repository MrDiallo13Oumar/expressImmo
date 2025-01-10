import { Component } from '@angular/core';
import { FormGroup, FormControl } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ActivatedRoute, Router } from '@angular/router';
import { convertObjectInFormData } from 'src/app/app.component';
import { PartenaireService } from '../../services/partenaire.service';

@Component({
  selector: 'app-details-partenaire',
  templateUrl: './details-partenaire.component.html',
  styleUrls: ['./details-partenaire.component.scss']
})
export class DetailsPartenaireComponent {
  Partenaire = new FormGroup({
      id :new FormControl(''),
      libelle :new FormControl(''),
      email: new FormControl(''),
      telephone: new FormControl(''),
      adresse :new FormControl(''),

    })

    constructor(
      private service: PartenaireService,
      private snackBar: MatSnackBar,
      private activeroute: ActivatedRoute,
      private router :Router
    ) // protected location: Location
    {}

    idPartenaire: any;
    ngOnInit(): void {
      (this.idPartenaire = this.activeroute.snapshot.params['id']),
        this.getOnePartenaire();
    }
    infoPartenaire: any = {};
    getOnePartenaire() {
      console.log('ID en GET : ', this.idPartenaire);
      this.service.getOne('partenaire', 'getOne.php', this.idPartenaire).subscribe({
        next: (response: any) => {
          console.log('Info : ', response);
          this.infoPartenaire = response;
          this.Partenaire.patchValue(this.infoPartenaire);
        },
        error: (error: any) => {
          console.log('Error : ', error);
        },
      });
    }
    Society :any =[]
    getPartenaire () {
      this.service.getall('partenaire', 'readAll.php').subscribe({
        next: (reponse: any) => {
           console.log('REPONSE SUCCESS : ', reponse)
          this.Society = reponse
        },
        error: (err: any) => {
          console.log('REPONSE ERROR : ', err)
        }
      })
    }
    confirmEditing(form: FormGroup): void {
      // Appliquez la transformation

      const formData = convertObjectInFormData(this.Partenaire.value);
      console.log('Form Data Before Sending:', formData); // Vérifiez les données après la transformation

      this.service
        .update('partenaire', 'update.php', formData)
        .subscribe({
          next: (response: any) => {
            this.infoPartenaire = response;
            console.log('Modification:', this.infoPartenaire);
            this.snackBar.open('Modification effectuée avec succès !', 'Okay', {
              duration: 3000,
              horizontalPosition: 'right',
              verticalPosition: 'top',
              panelClass: ['bg-success', 'text-white'],
            });
            this.router.navigate(['/partenaire/list-partenaire']);

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
    cancel(){
      this.router.navigate(['/partenaire/list-partenaire']);
    }



}
