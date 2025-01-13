import { Component, ViewChild } from '@angular/core';
import { AddUserComponent } from '../../dialogs/add-user/add-user.component';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { UtilisateurService } from '../../services/utilisateur.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { convertObjectInFormData } from 'src/app/app.component';

@Component({
  selector: 'app-list-user',
  templateUrl: './list-user.component.html',
  styleUrls: ['./list-user.component.scss']
})
export class ListUserComponent {
displayedColumns: string[] = ['id', 'name', 'status', 'date', 'price', 'action'];
  dataSource = new MatTableDataSource([]);




  constructor (private dialog : MatDialog ,
              private service : UtilisateurService,
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
  this.getUtilisateur()
 }
getUtilisateur () {
   this.service.getall('utilisateur', 'readAll.php').subscribe({
     next: (reponse: any) => {
        console.log('REPONSE SUCCESS : ', reponse)
       this.dataSource.data = reponse
       console.log('Liste Utilisateur',this.dataSource.data);

     },
     error: (err: any) => {
       console.log('REPONSE ERROR : ', err)
     }
   })
 }

  openDialog() {
    this.dialog.open(AddUserComponent, {
     }).afterClosed()
      .subscribe((result) => {
        if (result?.event && result.event === "insert") {
          // console.log(result.data);
           const formData = convertObjectInFormData(result.data);
          this.dataSource.data.splice(0, this.dataSource.data.length);
          //Envoyer dans la Base
          this.service.create('utilisateur','create.php', formData).subscribe({
            next: (response) => {
              this.snackBar.open("Utilisateur enregistré avec succès !", "Okay", {
                duration: 3000,
                horizontalPosition: "right",
                verticalPosition: "top",
                panelClass: ['bg-success', 'text-white']

              })
              this.getUtilisateur()
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
}
