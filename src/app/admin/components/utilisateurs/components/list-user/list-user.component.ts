import { Component, ViewChild } from '@angular/core';
import { AddUserComponent } from '../../dialogs/add-user/add-user.component';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';

@Component({
  selector: 'app-list-user',
  templateUrl: './list-user.component.html',
  styleUrls: ['./list-user.component.scss']
})
export class ListUserComponent {
displayedColumns: string[] = ['id', 'name', 'status', 'date', 'price', 'action'];
  dataSource = new MatTableDataSource( [
    { id: 1, name: 'Kolor Tea Shirt For Man', status: 'Sale', date: '2023-01-22', price: 21.56 },
    { id: 2, name: 'Kolor Tea Shirt For Women', status: 'Tax', date: '2023-01-30', price: 55.32 },
    { id: 3, name: 'Blue Backpack For Baby', status: 'Extended', date: '2023-01-25', price: 14.85 },
  ]);


  updateItem(id: number) {
    console.log('Update item with id:', id);
  }

  deleteItem(id: number) {
    console.log('Delete item with id:', id);
  }

  constructor (private dialog : MatDialog ,

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

  openDialog() {
    this.dialog.open(AddUserComponent, {
     }) //.afterClosed()
      // .subscribe((result) => {
      //   if (result?.event && result.event === "insert") {
      //     // console.log(result.data);
      //      const formData = convertObjectInFormData(result.data);
      //     this.dataSource.data.splice(0, this.dataSource.data.length);
      //     //Envoyer dans la Base
      //     this.service.create('engins','create.php', formData).subscribe({
      //       next: (response) => {
      //         this.snackBar.open("Engins enregistré avec succès !", "Okay", {
      //           duration: 3000,
      //           horizontalPosition: "right",
      //           verticalPosition: "top",
      //           panelClass: ['bg-success', 'text-white']

      //         })
      //         this.getEngins()
      //       },
      //       error: (err: any) => {
      //         this.snackBar.open("Echec de l'ajout !", "Okay", {
      //           duration: 3000,
      //           horizontalPosition: "right",
      //           verticalPosition: "top",
      //           panelClass: ['bg-danger', 'text-white']
      //         })
      //       }
      //     })
      //   }
     // })
  }
}
