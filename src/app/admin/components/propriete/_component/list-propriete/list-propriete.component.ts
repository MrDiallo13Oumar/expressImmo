import { Component, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { AddProprieteComponent } from '../../dialogs/add-propriete/add-propriete.component';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { ProprieteService } from '../../_services/propriete.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { convertObjectInFormData } from 'src/app/app.component';
import { DeletePopupComponent } from 'src/app/shared/dialogs/delete-popup/delete-popup.component';
import { AddTypeProprieteComponent } from '../../dialogs/add-type-propriete/add-type-propriete.component';

@Component({
  selector: 'app-list-propriete',
  templateUrl: './list-propriete.component.html',
  styleUrls: ['./list-propriete.component.scss']
})
export class ListProprieteComponent {
  displayedColumns: string[] = ['id','reference', 'adresse', 'descriptions', 'statut', 'partenaire', 'action'];
  dataSource = new MatTableDataSource([]);




  constructor (private dialog : MatDialog ,
                private service :ProprieteService,
                private snackBar :MatSnackBar,
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
  this.getPropriete()
 }
getPropriete () {
   this.service.getall('propriete', 'readAll.php').subscribe({
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
    this.dialog.open(AddProprieteComponent, {
     }) .afterClosed()
      .subscribe((result) => {
        if (result?.event && result.event === "insert") {
          // console.log(result.data);
           const formData = convertObjectInFormData(result.data);
          this.dataSource.data.splice(0, this.dataSource.data.length);
          //Envoyer dans la Base
          this.service.create('propriete','create.php', formData).subscribe({
            next: (response) => {
              this.snackBar.open("Propriété enregistré avec succès !", "Okay", {
                duration: 3000,
                horizontalPosition: "right",
                verticalPosition: "top",
                panelClass: ['bg-success', 'text-white']

              })
              this.getPropriete()
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
  openDialog2() {
    this.dialog.open(AddTypeProprieteComponent, {
     }) .afterClosed()
      .subscribe((result) => {
        if (result?.event && result.event === "insert") {
          // console.log(result.data);
           const formData = convertObjectInFormData(result.data);
          this.dataSource.data.splice(0, this.dataSource.data.length);
          //Envoyer dans la Base
          this.service.create('typePropriete','create.php', formData).subscribe({
            next: (response) => {
              this.snackBar.open("Type de Propriété enregistré avec succès !", "Okay", {
                duration: 3000,
                horizontalPosition: "right",
                verticalPosition: "top",
                panelClass: ['bg-success', 'text-white']

              })
              this.getPropriete()
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
              this.getPropriete()
            }
          });
      }
}
