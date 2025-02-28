import { Component } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
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
    // Note : la galerie sera ajoutée via le FormData et non directement par le formControl
  });

  imagePreview: string | ArrayBuffer | null = null;
  selectedFile: File | null = null;

  imagePreviews: string[] = [];
  selectedFiles: File[] = [];

  constructor (
    private dialog: MatDialog,
    private service: ProprieteService,
    private snackBar: MatSnackBar,
    private router: Router
  ){}

  ngOnInit() {
    this.getPropriete();
    this.getPartenaire();
    this.getTypePropriete();
    this.getQuartier();
  }

  typePropriete: any = [];
  getTypePropriete() {
    this.service.getall('typePropriete', 'readAll.php').subscribe({
      next: (reponse: any) => {
        this.typePropriete = reponse;
      },
      error: (err: any) => {
        console.log('Erreur lors de la récupération des types de propriété : ', err);
      }
    });
  }

  Partenaire: any = [];
  getPartenaire() {
    this.service.getall('partenaire', 'readAll.php').subscribe({
      next: (reponse: any) => {
        this.Partenaire = reponse;
      },
      error: (err: any) => {
        console.log('Erreur lors de la récupération des partenaires : ', err);
      }
    });
  }

  Quartier: any = [];
  getQuartier() {
    this.service.getall('quartier', 'readAll.php').subscribe({
      next: (reponse: any) => {
        this.Quartier = reponse;
      },
      error: (err: any) => {
        console.log('Erreur lors de la récupération des quartiers : ', err);
      }
    });
  }

  // Gestion de l'image principale
  onFileChange(event: any) {
    const file: File = event.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (e: any) => {
        this.imagePreview = e.target.result;
      };
      reader.readAsDataURL(file);
      this.selectedFile = file;
    }
  }

  // Gestion de plusieurs images pour la galerie
  onFilesChange(event: any) {
    const files: FileList = event.target.files;
    this.imagePreviews = [];
    this.selectedFiles = [];

    for (let i = 0; i < files.length; i++) {
      const file = files[i];
      const reader = new FileReader();
      reader.onload = (e: any) => {
        this.imagePreviews.push(e.target.result);
      };
      reader.readAsDataURL(file);
      this.selectedFiles.push(file);
    }
  }

  dataSource = new MatTableDataSource([]);
  getPropriete() {
    this.service.getall('propriete', 'readAll.php').subscribe({
      next: (reponse: any) => {
        this.dataSource.data = reponse;
      },
      error: (err: any) => {
        console.log('Erreur lors de la récupération des propriétés : ', err);
      }
    });
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }

  openDialog2() {
    this.dialog.open(AddTypeProprieteComponent)
      .afterClosed()
      .subscribe((result) => {
        if (result?.event && result.event === "insert") {
          const formData = convertObjectInFormData(result.data);
          this.dataSource.data.splice(0, this.dataSource.data.length);
          this.service.create('typePropriete', 'create.php', formData).subscribe({
            next: (response) => {
              this.snackBar.open("Type de Propriété enregistré avec succès !", "Okay", {
                duration: 3000,
                horizontalPosition: "right",
                verticalPosition: "top",
                panelClass: ['bg-success', 'text-white']
              });
              this.getTypePropriete();
              this.router.navigate(['/propriete/list-propriete']);
            },
            error: (err: any) => {
              this.snackBar.open("Echec de l'ajout !", "Okay", {
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

  // saveDataPropriete() {
  //   if (this.Propriete.valid) {
  //     const formData = convertObjectInFormData(this.Propriete.value);

  //     // Ajout de l'image principale
  //     if (this.selectedFile) {
  //       formData.append('file', this.selectedFile, this.selectedFile.name);
  //     }

  //     // Ajout de toutes les images de la galerie
  //     if (this.selectedFiles.length > 0) {
  //       this.selectedFiles.forEach((file) => {
  //         formData.append('files[]', file, file.name);
  //       });
  //     }

  //     // Envoie les données au serveur
  //     this.service.create('propriete', 'create.php', formData).subscribe({
  //       next: (response) => {
  //         this.snackBar.open(response, "Okay", {
  //           duration: 3000,
  //           horizontalPosition: "right",
  //           verticalPosition: "top",
  //           panelClass: ['bg-success', 'text-white']
  //         });
  //         this.router.navigate(['/propriete/list-propriete']);
  //         this.getPropriete();
  //         this.Propriete.reset();
  //         this.imagePreview = null;
  //         this.imagePreviews = [];
  //         this.selectedFile = null;
  //         this.selectedFiles = [];
  //       },
  //       error: (err: any) => {
  //         this.snackBar.open("Erreur lors de l'ajout !", "Okay", {
  //           duration: 3000,
  //           horizontalPosition: "right",
  //           verticalPosition: "top",
  //           panelClass: ['bg-danger', 'text-white']
  //         });
  //       }
  //     });
  //   }
  // }
  isLoading = false; // Variable pour gérer l'état du chargement

saveDataPropriete() {
  if (this.Propriete.valid) {
    this.isLoading = true; // Active le chargement
    const formData = convertObjectInFormData(this.Propriete.value);

    // Ajout de l'image principale
    if (this.selectedFile) {
      formData.append('file', this.selectedFile, this.selectedFile.name);
    }

    // Ajout des images de la galerie
    if (this.selectedFiles.length > 0) {
      this.selectedFiles.forEach((file) => {
        formData.append('files[]', file, file.name);
      });
    }

    // Envoie des données au serveur
    this.service.create('propriete', 'create.php', formData).subscribe({
      next: (response) => {
        this.isLoading = false; // Désactive le chargement

        this.snackBar.open(response, "Okay", {
          duration: 3000,
          horizontalPosition: "right",
          verticalPosition: "top",
          panelClass: ['bg-success', 'text-white']
        });

        this.router.navigate(['/propriete/list-propriete']);
        this.getPropriete();
        this.Propriete.reset();
        this.imagePreview = null;
        this.imagePreviews = [];
        this.selectedFile = null;
        this.selectedFiles = [];
      },
      error: (err: any) => {
        this.isLoading = false; // Désactive le chargement en cas d'erreur

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
