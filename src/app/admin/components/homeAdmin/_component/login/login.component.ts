
import { Component } from '@angular/core';
import { Validators, FormBuilder } from '@angular/forms';
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
    private fb: FormBuilder,
  ) { }

  onSubmit(): void {
    // console.log(this.loginForm.value);
    const formData = this.loginForm.value;
    this.loginService
      .login(
        'authentification',
        'login.php',
        convertObjectInFormData(this.loginForm.value)
      )
      .subscribe({
        next: (response: any) => {
          this.loginService.saveToken(response.access_token, response.idUser);
        },
        error: (error: any) => {
          console.log('ERROR : ', error);
        },
      });
  }

}
