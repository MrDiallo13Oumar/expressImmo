import { Component, Inject, Optional } from '@angular/core';
import { FormGroup, FormControl } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'app-add-operation',
  templateUrl: './add-operation.component.html',
  styleUrls: ['./add-operation.component.scss']
})
export class AddOperationComponent {
  Operation = new FormGroup({
    type_transaction: new FormControl(''),
      montant: new FormControl(''),
      descriptions: new FormControl(''),
    })

    constructor(
      public dialogRef: MatDialogRef<AddOperationComponent>,
      @Optional() @Inject(MAT_DIALOG_DATA) public data: any,
    ) { }


    saveDataOperation() {
      if (this.Operation.valid) {
        this.dialogRef.close({
          event: "insert",
          data: this.Operation.value
        })
      }
    }
}
