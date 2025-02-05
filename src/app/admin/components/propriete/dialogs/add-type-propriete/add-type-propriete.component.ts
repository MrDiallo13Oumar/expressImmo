import { Component, Inject, Optional } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { ProprieteService } from '../../_services/propriete.service';

@Component({
  selector: 'app-add-type-propriete',
  templateUrl: './add-type-propriete.component.html',
  styleUrls: ['./add-type-propriete.component.scss']
})
export class AddTypeProprieteComponent {
  created_by = localStorage.getItem('id_user');
  
 typePropriete = new FormGroup({

    libelle: new FormControl(''),
    created_by: new FormControl(this.created_by, Validators.required),

  })
   constructor(
      public dialogRef: MatDialogRef<AddTypeProprieteComponent>,
      @Optional() @Inject(MAT_DIALOG_DATA) public data: any,
      private service :ProprieteService

    ) { }



  saveDatatypePropriete() {
    if (this.typePropriete.valid) {
      this.dialogRef.close({
        event: "insert",
        data: this.typePropriete.value
      })
    }
  }
}
