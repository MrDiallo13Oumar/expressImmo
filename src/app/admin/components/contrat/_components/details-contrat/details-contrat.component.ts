import { Component, OnInit } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ActivatedRoute, Router } from '@angular/router';
import { ContratService } from '../../_services/contrat.service';
import { FormControl, FormGroup } from '@angular/forms';
import { MatDialogRef } from '@angular/material/dialog';
import { AddContratComponent } from '../../dialogs/add-contrat/add-contrat.component';

@Component({
  selector: 'app-details-contrat',
  templateUrl: './details-contrat.component.html',
  styleUrls: ['./details-contrat.component.scss']
})
export class DetailsContratComponent{


  //   Locataire = new FormGroup({
  //   propriete_id: new FormControl(''),
  //   nom: new FormControl(''),
  //   prenom: new FormControl(''),
  //   telephone: new FormControl(''),
  //   email: new FormControl(''),
  //   nationalite :new FormControl(''),
  //   date_naissance: new FormControl(''),
  //   lieu_naissance: new FormControl(''),
  //   typePiece :new FormControl(''),
  //   numeroPiece :new FormControl(''),
  //   adresse :new FormControl(''),
  //   contrat_id : new FormControl('')
  // })

  // Contrat = new FormGroup({
      
  //     locataire_id: new FormControl(''),
  //     propriete_id: new FormControl(''),
  //     caution: new FormControl(''),
  //     prix_journalier: new FormControl(''),
  //     date_debut: new FormControl(''),
  //     date_fin: new FormControl(''),
  //     montant_total: new FormControl(''),
  //     statut :new FormControl(''),
  
  //   })

  // constructor(
  //       public dialogRef: MatDialogRef<AddContratComponent>,
  //       private service: ContratService,
  //       private snackBar: MatSnackBar,
  //       private activeroute: ActivatedRoute,
  //       private router :Router
  //  ){}
  // idContrat:any
  // ngOnInit(){
    
  // }
  // infoContrat: any = {};
  // getOneContrat() {
  //   console.log('ID en GET : ', this.idContrat);
  //   this.service.getOne('contrats', 'getOne.php', this.idContrat).subscribe({
  //     next: (response: any) => {
  //       console.log('Info : ', response);
  //       this.infoContrat = response;
  //       this.Contrat.patchValue(this.infoContrat);
        
  //     },
  //     error: (error: any) => {
  //       console.log('Error : ', error);
  //     },
  //   });
  // }

  // // ENREGISTRER LE CONTRAT
  // saveDataContrat() {
  //   if (this.Contrat.valid) {
  //     this.dialogRef.close({
  //       event: "insert",
  //       data: this.Contrat.value
  //     })
  //   }
  // }

  // // ENREGISTRER LE LOCATAIRE
  // saveDataLocataire() {
  //   if (this.Locataire.valid) {
  //     this.dialogRef.close({
  //       event: "insert",
  //       data: this.Locataire.value
  //     })
  //   }
  // }
}
