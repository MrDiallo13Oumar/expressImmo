
import { Component } from '@angular/core';
import { Validators, FormBuilder } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { AuthService } from 'src/app/admin/guards/service/auth.service';
import { convertObjectInFormData } from 'src/app/app.component';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent {

  loginForm = this.fb.group({
    email: ['', Validators.required],
    mot_de_passe: ['', Validators.required],
  });

  constructor(
    private loginService: AuthService,
    private snackBar :MatSnackBar,
    private fb: FormBuilder,
  ) { }

  onSubmit(): void {
    // Récupération des données du formulaire
    const formData = convertObjectInFormData(this.loginForm.value);

    // Appel du service de connexion
    this.loginService.login('authentification', 'login.php', formData).subscribe({
      next: (response: any) => {
        // Enregistrer le token et l'ID utilisateur
        this.loginService.saveToken(response.access_token, response.idUser);

        // Afficher un message de succès si disponible
        if (response?.message) {
          this.snackBar.open(response.message, 'Okay', {
            duration: 3000,
            horizontalPosition: 'right',
            verticalPosition: 'top',
            panelClass: ['bg-success', 'text-white'],
          });
        }
      },
      error: (err: any) => {
        // Gestion des erreurs
        console.error('Erreur :', err);
        const errorMessage =
          err.error?.message || "Une erreur s'est produite lors de la connexion.";

        // Affichage du message d'erreur
        this.snackBar.open(errorMessage, 'Okay', {
          duration: 3000,
          horizontalPosition: 'right',
          verticalPosition: 'top',
          panelClass: ['bg-danger', 'text-white'],
        });
      },
    });
  }


}


