import { Component } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ReservationService } from 'src/app/admin/components/reservation/services/reservation.service';
import { convertObjectInFormData } from 'src/app/app.component';

@Component({
  selector: 'app-contact',
  templateUrl: './contact.component.html',
  styleUrls: ['./contact.component.scss']
})
export class ContactComponent {

  Contact = new FormGroup({
    nom: new FormControl(''),
    email: new FormControl(''),
    objet: new FormControl(''),
    message: new FormControl(''),

  })

  constructor(
    private service: ReservationService,
    private snackBar: MatSnackBar
  ) { }

  email = "expressimmo@gmail.com"
  scrollToTop(): void {
    window.scrollTo({ top: 0, behavior: 'smooth' }); // Le 'smooth' permet un défilement fluide
  }

  saveDataContact() {
    if (this.Contact.valid) {
      const formData = convertObjectInFormData(this.Contact.value);
      console.log("Data", this.Contact.value);
      
      // Envoie les données au serveur
      this.service.create('contacteznous', 'create.php', formData).subscribe({

        next: (response) => {

          this.snackBar.open(response, "Okay", {
            duration: 3000,
            horizontalPosition: "right",
            verticalPosition: "top",
            panelClass: ['bg-success', 'text-white']
          });
          console.log("response", response);
          this.Contact.reset();
        },
        error: (err: any) => {

          this.snackBar.open(err, "Okay", {
            duration: 3000,
            horizontalPosition: "right",
            verticalPosition: "top",
            panelClass: ['bg-danger', 'text-white']
          });

        }
      });

    }
  }


}
