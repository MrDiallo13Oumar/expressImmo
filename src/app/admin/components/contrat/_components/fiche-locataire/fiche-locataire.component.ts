import { Component } from '@angular/core';
import { ContratService } from '../../_services/contrat.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-fiche-locataire',
  templateUrl: './fiche-locataire.component.html',
  styleUrls: ['./fiche-locataire.component.scss']
})
export class FicheLocataireComponent {
  idContrat: any;
  constructor(
      private service: ContratService,
      private snackBar: MatSnackBar,
      private activeroute: ActivatedRoute,     
    ) {}
  ngOnInit(): void {
    (this.idContrat = this.activeroute.snapshot.params['id']),
      this.getOneContrat();
  }
  
  infoContrat: any;
  getOneContrat() {
    //console.log('ID en GET : ', this.idContrat);
    this.service.getOne('contrat', 'getOne.php', this.idContrat).subscribe({
      next: (response: any) => {
        //console.log('Info : ', response);
        this.infoContrat = response;
        // Remplir les données du tableau avec les opérations
        // this.dataSource.data = Array.isArray(this.infoContrat.paiements) ? this.infoContrat.paiements : [this.infoContrat.paiements];
        console.log('tableau' ,this.infoContrat);

      },
      error: (error: any) => {
        //console.log('Error : ', error);
      },
    });
  }
  imprimerFiche()  { 
    const printContent = document.querySelector('.fiche-contrat');

    if (printContent) {
        const printWindow = window.open('', '', 'height=1000,width=900');

        if (printWindow) {
            printWindow.document.write(`
                <html>
                <head>
                    <title>Fiche Locataire</title>
                    <style>
                      .fiche-contrat-container {
                      margin: 0 auto;
                      padding: 20px;
                      max-width: 800px;
                      font-family: Arial, sans-serif;
                      background-color: #fff;
                      box-shadow: 0px 0px 10px rgba(0, 0, 0, 0.1);
                    }
                    
                    .fiche-contrat {
                      padding: 20px;
                    }
                    
                    .fiche-header {
                      text-align: center;
                      margin-bottom: 30px;
                    }
                    
                    .fiche-header h1 {
                      font-size: 24px;
                      margin-bottom: 10px;
                    }
                    
                    .fiche-body {
                      display: grid;
                      grid-template-columns: 1fr 1fr;
                      gap: 20px;
                      margin-bottom: 30px;
                    }
                    
                    .fiche-body h3 {
                      margin-top: 0;
                      font-size: 18px;
                    }
                    
                    .fiche-footer {
                      text-align: center;
                    }
                    
                    .imprimer-btn {
                      background-color: #007bff;
                      color: white;
                      border: none;
                      padding: 10px 20px;
                      font-size: 16px;
                      cursor: pointer;
                      border-radius: 5px;
                    }
                    
                    .imprimer-btn:hover {
                      background-color: #0056b3;
                    }
                    
                    @media print {
                      .fiche-contrat-container {
                        max-width: 100%;
                        box-shadow: none;
                      }
                      
                      .fiche-header, .fiche-footer {
                        display: none;
                      }
                    
                      .fiche-body {
                        display: block;
                      }
                    
                      .fiche-body h3 {
                        margin-top: 20px;
                      }
                    
                      .imprimer-btn {
                        display: none;
                      }
                    }
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
}
