import { Component, ElementRef, ViewChild } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ActivatedRoute, Router } from '@angular/router';
import { ContratService } from '../../_services/contrat.service';
import { FormControl, FormGroup } from '@angular/forms';
import { convertObjectInFormData } from 'src/app/app.component';
import { AddPaiementComponent } from '../../dialogs/add-paiement/add-paiement.component';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { MatDialog } from '@angular/material/dialog';
import { DeletePopupComponent } from 'src/app/shared/dialogs/delete-popup/delete-popup.component';
import { PublicService } from 'src/app/shared/services/public.service';

@Component({
  selector: 'app-details-contrat',
  templateUrl: './details-contrat.component.html',
  styleUrls: ['./details-contrat.component.scss'],
})
export class DetailsContratComponent {
  Paiement = new FormGroup({
    contrat_id: new FormControl(''),
    montant: new FormControl(''),
    mode_paiement: new FormControl(''),
    date_debut: new FormControl(''),
    date_fin: new FormControl(''),
  });

  constructor(
    private service: ContratService,
    private snackBar: MatSnackBar,
    private activeroute: ActivatedRoute,
    private dialog: MatDialog,
    private printService :PublicService
  ) {}
  displayedColumns: string[] = [
    'id',
    'montant',
    'mode_paiement',
    'date_debut',
    'date_fin',
    'action',
  ];
  dataSource = new MatTableDataSource([]);

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;
  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
  }
  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }
  idContrat: any;
  ngOnInit(): void {
    (this.idContrat = this.activeroute.snapshot.params['id']),
      this.getOneContrat();
  }
  getDureeContrat(): number {
    if (!this.infoContrat.paiements.length) return 0;
    const debut = new Date(this.infoContrat.paiements[0].date_debut);
    const fin = new Date(this.infoContrat.paiements[this.infoContrat.paiements.length - 1].date_fin);
    return Math.ceil((fin.getTime() - debut.getTime()) / (1000 * 3600 * 24));
  }
  infoContrat: any = {};

  getOneContrat() {
    console.log('ID en GET : ', this.idContrat);
    this.service.getOne('contrat', 'getOne.php', this.idContrat).subscribe({
      next: (response: any) => {
        console.log('Info : ', response);
        this.infoContrat = response;
        // Remplir les données du tableau avec les opérations
        this.dataSource.data = Array.isArray(this.infoContrat.paiements) ? this.infoContrat.paiements : [this.infoContrat.paiements];

        console.log('tableau' ,this.infoContrat.paiements);

      },
      error: (error: any) => {
        console.log('Error : ', error);
      },
    });
  }

  openDialog() {
    this.dialog
      .open(AddPaiementComponent, {})
      .afterClosed()
      .subscribe((result) => {
        if (result?.event && result.event === 'insert') {
          const PaiementData = {
            ...result.data,
            contrat_id: this.infoContrat.id,
          };
          // console.log(result.data);
          const formData = convertObjectInFormData(PaiementData);
          this.dataSource.data.splice(0, this.dataSource.data.length);
          //Envoyer dans la Base
          this.service.create('paiement', 'create.php', formData).subscribe({
            next: (response) => {
              const message = response?.message || "Contrat enregistré avec succès !";
              this.snackBar.open(message, 'Okay', {
                duration: 3000,
                horizontalPosition: 'right',
                verticalPosition: 'top',
                panelClass: ['bg-success', 'text-white'],
              });
              this.getOneContrat();
            },
            error: (err: any) => {
              this.snackBar.open('Echec de Paiement !', 'Okay', {
                duration: 3000,
                horizontalPosition: 'right',
                verticalPosition: 'top',
                panelClass: ['bg-danger', 'text-white'],
              });
            },
          });
        }
      });
  }

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
                response.status == 1
                  ? ['bg-success', 'text-white']
                  : ['bg-danger', 'text-white'];
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
          this.getOneContrat();
        }
      });
  }
  printContract() {
    const printContent = document.querySelector('.contract-content');
  
    if (printContent) {
      const printWindow = window.open('', '', 'height=900,width=800');
  
      if (printWindow) {
        printWindow.document.write(`
          <html>
          <head>
            <title>Contrat de location</title>
            <style>
              @page { size: A4; margin: 20mm; }
              body { font-family: 'Roboto', sans-serif; color: #333; margin: 0; padding: 0; }
              .contract-content { max-width: 800px; margin: auto; padding: 20px; }
              h3, .center-text { text-align: center; color: #0277bd; font-weight: bold; }
              .signature-section { display: flex; justify-content: space-between; margin-top: 40px; }
              .signature-section p { width: 48%; text-align: center; font-size: 16px; font-weight: bold; }
              .contract-logo { display: block; margin: 0 auto 20px; max-width: 120px; }
            </style>
          </head>
          <body onload="window.print(); window.onafterprint = function() { window.close(); }">
            <div class="contract-content">
              ${printContent.innerHTML}
            </div>
          </body>
          </html>
        `);
  
        printWindow.document.close();
      } else {
        alert("Impossible d'ouvrir la fenêtre d'impression. Vérifiez que les pop-ups sont autorisées.");
      }
    } else {
      alert("Le contenu du contrat est introuvable.");
    }
  }
 
  // @ViewChild('contratContent') contratContent!: ElementRef;

  // printContract(){
    
  //   if (this.contratContent) {
  //     this.printService.imprimerDiv(this.contratContent.nativeElement.innerHTML);
  //   } else {
  //     alert("Le contenu du contrat est introuvable.");
  //   }
  // } 


}
