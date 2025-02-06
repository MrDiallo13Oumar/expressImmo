import { Component, ViewChild } from '@angular/core';
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
    private dialog: MatDialog
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
      const printWindow = window.open('', '', 'height=800,width=800');

      // Vérification si la fenêtre a bien été ouverte
      if (printWindow) {
        printWindow.document.write('<html><head><title>Contrat de location</title>');
        printWindow.document.write('<style>@page { size: A4; margin: 20mm; }</style>'); // Style de la page d'impression
        printWindow.document.write('</head><body>');
        printWindow.document.write(printContent.innerHTML);
        printWindow.document.write('</body></html>');
        printWindow.document.close();
        printWindow.print();
      } else {
        alert("Impossible d'ouvrir la fenêtre d'impression. Assurez-vous que les pop-ups sont autorisées.");
      }
    } else {
      alert("Le contenu à imprimer est introuvable.");
    }
  }


}
