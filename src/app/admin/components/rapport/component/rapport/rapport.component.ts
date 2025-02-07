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
  
  // Définition du formulaire
  reportForm = new FormGroup({
    date_debut: new FormControl(''),
    date_fin: new FormControl(''),
   
  });

  

  // Tableau des données récupérées
  dataSource: any[] = [];

  constructor(
    private service: RapportService,
    private snackBar: MatSnackBar
  ) {}

  ngOnInit() {}

  /**
   * Génère le rapport en envoyant les critères au backend
   */
  generateReport() {
    const formValues: any = this.reportForm.value;

    // Formater les données avant envoi
    const formattedData = {
      date_debut: formValues.date_debut instanceof Date ? this.formatDate(formValues.date_debut) : formValues.date_debut,
      date_fin: formValues.date_fin instanceof Date ? this.formatDate(formValues.date_fin) : formValues.date_fin,
      
    };

    const formData = convertObjectInFormData(formattedData);

    console.log('Données envoyées :', formData);

    this.service.create('caisse', 'getRapportByDate.php', formData).subscribe({
      next: (reponse: any) => {
        console.log('Réponse reçue : ', reponse);
        this.dataSource = reponse; // Mise à jour du tableau avec les données récupérées

        if (reponse && reponse.message) {
          this.snackBar.open(reponse.message, "Okay", {
            duration: 3000,
            horizontalPosition: "right",
            verticalPosition: "top",
            panelClass: ['bg-success', 'text-white']
          });
        }
      },
      error: (err: any) => {
        console.log('Erreur : ', err);

        const errorMessage = err.error?.message || "Une erreur s'est produite lors de la génération du rapport.";

        this.snackBar.open(errorMessage, "Okay", {
          duration: 3000,
          horizontalPosition: "right",
          verticalPosition: "top",
          panelClass: ['bg-danger', 'text-white']
        });
      }
    });
  }

  /**
   * Applique un filtre sur les données affichées
   */
  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value.trim().toLowerCase();
    this.dataSource = this.dataSource.filter((item: any) =>
      item.montant.toString().toLowerCase().includes(filterValue) ||
      item.motif.toLowerCase().includes(filterValue) ||
      item.type_transaction.toLowerCase().includes(filterValue) ||
      item.created_by.toLowerCase().includes(filterValue)
    );
  }

  /**
   * Fonction pour imprimer le rapport
   */
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

  /**
   * Formate une date au format YYYY-MM-DD
   */
  private formatDate(date: Date): string {
    return date.toISOString().split('T')[0];
  }
}
