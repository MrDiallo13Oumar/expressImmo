import { Component, Inject, Optional } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { PartenaireService } from '../../services/partenaire.service';

@Component({
  selector: 'app-add-partenaire',
  templateUrl: './add-partenaire.component.html',
  styleUrls: ['./add-partenaire.component.scss']
})
export class AddPartenaireComponent {
  created_by = localStorage.getItem('id_user');
  
Partenaire = new FormGroup({
    libelle :new FormControl(''),
    email: new FormControl(''),
    telephone: new FormControl(''),
    adresse :new FormControl(''),
    created_by: new FormControl(this.created_by, Validators.required),
  })

  constructor(
    public dialogRef: MatDialogRef<AddPartenaireComponent>,
    @Optional() @Inject(MAT_DIALOG_DATA) public data: any,
    private service :PartenaireService

  ) { }



  saveDataPartenaire() {
    if (this.Partenaire.valid) {
      this.dialogRef.close({
        event: "insert",
        data: this.Partenaire.value
      })
    }
  }
}
