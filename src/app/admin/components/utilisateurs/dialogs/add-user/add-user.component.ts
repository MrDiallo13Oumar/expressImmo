import { Component, Inject, Optional } from '@angular/core';
import { UtilisateurService } from '../../services/utilisateur.service';
import { FormGroup, FormControl, FormBuilder, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { AddLocataireComponent } from '../../../locataire/dialogs/add-locataire/add-locataire.component';
import { Router } from '@angular/router';
import { first } from 'rxjs';

@Component({
  selector: 'app-add-user',
  templateUrl: './add-user.component.html',
  styleUrls: ['./add-user.component.scss']
})
export class AddUserComponent {
  // Utilisateur = new FormGroup({
  //   nom: new FormControl(''),
  //   prenom: new FormControl(''),
  //   role: new FormControl(''),
  //   email: new FormControl(''),
  //   mot_de_passe: new FormControl(''),

  // })


  // constructor(
  //   public dialogRef: MatDialogRef<AddLocataireComponent>,
  //   @Optional() @Inject(MAT_DIALOG_DATA) public data: any,
  //   private service: UtilisateurService,
  // ) { }

  // saveDataUtilisateur() {
  //   if (this.Utilisateur.valid) {
  //     this.dialogRef.close({
  //       event: "insert",
  //       data: this.Utilisateur.value
  //     })

  //   }
  // }

  angForm: FormGroup;
  constructor(private fb: FormBuilder, private dataService: UtilisateurService, private router: Router) {
    this.angForm = this.fb.group({
      email: ['', [Validators.required, Validators.minLength(1), Validators.email]],
      mot_de_passe: ['', Validators.required],
      nom: ['', Validators.required],
      prenom: ['', Validators.required]
    });
  }

  ngOnInit() {
  }

  postdata(angForm1: any) {
    this.dataService.userregistration(angForm1.value.nom, angForm1.value.email, angForm1.value.mot_de_passe,angForm1.value.prenom)
      .pipe(first())
      .subscribe(
        data => {
          this.router.navigate(['/hoomeAdmin/login']);
        },

        error => {
        });
  }

  get email() { return this.angForm.get('email'); }
  get mot_de_passe() { return this.angForm.get('mot_de_passe'); }
  get nom() { return this.angForm.get('nom'); }
  get prenom() { return this.angForm.get('prenom'); }

}
