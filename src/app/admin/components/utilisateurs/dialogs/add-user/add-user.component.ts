import { Component, Inject, Optional } from '@angular/core';
import { UtilisateurService } from '../../services/utilisateur.service';
import { FormGroup, FormControl } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { AddLocataireComponent } from '../../../locataire/dialogs/add-locataire/add-locataire.component';

@Component({
  selector: 'app-add-user',
  templateUrl: './add-user.component.html',
  styleUrls: ['./add-user.component.scss']
})
export class AddUserComponent {
 Utilisateur = new FormGroup({
    nom: new FormControl(''),
    prenom: new FormControl(''),
    role: new FormControl(''),
    email: new FormControl(''),
    mot_de_passe: new FormControl(''),

  })


  constructor(
    public dialogRef: MatDialogRef<AddLocataireComponent>,
    @Optional() @Inject(MAT_DIALOG_DATA) public data: any,
    private service :UtilisateurService ,
     ) { }

     saveDataUtilisateur() {
      if (this.Utilisateur.valid) {
        this.dialogRef.close({
          event: "insert",
          data: this.Utilisateur.value
        })

      }
    }
}
