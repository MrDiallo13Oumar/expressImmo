import { Component, Inject, Optional } from '@angular/core';
import { FormGroup, FormControl } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { ProprieteService } from '../../_services/propriete.service';

@Component({
  selector: 'app-add-propriete',
  templateUrl: './add-propriete.component.html',
  styleUrls: ['./add-propriete.component.scss']
})
export class AddProprieteComponent {
 Propriete = new FormGroup({
    partenaire_id :new FormControl(''),
    quartier_id :new FormControl(''),
    reference: new FormControl(''),
    adresse: new FormControl(''),
    descriptions: new FormControl(''),
    etat :new FormControl(''),
    disponible :new FormControl(''),
    prix_journalier :new FormControl(''),
    prix_mensuel :new FormControl(''),
    typepropriete_id :new FormControl(''),
    poster :new FormControl(''),

  })

  constructor(
    public dialogRef: MatDialogRef<AddProprieteComponent>,
    @Optional() @Inject(MAT_DIALOG_DATA) public data: any,
    private service :ProprieteService

  ) { }
  imagePreview: string | ArrayBuffer | null = null
  ngOnInit(){
    this.getPartenaire();
    this.getTypePropriete();
    this.getQuartier();

  }
  typePropriete :any =[]
  getTypePropriete () {
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
  Partenaire : any =[]
   getPartenaire () {
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

   Quartier : any =[]
   getQuartier () {
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

   selectedFile: any
   uploadResponse: string | null = null
   onFileChange (event: any) {
     const file: File = event.target.files[0]
     if (file) {
       const reader = new FileReader()
       reader.onload = (e: any) => {
         this.imagePreview = e.target.result
       }
       reader.readAsDataURL(file)
       this.selectedFile = file
     }
   }
  saveDataPropriete() {
    if (this.Propriete.valid) {
      this.dialogRef.close({
        event: "insert",
        data: this.Propriete.value
      })
    }
  }
}
