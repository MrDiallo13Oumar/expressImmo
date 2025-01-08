import { Component, ViewChild } from '@angular/core';
import { AddLocataireComponent } from '../../dialogs/add-locataire/add-locataire.component';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { convertObjectInFormData } from 'src/app/app.component';
import { LocataireService } from '../../services/locataire.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { DeletePopupComponent } from 'src/app/shared/dialogs/delete-popup/delete-popup.component';

@Component({
  selector: 'app-list-locataire',
  templateUrl: './list-locataire.component.html',
  styleUrls: ['./list-locataire.component.scss']
})
export class ListLocataireComponent {
displayedColumns: string[] = ['id', 'nomComplet','adresse', 'telephone', 'email',  'action'];
  dataSource = new MatTableDataSource([]);



    constructor (private dialog : MatDialog ,
                  private locataire :LocataireService,
                  private snackBar : MatSnackBar
  ){}

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
  ngOnInit() {
    this.getLocataire()
   }
  getLocataire () {
     this.locataire.getall('locataire', 'readAll.php').subscribe({
       next: (reponse: any) => {
          console.log('REPONSE SUCCESS : ', reponse)
         this.dataSource.data = reponse
       },
       error: (err: any) => {
         console.log('REPONSE ERROR : ', err)
       }
     })
   }

    openDialog() {
      this.dialog.open(AddLocataireComponent, {
       }) .afterClosed()
        .subscribe((result) => {
          if (result?.event && result.event === "insert") {
            // console.log(result.data);
             const formData = convertObjectInFormData(result.data);
            this.dataSource.data.splice(0, this.dataSource.data.length);
            //Envoyer dans la Base
            this.locataire.create('locataire','create.php', formData).subscribe({
              next: (response) => {
                this.snackBar.open("Locataire enregistré avec succès !", "Okay", {
                  duration: 3000,
                  horizontalPosition: "right",
                  verticalPosition: "top",
                  panelClass: ['bg-success', 'text-white']

                })
                this.getLocataire()
              },
              error: (err: any) => {
                this.snackBar.open("Echec de l'ajout !", "Okay", {
                  duration: 3000,
                  horizontalPosition: "right",
                  verticalPosition: "top",
                  panelClass: ['bg-danger', 'text-white']
                })
              }
            })
          }
       })
    }

      // DELETE
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
              this.locataire.delete('public', 'delete.php', table, id).subscribe({
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
              this.getLocataire()
            }
          });
      }
}
