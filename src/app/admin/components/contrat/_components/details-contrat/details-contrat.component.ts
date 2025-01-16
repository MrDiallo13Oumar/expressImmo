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
constructor(
  private service :ContratService,
  private snackBar: MatSnackBar,
  private activeroute: ActivatedRoute,
  private router :Router

){}
idContrat :any
  ngOnInit(): void {
    (this.idContrat = this.activeroute.snapshot.params['id']),
      this.getOneContrat();

  }
  infoContrat: any = {};
  getOneContrat() {
    console.log('ID en GET : ', this.idContrat);
    this.service.getOne('contrat', 'getOne.php', this.idContrat).subscribe({
      next: (response: any) => {
        console.log('Info : ', response);
        this.infoContrat = response;

      },
      error: (error: any) => {
        console.log('Error : ', error);
      },
    });
  }

}
