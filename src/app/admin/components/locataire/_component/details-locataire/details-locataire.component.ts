import { Component } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { LocataireService } from '../../services/locataire.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ActivatedRoute, Router } from '@angular/router';
import { convertObjectInFormData } from 'src/app/app.component';

@Component({
  selector: 'app-details-locataire',
  templateUrl: './details-locataire.component.html',
  styleUrls: ['./details-locataire.component.scss']
})
export class DetailsLocataireComponent {

  Locataire = new FormGroup({
              propriete_id: new FormControl(''),
              nomComplet: new FormControl(''),
              telephone: new FormControl(''),
              email: new FormControl(''),
              nationalite :new FormControl(''),
              date_naissance: new FormControl(''),
              lieu_naissance: new FormControl(''),
              typePiece :new FormControl(''),
              numeroPiece :new FormControl(''),
              codePin :new FormControl(''),
              adresse :new FormControl(''),
      })
  
      constructor(
        private service: LocataireService,
        private snackBar: MatSnackBar,
        private activeroute: ActivatedRoute,
        private router :Router
      ) // protected location: Location
      {}
  
      idLocataire: any;
      ngOnInit(): void {
        (this.idLocataire = this.activeroute.snapshot.params['id']),
          this.getOneLocataire();
      }
      infoLocataire: any = {};
      getOneLocataire() {
        console.log('ID en GET : ', this.idLocataire);
        this.service.getOne('partenaire', 'getOne.php', this.idLocataire).subscribe({
          next: (response: any) => {
            console.log('Info : ', response);
            this.infoLocataire = response;
            this.Locataire.patchValue(this.infoLocataire);
          },
          error: (error: any) => {
            console.log('Error : ', error);
          },
        });
      }
      Society :any =[]
      getLocataire () {
        this.service.getall('locataire', 'readAll.php').subscribe({
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
  
        const formData = convertObjectInFormData(this.Locataire.value);
        console.log('Form Data Before Sending:', formData); // Vérifiez les données après la transformation
  
        this.service
          .update('locataire', 'update.php', formData)
          .subscribe({
            next: (response: any) => {
              this.infoLocataire = response;
              console.log('Modification:', this.infoLocataire);
              this.snackBar.open('Modification effectuée avec succès !', 'Okay', {
                duration: 3000,
                horizontalPosition: 'right',
                verticalPosition: 'top',
                panelClass: ['bg-success', 'text-white'],
              });
              this.router.navigate(['/locataire/list-locataire']);
  
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
        this.router.navigate(['/locataire/list-Locataire']);
      }
  
}
