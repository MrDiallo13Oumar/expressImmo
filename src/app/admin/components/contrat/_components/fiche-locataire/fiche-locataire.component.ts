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
  imprimerFiche1()  { 
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
imprimerFiche() { 
  const printContent = document.querySelector('.fiche-contrat');

  if (printContent) {
      const printWindow = window.open('', '', 'height=1000,width=900');

      if (printWindow) {
          printWindow.document.write(`
              <html>
              <head>
                  <title>Fiche Locataire</title>
                  
                  <style>
                  // Variables
$primary-color: #007bff;
$secondary-color: #0056b3;
$background-color: #f9f9f9;
$box-shadow: 0px 0px 10px rgba(0, 0, 0, 0.1);
$border-radius: 8px;
$padding: 20px;
$gap: 20px;
$section-gap: 30px;

// Mixin pour les bordures arrondies
@mixin border-radius($radius) {
  border-radius: $radius;
}

// Mixin pour l'ombrage
@mixin box-shadow($shadow) {
  box-shadow: $shadow;
}

// Conteneur principal
.fiche-contrat-container {
  margin: 0 auto;
  padding: $padding;
  max-width: 800px;
  font-family: Arial, sans-serif;
  background-color: #fff;
  @include box-shadow($box-shadow);
  display: flex;
  justify-content: center;
  align-items: flex-start;
}

// Contenu principal de la fiche
.fiche-contrat {
  width: 100%;
  max-width: 800px;
  padding: $padding;
  display: flex;
  flex-direction: column;
  gap: $section-gap;
}

// En-tête de la fiche
.fiche-header {
  text-align: center;
  background-color: #f1f1f1;
  padding: $padding;
  @include border-radius($border-radius);
  @include box-shadow(0px 0px 5px rgba(0, 0, 0, 0.05));
}

.fiche-header h1 {
  font-size: 24px;
  margin-bottom: 10px;
}

.fiche-header p {
  font-size: 16px;
  margin-top: 5px;
}

// Corps de la fiche (les informations)
.fiche-body {
  display: grid;
  grid-template-columns: repeat(2, 1fr); /* Crée deux colonnes */
  gap: $gap;
  margin-bottom: $section-gap;
  
  .card {
    background-color: #fff;
    @include border-radius($border-radius);
    padding: $padding;
    @include box-shadow(0px 0px 5px rgba(0, 0, 0, 0.1));
    display: flex;
    flex-direction: column;
    gap: 10px;
    min-height: 200px; /* Pour garantir une hauteur minimale des cartes */
    overflow-wrap: break-word; /* Assure que le texte long ne dépasse pas */
  }

  .card h3 {
    margin-top: 0;
    font-size: 18px;
    color: $primary-color;
  }

  .card p {
    margin-bottom: 10px;
    font-size: 16px;
  }
}

// Pied de page de la fiche
.fiche-footer {
  text-align: center;
  padding: 20px 0;
}

.imprimer-btn {
  background-color: $primary-color;
  color: white;
  border: none;
  padding: 10px 20px;
  font-size: 16px;
  cursor: pointer;
  border-radius: 5px;
  transition: background-color 0.3s ease;

  &:hover {
    background-color: $secondary-color;
  }
}

@media print {
  .fiche-contrat-container {
    max-width: 100%;
    @include box-shadow(none);
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

                    /* Ajout pour forcer les couleurs à s'imprimer */
                    * {
                      -webkit-print-color-adjust: exact;
                      print-color-adjust: exact;
                    }
                    @media print {
                      .fiche-header, .fiche-footer {
                        display: none;
                      }
                      .fiche-body {
                        display: block;
                      }
                      .imprimer-btn {
                        display: none;
                      }
                    }
                  </style>
              </head>
              <body onload="window.print(); window.onafterprint = function() { window.close(); }">
                  <div class="fiche-contrat">
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
