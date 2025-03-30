import { Component } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { PartenaireService } from '../../../partenaire/services/partenaire.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ActivatedRoute, Router } from '@angular/router';
import { convertObjectInFormData } from 'src/app/app.component';

@Component({
  selector: 'app-details-propriete',
  templateUrl: './details-propriete.component.html',
  styleUrls: ['./details-propriete.component.scss']
})
export class DetailsProprieteComponent {
  modify_by = localStorage.getItem('id_user')
  Propriete = new FormGroup({
    id: new FormControl(''),
    partenaire_id: new FormControl(''),
    quartier_id: new FormControl(''),
    reference: new FormControl(''),
    adresse: new FormControl(''),
    descriptions: new FormControl(''),
    etat: new FormControl(''),
    disponible: new FormControl(''),
    prix_journalier: new FormControl(''),
    prix_mensuel: new FormControl(''),
    poster: new FormControl(''),
    modify_by: new FormControl(this.modify_by, Validators.required),

  })
  constructor(
    private service: PartenaireService,
    private snackBar: MatSnackBar,
    private activeroute: ActivatedRoute,
    private router: Router
  ) {

  }
  imagePreview: string | ArrayBuffer | null = null;
  selectedFile: File | null = null;

  imagePreviews: string[] = [];
  selectedFiles: File[] = [];
  idPropriete: any

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
  ngOnInit() {

    (this.idPropriete = this.activeroute.snapshot.params['id']),
      this.getOnePropriete(),
      this.getPartenaire();

    this.getQuartier();
  }
  infoPropriete: any = {};
  getOnePropriete() {
    this.service.getOne('propriete', 'getOne.php', this.idPropriete).subscribe({
      next: (response: any) => {
        console.log('Info : ', response);
        this.infoPropriete = response;
  
        // Vérifie si les objets quartier et partenaire existent avant d'extraire les IDs
        const quartier_id = response.quartier ? response.quartier.id : null;
        const partenaire_id = response.partenaire ? response.partenaire.id : null;
  
        // Mise à jour du formulaire
        this.Propriete.patchValue({
          ...this.infoPropriete, // Applique les autres valeurs normalement
          quartier_id: quartier_id, // Affecte uniquement l'ID du quartier
          partenaire_id: partenaire_id, // Affecte uniquement l'ID du partenaire
        });
      },
      error: (error: any) => {
        console.log('Error : ', error);
      },
    });
  }
  
  getGalleryImages(): string[] {
    if (!this.infoPropriete.gallery) {
      return [];
    }
    // Si c'est une chaîne, on la transforme en tableau
    if (typeof this.infoPropriete.gallery === 'string') {
      return this.infoPropriete.gallery.split(',').map((img: any) => img.trim());
    }
    // Si c'est déjà un tableau, on le retourne directement
    if (Array.isArray(this.infoPropriete.gallery)) {
      return this.infoPropriete.gallery;
    }
    return [];
  }

  Partenaire: any = []
  getPartenaire() {
    this.service.getall('partenaire', 'readAll.php').subscribe({
      next: (reponse: any) => {
        //   //console.log('REPONSE SUCCESS : ', reponse)
        this.Partenaire = reponse

      },
      error: (err: any) => {
        //console.log('REPONSE ERROR : ', err)
      }
    })
  }

  Quartier: any = []
  getQuartier() {
    this.service.getall('quartier', 'readAll.php').subscribe({
      next: (reponse: any) => {
        //    //console.log('REPONSE SUCCESS : ', reponse)
        this.Quartier = reponse

      },
      error: (err: any) => {
        //console.log('REPONSE ERROR : ', err)
      }
    })
  }
  confirmEditing(): void {
    // Appliquez la transformation

    const formData = convertObjectInFormData(this.Propriete.value);
    //console.log('Form Data Before Sending:', formData); // Vérifiez les données après la transformation

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

    this.service
      .update('propriete', 'update.php', formData)
      .subscribe({
        next: (response: any) => {
          this.infoPropriete = response;
          //console.log('Modification:', this.infoPropriete);
          this.snackBar.open('Modification effectuée avec succès !', 'Okay', {
            duration: 3000,
            horizontalPosition: 'right',
            verticalPosition: 'top',
            panelClass: ['bg-success', 'text-white'],
          });
          this.router.navigate(['/propriete/list-propriete']);

        },
        error: (error: any) => {
          //console.log('Error : ', error);
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
