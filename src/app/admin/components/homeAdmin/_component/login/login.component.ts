import { NavigationEnd, Router } from '@angular/router';
import { Component } from '@angular/core';
import { Validators, FormBuilder, FormGroup, FormControl } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { AuthService } from '../../services/authServices/auth.service';
import { first } from 'rxjs';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent {

  angForm = new FormGroup({
    email: new FormControl(''),
    password: new FormControl('')
  })

  constructor(private fb: FormBuilder, private dataService: AuthService, private router: Router) {

  }

  ngOnInit() {
  }
  postdata(angForm1: any) {
    this.dataService.userlogin(angForm1.value.email, angForm1.value.password)
      .pipe(first())
      .subscribe(
        data => {
          const redirect = this.dataService.redirectUrl ? this.dataService.redirectUrl : '/hoomeAdmin/dashboard';
          this.router.navigate([redirect]);
        },
        error => {
          alert("User name or password is incorrect")
        });
  }
  // postdata(angForm1: any) {
  //   this.dataService.userlogin(angForm1.value.email, angForm1.value.password)
  //     .pipe(first())
  //     .subscribe(
  //       data => {
  //         if (data.session_active) {
  //           const redirect = this.dataService.redirectUrl ? this.dataService.redirectUrl : '/homeAdmin/dashboard';
  //           this.router.navigate([redirect]);
  //         }
  //       },
  //       error => {
  //         alert("User name or password is incorrect")
  //       }
  //     );
  // }
  
  get email() { return this.angForm.get('email'); }
  get password() { return this.angForm.get('password'); }

}
