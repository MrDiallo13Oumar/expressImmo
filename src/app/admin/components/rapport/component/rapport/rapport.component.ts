import { Component, OnInit } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { RapportService } from '../../services/rapport.service';
import { FormGroup, FormControl } from '@angular/forms';
import { convertObjectInFormData } from 'src/app/app.component';

@Component({
  selector: 'app-rapport',
  templateUrl: './rapport.component.html',
  styleUrls: ['./rapport.component.scss']
})
export class RapportComponent implements OnInit {

  reportForm = new FormGroup({
    date_debut: new FormControl(''),
    date_fin: new FormControl(''),
  });

  dataSource: any[] = [];
  isRapport : boolean=true
  hasPaiementType: boolean = false;

  constructor(
    private service: RapportService,
    private snackBar: MatSnackBar
  ) {}

  ngOnInit() {
    this.hasPaiementType = this.dataSource.some(el => el.type === 'paiement');
  
  }

generateReport() {
  const formValues: any = this.reportForm.value;
  const formattedData = {
    date_debut: formValues.date_debut instanceof Date ? this.formatDate(formValues.date_debut) : formValues.date_debut,
    date_fin: formValues.date_fin instanceof Date ? this.formatDate(formValues.date_fin) : formValues.date_fin,
  };

  const formData = convertObjectInFormData(formattedData);

  this.service.create('caisse', 'getRapportByDate.php', formData).subscribe({
    next: (reponse: any) => {
      this.dataSource = this.normalizeData(reponse);

      // Réinitialiser hasPaiementType lors de la génération du rapport
      this.isRapport=true
      this.hasPaiementType = false;

      // Affichage d'un snack bar de succès
      const message = reponse?.message || 'Rapport généré avec succès!';
      this.snackBar.open(message, 'Fermer', {
        duration: 3000,
        verticalPosition: 'top',
        horizontalPosition: 'center'
      });
    },
    error: (err: any) => {
      const errorMessage = err?.error?.message || "Échec de generation du rapport !";
      // Affichage d'un snack bar d'erreur
      this.snackBar.open('Pas Operation entre ces Date', 'Fermer', {
        duration: 5000,
        verticalPosition: 'top',
        horizontalPosition: 'center'
      });
      console.log('Erreur : ', err);
    }
  });
}

generateReservation() {
  const formValues: any = this.reportForm.value;
  const formattedData = {
    date_debut: formValues.date_debut instanceof Date ? this.formatDate(formValues.date_debut) : formValues.date_debut,
    date_fin: formValues.date_fin instanceof Date ? this.formatDate(formValues.date_fin) : formValues.date_fin,
  };

  const formData = convertObjectInFormData(formattedData);

  this.service.create('caisse', 'getReservationByDate.php', formData).subscribe({
    next: (reponse: any) => {
      this.dataSource = reponse;

      // Si les données sont des réservations, ajuster le titre des colonnes
      this.hasPaiementType = false; // Ce n'est pas un type de paiement
      const isReservationData = this.dataSource.length > 0 && this.dataSource[0].type === 'reservations';
      if (isReservationData) {
        this.hasPaiementType = true;
        this.isRapport=false
      }

      // Affichage d'un snack bar de succès
      const message = reponse?.message || 'Réservation récupérée avec succès!';
      this.snackBar.open(message, 'Fermer', {
        duration: 3000,
        verticalPosition: 'top',
        horizontalPosition: 'center'
      });
    },
    error: (err: any) => {
      const errorMessage = err?.error?.message || "Échec de generation du rapport !";
      // Affichage d'un snack bar d'erreur
      this.snackBar.open('Pas Operation entre ces Date', 'Fermer', {
        duration: 5000,
        verticalPosition: 'top',
        horizontalPosition: 'center'
      });
      console.log('Erreur : ', err);
    }
  });
}

generateContrat() {
  const formValues: any = this.reportForm.value;
  const formattedData = {
    date_debut: formValues.date_debut instanceof Date ? this.formatDate(formValues.date_debut) : formValues.date_debut,
    date_fin: formValues.date_fin instanceof Date ? this.formatDate(formValues.date_fin) : formValues.date_fin,
  };

  const formData = convertObjectInFormData(formattedData);

  this.service.create('caisse', 'getContratByDate.php', formData).subscribe({
    next: (reponse: any) => {
      this.dataSource = reponse;

      // Si les données sont des Contrats, ajuster le titre des colonnes
      this.hasPaiementType = false;  // Ce n'est pas un type de paiement
      const isContratData = this.dataSource.length > 0 && this.dataSource[0].type === 'contrats';
      if (isContratData) {
        this.hasPaiementType = true;
        this.isRapport=false
      }

      // Affichage d'un snack bar de succès
      const message = reponse?.message || 'Contrat récupéré avec succès!';
      this.snackBar.open(message, 'Fermer', {
        duration: 3000,
        verticalPosition: 'top',
        horizontalPosition: 'center'
      });
    },
    error: (err: any) => {
      // Affichage d'un snack bar d'erreur
      const errorMessage = err?.error?.message || "Échec de generation du rapport !";
      this.snackBar.open('Pas Operation entre ces Date', 'Fermer', {
        duration: 5000,
        verticalPosition: 'top',
        horizontalPosition: 'center'
      });
      console.log('Erreur : ', err);
    }
  });
}


  private normalizeData(data: any[]): any[] {
    return data.map(item => ({
      type: item.type,
      montant: item.montant,
      motif: item.motif || item.type_transaction,
      type_transaction: item.type_transaction,
      created_by: item.created_by,
      mode_paiement: item.mode_paiement || 'N/A',
      propriete_reference: item.propriete_reference || '',
      reservation: item.reservation || '',
    }));
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value.trim().toLowerCase();
    this.dataSource = this.dataSource.filter((item: any) =>
      item.montant.toString().toLowerCase().includes(filterValue) ||
      item.motif.toLowerCase().includes(filterValue) ||
      item.type_transaction.toLowerCase().includes(filterValue) ||
      item.created_by.toLowerCase().includes(filterValue)
    );
  }

  printTable() {
    const printContent = document.getElementById('maTable')?.outerHTML;
    const originalContent = document.body.innerHTML;

    document.body.innerHTML = `
      <html>
        <head><title>Rapport des Opérations</title></head>
        <body>
          <h2 style="text-align:center;">Rapport des Opérations</h2>
          ${printContent}
        </body>
      </html>
    `;
    window.print();
    document.body.innerHTML = originalContent;
  }

  private formatDate(date: Date): string {
    return date.toISOString().split('T')[0];
  }
}
