import { Component, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { RapportService } from '../../services/rapport.service';
import { FormGroup, FormControl } from '@angular/forms';
import { convertObjectInFormData } from 'src/app/app.component';


@Component({
  selector: 'app-rapport',
  templateUrl: './rapport.component.html',
  styleUrls: ['./rapport.component.scss']
})
export class RapportComponent {

    // Définition du formulaire
 reportForm = new FormGroup({
  date_debut: new FormControl(''),
  date_fin: new FormControl(''),
  type_transaction: new FormControl('')
});


  operationTypes: string[] = ['encaissement', 'decaissement', 'paiement'];



  ngOnInit() {

  }


displayedColumns: string[] = ['id', 'montant', 'motif', 'type_transaction','created_by' ];
  dataSource = new MatTableDataSource([]);




  constructor (private dialog : MatDialog ,
              private service : RapportService,
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
generateReport() {
  const formValues: any = this.reportForm.value;


  const formattedData = {
    date_debut: formValues.date_debut instanceof Date ? this.formatDate(formValues.date_debut) : '',
    date_fin: formValues.date_fin instanceof Date ? this.formatDate(formValues.date_fin) : '',
    type_transaction: formValues.type_transaction || ''
  };


  const formData = convertObjectInFormData(formattedData);

  console.log('Données envoyées :', formData);

  this.service.create('caisse', 'operation.php', formData).subscribe({
    next: (reponse: any) => {
      console.log('REPONSE SUCCESS : ', reponse);
      this.dataSource.data = reponse;
      console.log('Rapport', this.dataSource.data);


      if (reponse && reponse.message) {
        this.snackBar.open(reponse.message, "Okay", {
          duration: 3000,
          horizontalPosition: "right",
          verticalPosition: "top",
          panelClass: ['bg-success', 'text-white']
        });
      }
    },
    error: (err: any) => {
      console.log('REPONSE ERROR : ', err);


      const errorMessage = err.error?.message || "Une erreur s'est produite lors de la génération du rapport.";


      this.snackBar.open(errorMessage, "Okay", {
        duration: 3000,
        horizontalPosition: "right",
        verticalPosition: "top",
        panelClass: ['bg-danger', 'text-white']
      });
    }
  });
}
// Fonction utilitaire pour formater les dates
private formatDate(date: Date): string {
  return date.toISOString().split('T')[0]; // Format YYYY-MM-DD
}

}
