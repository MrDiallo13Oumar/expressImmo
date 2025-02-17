import { Component, Inject, Optional } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA, MatDialog } from '@angular/material/dialog';
import { ProprieteService } from '../../_services/propriete.service';
import { MatTableDataSource } from '@angular/material/table';
import { convertObjectInFormData } from 'src/app/app.component';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { AddTypeProprieteComponent } from '../add-type-propriete/add-type-propriete.component';

@Component({
  selector: 'app-add-propriete',
  templateUrl: './add-propriete.component.html',
  styleUrls: ['./add-propriete.component.scss']
})
export class AddProprieteComponent {
  displayedColumns: string[] = ['id','reference', 'adresse','statut', 'partenaire', 'action'];
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

   constructor (private dialog : MatDialog ,
                  private service :ProprieteService,
                  private snackBar :MatSnackBar,
                  private router : Router
  ){}

  ngOnInit() {
    this.getPropriete()
    this.getPartenaire();
    this.getTypePropriete();
    this.getQuartier();

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

  selectedFiles: File[] = []; // Stocke plusieurs fichiers
  imagePreviews: string[] = []; // Stocke les prévisualisations
  
  imagePreview: string | ArrayBuffer | null = null
  selectedFile: any
  uploadResponse: string | null = null
  onFileChange(event: any) {
    this.selectedFiles = []; // Réinitialise les fichiers sélectionnés
    this.imagePreviews = []; // Réinitialise les prévisualisations
    
    if (event.target.files && event.target.files.length > 0) {
      for (let file of event.target.files) {
        const reader = new FileReader();
        reader.onload = (e: any) => {
          this.imagePreviews.push(e.target.result); // Ajoute l'aperçu
        };
        reader.readAsDataURL(file);
        this.selectedFiles.push(file); // Ajoute le fichier au tableau
      }
    }
  }
  

  dataSource = new MatTableDataSource([]);
  getPropriete() {
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

  applyFilter (event: Event) {
    const filterValue = (event.target as HTMLInputElement).value
    this.dataSource.filter = filterValue.trim().toLowerCase()

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage()
    }
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
              this.getTypePropriete()
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
  saveDataPropriete() {
    if (this.Propriete.valid) {
      
      
  
      // Ajouter les autres champs du formulaire
      const formData = convertObjectInFormData(this.Propriete.value);
      Object.keys(this.Propriete.controls).forEach((key) => {
        const control = this.Propriete.get(key);
        if (control && control.value !== null) {
          formData.append(key, control.value);
        }
      });
      
      // Ajouter plusieurs fichiers
      if (this.selectedFiles.length > 0) {
        for (let file of this.selectedFiles) {
          formData.append('file[]', file, file.name);
        }
      }
      
     // Envoi des données
      this.service.create('propriete', 'create.php', formData).subscribe({
        next: (response) => {
          this.snackBar.open("Propriété ajoutée avec succès !", "Okay", {
            duration: 3000,
            horizontalPosition: "right",
            verticalPosition: "top",
            panelClass: ['bg-success', 'text-white']
          });
          this.router.navigate(['/propriete/list-propriete']);
          this.getPropriete();
          this.Propriete.reset();
          this.imagePreviews = [];
        },
        error: (err: any) => {
          this.snackBar.open("Erreur lors de l'ajout !", "Okay", {
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
