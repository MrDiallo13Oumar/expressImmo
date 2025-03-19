import { Component, ViewChild } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { ProprieteService } from '../../_services/propriete.service';
import { ActivatedRoute, Router } from '@angular/router';
import { convertObjectInFormData } from 'src/app/app.component';

@Component({
  selector: 'app-update-type-propriete',
  templateUrl: './update-type-propriete.component.html',
  styleUrls: ['./update-type-propriete.component.scss']
})
export class UpdateTypeProprieteComponent {
 updated_by = localStorage.getItem('id_user');

 typePropriete = new FormGroup({

    id: new FormControl(''),
    libelle: new FormControl(''),
    updated_by: new FormControl(this.updated_by, Validators.required),

  })
   displayedColumns: string[] = ['id','libelle' ];
      dataSource = new MatTableDataSource([]);
     constructor(
        private service :ProprieteService,
        private snackBar :MatSnackBar,
        private activeroute: ActivatedRoute,
        private router :Router

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
  idTypePropriete: any
  ngOnInit(){
    (this.idTypePropriete = this.activeroute.snapshot.params['id'])
    this.getTypePropriete()
    this.getOneTypePropriete()
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
  infoTypePropriete : any
  getOneTypePropriete() {
    console.log('ID en GET : ', this.idTypePropriete);
    this.service.getOne('typePropriete', 'getOne.php', this.idTypePropriete).subscribe({
      next: (response: any) => {
        console.log('Info : ', response);
        this.infoTypePropriete = response;
        this.typePropriete.patchValue(this.infoTypePropriete);


      },
      error: (error: any) => {
        console.log('Error : ', error);
      },
    });
  }
 confirmEditing(form: FormGroup): void {
         // Appliquez la transformation

         const formData = convertObjectInFormData(this.typePropriete.value);
         console.log('Form Data Avant Envoi:', formData); // Vérifiez les données après la transformation

         this.service
           .update('typePropriete', 'update.php', formData)
           .subscribe({
             next: (response: any) => {
              this.infoTypePropriete = response;
              console.log('Modification:', this.infoTypePropriete);
               this.snackBar.open('Modification effectuée avec succès !', 'Okay', {
                 duration: 3000,
                 horizontalPosition: 'right',
                 verticalPosition: 'top',
                 panelClass: ['bg-success', 'text-white'],
               });
               this.router.navigate(['/propriete/type-propriete']);

             },
             error: (error: any) => {
               console.log('Error : ', error);
               this.snackBar.open('Modification impossible !', 'Okay', {
                 duration: 3000,
                 horizontalPosition: 'right',
                 verticalPosition: 'top',
                 panelClass: ['bg-danger', 'text-white'],
               });
             },

           });

       }
}
