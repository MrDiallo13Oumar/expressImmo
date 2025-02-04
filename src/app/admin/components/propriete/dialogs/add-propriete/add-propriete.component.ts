import { Component, Inject, Optional } from '@angular/core';
import { FormGroup, FormControl } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { ProprieteService } from '../../_services/propriete.service';
import { MatTableDataSource } from '@angular/material/table';
import { convertObjectInFormData } from 'src/app/app.component';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-add-propriete',
  templateUrl: './add-propriete.component.html',
  styleUrls: ['./add-propriete.component.scss']
})
export class AddProprieteComponent {
  displayedColumns: string[] = ['id','reference', 'adresse','statut', 'partenaire', 'action'];

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

  })

  constructor(
    
    private service: ProprieteService,
    private snackBar: MatSnackBar

  ) { }
  
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


  imagePreview: string | ArrayBuffer | null = null
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
