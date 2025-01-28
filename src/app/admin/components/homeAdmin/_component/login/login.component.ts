import { NavigationEnd, Router } from '@angular/router';
import { Component } from '@angular/core';
import { Validators, FormBuilder, FormGroup } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { AuthService } from '../../services/authServices/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent {

  FormLogin = this.fb.group({
    email: [, Validators.required],
    mot_de_passe: [, Validators.required]
  })

  constructor (
    private authService: AuthService,
    private fb: FormBuilder,
    private snackBar: MatSnackBar,
    private router: Router
  ) {}

  ngOnInit (): void {}

  // login (form: FormGroup): void {
  //   const formData = new FormData()
  //   formData.append('email', form.value.email);
  //   formData.append('mot_de_passe', form.value.mot_de_passe);
  //   this.authService.login('authentification', 'login.php', formData).subscribe(
  //     res => {
  //       // console.log('Token : ', res);
  //       console.log('DATA',res);

  //       try {


  //         this.snackBar.open('Connecté avec succès!', 'Valider', {
  //           duration: 4000,
  //           horizontalPosition: 'right',
  //           verticalPosition: 'top',
  //           panelClass: ['bg-success', 'text-white']
  //         })
  //         this.router.navigate(['/hoomeAdmin/dashboard'])
  //       } catch (error) {
  //         console.error('Erreur de décodage du token : ', error)
  //         this.snackBar.open('Erreur de décodage du token!', 'Error', {
  //           duration: 4000,
  //           horizontalPosition: 'center',
  //           verticalPosition: 'bottom',
  //           panelClass: ['bg-danger', 'text-white']
  //         })
  //       }
  //     },
  //     err => {
  //       console.error('Error : ', err)

  //       this.snackBar.open(
  //         err.error.detail || 'Identifiant Incorrect!',
  //         'Error',
  //         {
  //           duration: 4000,
  //           horizontalPosition: 'center',
  //           verticalPosition: 'bottom',
  //           panelClass: ['bg-danger', 'text-white']
  //         }
  //       )
  //     }
  //   )
  // }
  login(form: FormGroup): void {
    const formData = {
      email: form.value.email,
      mot_de_passe: form.value.mot_de_passe
    };

    this.authService.login('authentification', 'login.php', formData).subscribe({
      next: (response) => {
        console.log('DATA', response);

        // Connexion réussie
        const message =
        response?.message || 'Connecté avec succès!';
        this.snackBar.open(message, 'Valider', {
          duration: 4000,
          horizontalPosition: 'right',
          verticalPosition: 'top',
          panelClass: ['bg-success', 'text-white']
        });

        // Vérifier si le token est bien présent dans la réponse
        if (response && response.token) {
          // Stocker le token dans le localStorage
          localStorage.setItem('access_token', response.token);

          // Rediriger vers le dashboard
          this.router.navigate(['/hoomeAdmin/dashboard']);
        } else {
          throw new Error('Token manquant');
        }
      },
      error: (err) => {
        console.error('Error : ', err);
        this.snackBar.open(
          err.error.detail || 'Identifiant Incorrect!',
          'Error',
          {
            duration: 4000,
            horizontalPosition: 'center',
            verticalPosition: 'bottom',
            panelClass: ['bg-danger', 'text-white']
          }
        );
      }
    });
  }





}
