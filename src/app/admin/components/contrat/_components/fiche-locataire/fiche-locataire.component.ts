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
  ) { }
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
        console.log('tableau', this.infoContrat);

      },
      error: (error: any) => {
        //console.log('Error : ', error);
      },
    });
  }
  imprimer() {
    const printContent = document.getElementById('fiche')?.outerHTML;

    if (printContent) {
      const printWindow = window.open('', '', 'height=900,width=1200');

      if (printWindow) {
        printWindow.document.write(`
          <html>
            <head>
              <title>Fiche De Réservation</title>
              <style>
                @media print {
  * {
    -webkit-print-color-adjust: exact;
    print-color-adjust: exact;
  }

  /* Forcer l'affichage de la bande rose */
  .h {
    background-color: #ffeadb !important; /* Couleur rose */
    color: white !important;
    -webkit-print-color-adjust: exact;
    print-color-adjust: exact;
    height: 50px; /* Ajuste la hauteur si nécessaire */
  }

  /* S'assurer que l'image du logo s'affiche */
  .logo-img {
    display: block !important;
    width: 100px !important; /* Ajuste la taille selon ton besoin */
    height: auto !important;
  }
}
  
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

  
                /* Supprime le bouton d'impression dans la version imprimée */
                .hide-print {
                  display: none !important;
                }
  
              </style>
            </head>
            <body>
              ${printContent}
            </body>
          </html>
        `);

        printWindow.document.close();

        setTimeout(() => {
          printWindow.print();
          printWindow.close();
        }, 500);
      }
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
              /* Variables CSS */
              :root {
                --primary-color: #007bff;
                --secondary-color: #0056b3;
                --background-color: #f9f9f9;
                --box-shadow: 0px 0px 10px rgba(0, 0, 0, 0.1);
                --border-radius: 8px;
                --padding: 20px;
                --gap: 20px;
                --section-gap: 30px;
              }
  
              /* Conteneur principal */
              .fiche-contrat-container {
                margin: 0 auto;
                padding: var(--padding);
                max-width: 800px;
                font-family: Arial, sans-serif;
                background-color: #fff;
                box-shadow: var(--box-shadow);
                display: flex;
                flex-direction: column;
                align-items: center;
              }
  
              /* Contenu principal */
              .fiche-contrat {
                width: 100%;
                max-width: 800px;
                padding: var(--padding);
                display: flex;
                flex-direction: column;
                gap: var(--section-gap);
                
              }
  
              /* En-tête */
              .fiche-header {
                margin-right : 20px;
                text-align: center;
                background-color: #f1f1f1;
                padding: var(--padding);
                border-radius: var(--border-radius);
                box-shadow: 0px 0px 5px rgba(0, 0, 0, 0.05);
              }
  
              .fiche-header h1 {
                font-size: 24px;
                margin-bottom: 10px;
              }
  
              .fiche-header p {
                font-size: 16px;
                margin-top: 5px;
              }
  
              /* Corps (Cartes) */
              .fiche-body {
                display: grid;
                grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
                gap: var(--gap);
                margin-bottom: var(--section-gap);
              }
  
              .card {
                background-color: #fff;
                border-radius: var(--border-radius);
                padding: var(--padding);
                box-shadow: 0px 0px 5px rgba(0, 0, 0, 0.1);
                display: flex;
                flex-direction: column;
                gap: 10px;
                min-height: 200px;
                word-wrap: break-word;
                margin-right : 20px;
              }
  
              .card h3 {
                margin-top: 0;
                font-size: 18px;
                color: var(--primary-color);
              }
  
              .card p {
                margin-bottom: 10px;
                font-size: 16px;
              }
  
              /* Pied de page */
              .fiche-footer {
                text-align: center;
                padding: 20px 0;
              }
  
              .imprimer-btn {
                background-color: var(--primary-color);
                color: white;
                border: none;
                padding: 10px 20px;
                font-size: 16px;
                cursor: pointer;
                border-radius: 5px;
                transition: background-color 0.3s ease;
              }
  
              .imprimer-btn:hover {
                background-color: var(--secondary-color);
              }
  
              /* Styles pour l'impression */
              @media print {
                .fiche-contrat-container {
                  max-width: 100%;
                  box-shadow: none;
                }
  
                /* L'entête doit s'afficher */
                .fiche-header {
                  display: block !important;
                  background-color: #f1f1f1 !important;
                  padding: var(--padding) !important;
                  text-align: center !important;
                }
  
                .fiche-footer {
                  display: none;
                }
  
                /* Conserver l'alignement en mode print */
                .fiche-body {
                  display: grid;
                  grid-template-columns: repeat(2, 1fr);
                  gap: var(--gap);
                }
  
                .card {
                  page-break-inside: avoid;
                }
  
                .imprimer-btn {
                  display: none;
                }
  
                /* Assurer que les couleurs s'impriment */
                * {
                  -webkit-print-color-adjust: exact;
                  print-color-adjust: exact;
                }
              }
  
              /* Si l'impression est en format mobile, basculer en une seule colonne */
              @media print and (max-width: 600px) {
                .fiche-body {
                  grid-template-columns: 1fr;
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
  
  imprimerFiche1() {
    const printContent = document.querySelector('.fiche-contrat');
    if (printContent) {
      const printWindow = window.open('', '', 'height=1000,width=900');
      if (printWindow) {
        printWindow.document.write(`
          <html>
          <head>
            <title>Fiche Locataire</title>
            <style>
              /* Variables CSS */
              :root {
                --primary-color: #007bff;
                --secondary-color: #0056b3;
                --background-color: #f9f9f9;
                --box-shadow: 0px 0px 10px rgba(0, 0, 0, 0.1);
                --border-radius: 8px;
                --padding: 15px;
                --gap: 15px;
                --section-gap: 20px;
              }
  
              /* Ajustement pour A4 */
              @page {
                size: A4 portrait;
                margin: 10mm;
              }
  
              body {
                font-family: Arial, sans-serif;
                background-color: white;
                margin: 0;
                padding: 0;
              }
  
              /* Conteneur principal */
              .fiche-contrat-container {
                width: 100%;
                max-width: 210mm; /* Largeur max d'une feuille A4 en portrait */
                padding: var(--padding);
                margin: auto;
                background-color: white;
                box-shadow: none;
                display: flex;
                flex-direction: column;
                align-items: center;
              }
  
              /* Contenu principal */
              .fiche-contrat {
                width: 100%;
                padding: var(--padding);
                display: flex;
                flex-direction: column;
                gap: var(--section-gap);
              }
  
              /* En-tête */
              .fiche-header {
                text-align: center;
                background-color: #f1f1f1;
                padding: var(--padding);
                border-radius: var(--border-radius);
                box-shadow: none;
                width: 100%;
              }
  
              .fiche-header h1 {
                font-size: 22px;
                margin-bottom: 5px;
              }
  
              .fiche-header p {
                font-size: 14px;
                margin-top: 3px;
              }
  
              /* Corps (Cartes) */
              .fiche-body {
                display: grid;
                grid-template-columns: repeat(2, 1fr);
                gap: var(--gap);
                width: 100%;
                margin-bottom: var(--section-gap);
              }
  
              .card {
                background-color: #fff;
                border-radius: var(--border-radius);
                padding: var(--padding);
                box-shadow: 0px 0px 5px rgba(0, 0, 0, 0.1);
                display: flex;
                flex-direction: column;
                gap: 8px;
                min-height: 180px;
                word-wrap: break-word;
                font-size: 14px; /* Ajustement pour éviter les débordements */
                page-break-inside: avoid;
              }
  
              .card h3 {
                margin-top: 0;
                font-size: 16px;
                color: var(--primary-color);
              }
  
              .card p {
                margin-bottom: 8px;
                font-size: 14px;
              }
  
              /* Pied de page */
              .fiche-footer {
                text-align: center;
                padding: 15px 0;
                display: none;
              }
  
              .imprimer-btn {
                display: none;
              }
  
              /* Assurer une impression propre */
              @media print {
                .fiche-contrat-container {
                  max-width: 100%;
                  box-shadow: none;
                }
  
                .fiche-body {
                  display: grid;
                  grid-template-columns: 1fr 1fr; /* Deux colonnes */
                  gap: var(--gap);
                  width: 100%;
                }
  
                .card {
                  page-break-inside: avoid;
                }
  
                /* S'assurer que les couleurs s'impriment bien */
                * {
                  -webkit-print-color-adjust: exact;
                  print-color-adjust: exact;
                }
  
                /* Mode mobile (si impression depuis un petit écran) */
                @media print and (max-width: 600px) {
                  .fiche-body {
                    grid-template-columns: 1fr;
                  }
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
