import { Component, ViewChild } from '@angular/core';
import { ReservationService } from '../../reservation/services/reservation.service';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';

@Component({
  selector: 'app-parametrage',
  templateUrl: './parametrage.component.html',
  styleUrls: ['./parametrage.component.scss']
})
export class ParametrageComponent {
displayedColumns: string[] = ['id', 'nom', 'objet', 'email', 'message'];
  dataSource = new MatTableDataSource([]);




  constructor (private dialog : MatDialog ,
              private service : ReservationService,
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
   this.getMessage()
 }
getMessage () {
   this.service.getall('contactez_nous', 'readAll.php').subscribe({
     next: (reponse: any) => {
      //  console.log('REPONSE SUCCESS : ', reponse)
       this.dataSource.data = reponse
      // console.log('Liste Message',this.dataSource.data);

     },
     error: (err: any) => {
       console.log('REPONSE ERROR : ', err)
     }
   })
 }
}
