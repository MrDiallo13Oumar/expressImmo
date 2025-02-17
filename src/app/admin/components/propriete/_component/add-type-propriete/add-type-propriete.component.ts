import { Component, Inject, Optional, ViewChild } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA, MatDialog } from '@angular/material/dialog';
import { ProprieteService } from '../../_services/propriete.service';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { DeletePopupComponent } from 'src/app/shared/dialogs/delete-popup/delete-popup.component';
import { MatSnackBar } from '@angular/material/snack-bar';
import { convertObjectInFormData } from 'src/app/app.component';

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
   displayedColumns: string[] = ['id','libelle', 'action'];
    dataSource = new MatTableDataSource([]);
   constructor(
      private service :ProprieteService,
      private dialog :MatDialog,
      private snackBar :MatSnackBar

    ) { }
@ViewChild(MatPaginator) paginator!: MatPaginator;
@ViewChild(MatSort) sort!: MatSort;
ngAfterViewInit () {
  this.dataSource.paginator = this.paginator
  this.dataSource.sort = this.sort
}
applyFilter (event: Event) {
 const filterValue = (event.target as HTMLInputElement).value
 this.dataSource.filter = filterValue.trim().toLowerCase()

 if (this.dataSource.paginator) {
   this.dataSource.paginator.firstPage()
 }
}
ngOnInit(){
  this.getTypePropriete()
}
getTypePropriete() {
  this.service.getall('typePropriete', 'readAll.php').subscribe({
    next: (reponse: any) => {
      console.log('REPONSE SUCCESS : ', reponse)
      this.dataSource.data = reponse
    },
    error: (err: any) => {
      console.log('REPONSE ERROR : ', err)
    }
  })
}
deleteFunction(id: any, table: string) {
        this.dialog
          .open(DeletePopupComponent, {
            disableClose: true,
            data: {
              title: 'Suppression demandée!',
              message: 'Voulez-vous vraiment supprimer cet élément ?',
              messageNo: 'Non ?',
              messageYes: 'Oui, Confirmer !',
            },
          })
          .afterClosed()
          .subscribe((data: any) => {
            if (data) {
              this.service.delete('public', 'delete.php', table, id).subscribe({
                next: (response: any) => {
                  const messageClass =
                    response.status == 1 ? ['bg-success', 'text-white'] : ['bg-danger', 'text-white'];
                  this.snackBar.open(response.message, 'Okay', {
                    duration: 3000,
                    horizontalPosition: 'right',
                    verticalPosition: 'top',
                    panelClass: messageClass,
                  });
                },
                error: (err: any) => {
                  console.error('Error : ', err);
                },
              });

            }
          });
      }

saveDataTypePropriete() {
    if (this.typePropriete.valid) {
           const formData = convertObjectInFormData(this.typePropriete.value);

      // Envoie les données au serveur
      this.service.create('typePropriete', 'create.php', formData).subscribe({

        next: (response) => {

          this.snackBar.open(response, "Okay", {
            duration: 3000,
            horizontalPosition: "right",
            verticalPosition: "top",
            panelClass: ['bg-success', 'text-white']
          })
          this.getTypePropriete()
          this.typePropriete.reset()



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
