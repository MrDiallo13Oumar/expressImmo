import { Component, ViewChild } from '@angular/core';
import { AddReservationComponent } from '../../dialogs/add-reservation/add-reservation.component';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { ReservationService } from '../../services/reservation.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { convertObjectInFormData } from 'src/app/app.component';
import { DeletePopupComponent } from 'src/app/shared/dialogs/delete-popup/delete-popup.component';

@Component({
  selector: 'app-list-reservation',
  templateUrl: './list-reservation.component.html',
  styleUrls: ['./list-reservation.component.scss']
})
export class ListReservationComponent {
displayedColumns: string[] = ['id', 'nom', 'prenom', 'status','telephone', 'created_at', 'propriete', 'action'];
  dataSource = new MatTableDataSource( [] );

      constructor (private dialog : MatDialog ,
                    private service :ReservationService,
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
      this.getReservation()
     }
    getReservation () {
       this.service.getall('reservation', 'readAll.php').subscribe({
         next: (reponse: any) => {
            console.log('REPONSE SUCCESS : ', reponse)
           this.dataSource.data = reponse
           console.log('Liste reservation',this.dataSource.data);

         },
         error: (err: any) => {
           console.log('REPONSE ERROR : ', err)
         }
       })
     }

      openDialog() {
        this.dialog.open(AddReservationComponent, {
         }) .afterClosed()
          .subscribe((result) => {
            if (result?.event && result.event === "insert") {
              // console.log(result.data);
               const formData = convertObjectInFormData(result.data);
              this.dataSource.data.splice(0, this.dataSource.data.length);
              //Envoyer dans la Base
              this.service.create('reservation','create.php', formData).subscribe({
                next: (response) => {
                  this.snackBar.open("Reservation enregistré avec succès !", "Okay", {
                    duration: 3000,
                    horizontalPosition: "right",
                    verticalPosition: "top",
                    panelClass: ['bg-success', 'text-white']

                  })
                  this.getReservation()
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
                this.getReservation()
              }
            });
        }
}
