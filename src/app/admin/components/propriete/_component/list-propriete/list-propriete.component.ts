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
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-list-propriete',
  templateUrl: './list-propriete.component.html',
  styleUrls: ['./list-propriete.component.scss']
})
export class ListProprieteComponent {
   created_by = localStorage.getItem('id_user');

    Propriete = new FormGroup({
      partenaire_id: new FormControl(''),
      quartier_id: new FormControl(''),
      reference: new FormControl(''),
      adresse: new FormControl(''),
      descriptions: new FormControl(''),
      etat: new FormControl(''),
      disponible: new FormControl(''),
      prix_journalier: new FormControl(''),
      prix_mensuel: new FormControl(''),
      typepropriete_id: new FormControl(''),
      poster: new FormControl(''),
      created_by: new FormControl(this.created_by, Validators.required),

    })
  displayedColumns: string[] = ['id','reference','statut', 'partenaire', 'action'];
  dataSource = new MatTableDataSource([]);

  imagePreview: string | ArrayBuffer | null = null


  constructor (private dialog : MatDialog ,
                private service :ProprieteService,
                private snackBar :MatSnackBar,
                private router : Router
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
  this.getPropriete(),
  this.getPartenaire();
  this.getTypePropriete();
  this.getQuartier();
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


 selectedFile: any
 uploadResponse: string | null = null
 onFileChange(event: any) {
  const file: File = event.target.files[0]
  if (file) {
    const reader = new FileReader()
    reader.onload = (e: any) => {
      this.imagePreview = e.target.result
    }
    reader.readAsDataURL(file)
    console.log("file", file);

    this.selectedFile = file
    console.log("SelectedFile", file);

  }
}


 openDialog() {
  this.dialog.open(AddProprieteComponent, {}).afterClosed().subscribe((result) => {
    if (result?.event && result.event === "insert") {
      const formData = convertObjectInFormData(result.data);
      this.dataSource.data.splice(0, this.dataSource.data.length);

      // Si un fichier a été sélectionné, on l'ajoute à formData
      if (this.selectedFile) {
        formData.append('file', this.selectedFile);
      }

      // Envoyer les données dans la base de données
      this.service.create('propriete', 'create.php', formData).subscribe({
        next: (response) => {

          this.snackBar.open("Propriété enregistrée avec succès !", "Okay", {
            duration: 3000,
            horizontalPosition: "right",
            verticalPosition: "top",
            panelClass: ['bg-success', 'text-white']
          });
          this.getPropriete();
        },
        error: (err: any) => {
          this.snackBar.open("Échec de l'ajout !", "Okay", {
            duration: 3000,
            horizontalPosition: "right",
            verticalPosition: "top",
            panelClass: ['bg-danger', 'text-white']
          });
        }
      });
    }
  });
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
             this.router.navigate(['/propriete/list-propriete'])
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
      typePropriete: any = []
      getTypePropriete() {
        this.service.getall('typePropriete', 'readAll.php').subscribe({
          next: (reponse: any) => {
            console.log('REPONSE SUCCESS : ', reponse)
            this.typePropriete = reponse
          },
          error: (err: any) => {
            console.log('REPONSE ERROR : ', err)
          }
        })
      }
      Partenaire: any = []
      getPartenaire() {
        this.service.getall('partenaire', 'readAll.php').subscribe({
          next: (reponse: any) => {
            console.log('REPONSE SUCCESS : ', reponse)
            this.Partenaire = reponse

          },
          error: (err: any) => {
            console.log('REPONSE ERROR : ', err)
          }
        })
      }

      Quartier: any = []
      getQuartier() {
        this.service.getall('quartier', 'readAll.php').subscribe({
          next: (reponse: any) => {
            console.log('REPONSE SUCCESS : ', reponse)
            this.Quartier = reponse

          },
          error: (err: any) => {
            console.log('REPONSE ERROR : ', err)
          }
        })
      }

      saveDataPropriete() {
        if (this.Propriete.valid) {
               const formData = convertObjectInFormData(this.Propriete.value);
          // Si un fichier a été sélectionné, ajoute-le à FormData

          console.log("propriete", this.Propriete.value.poster);

          if (this.selectedFile) {
            formData.append('file', this.selectedFile, this.selectedFile.name);
            console.log("this.selectedFile", this.selectedFile.name);
            // this.Propriete.value.poster = this.selectedFile.name

          }
          // Envoie les données au serveur
          this.service.create('propriete', 'create.php', formData).subscribe({

            next: (response) => {

              this.snackBar.open(response, "Okay", {
                duration: 3000,
                horizontalPosition: "right",
                verticalPosition: "top",
                panelClass: ['bg-success', 'text-white']
              });
              console.log("response", response);
              this.getPropriete();
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
