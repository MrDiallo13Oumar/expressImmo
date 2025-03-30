import { Component, ElementRef, ViewChild } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ReservationService } from '../../services/reservation.service';

@Component({
  selector: 'app-fiche-reservation',
  templateUrl: './fiche-reservation.component.html',
  styleUrls: ['./fiche-reservation.component.scss']
})
export class FicheReservationComponent {
  email = "expressimmo224@gmail.com"
  idReservation: any;
  constructor(private activeroute : ActivatedRoute, private service : ReservationService){}

  ngOnInit(): void {
    (this.idReservation = this.activeroute.snapshot.params['id']) 
    this.getOneReservation() 
  }
  @ViewChild('ficheReservation') ficheReservation!: ElementRef;

  imprimerFiche() {
    const printContent = document.getElementById('fiche-reservation')?.outerHTML;
  
    if (printContent) {
      const printWindow = window.open('', '', 'height=900,width=1200');
      
      if (printWindow) {
        printWindow.document.write(`
          <html>
            <head>
              <title>Fiche De Réservation</title>
              <link rel="stylesheet" href="styles.css">
              <link rel="stylesheet" href="assets/custom-print.css">
              <style>
              .reservation-card {
    width: 21cm; /* Largeur d'une feuille A4 */
    height: 29.7cm; /* Hauteur d'une feuille A4 */
    margin: auto;
    padding: 30px;
    border: 2px solid #d4af37;
    border-radius: 10px;
    font-family: 'Arial', sans-serif;
    background: white;
    box-shadow: 0px 4px 10px rgba(0, 0, 0, 0.1);
    display: flex;
    flex-direction: column;
    justify-content: space-between;
}

.reservation-content {
    flex-grow: 1; /* Prend toute la place disponible */
}

.gold-text {
    color: #d4af37;
}

.text-center {
    text-align: center;
}

.btn-custom {
    display: flex;
    align-items: center;
    background-color: #d4af37 !important;
    color: white;
    border: none;
    padding: 10px 15px;
    border-radius: 5px;
    cursor: pointer;
    transition: 0.3s;
    position: absolute;
    top: 20px;
    right: 20px;
}

.btn-custom:hover {
    background-color: #b89e30 !important;
}

                @media print {
                    .hide-print {
                        display: none !important;
                    }
                    .reservation-card {
                        width: 100%;
                        height: 100%;
                        margin: 0;
                        padding: 20mm;
                        border: none;
                        box-shadow: none;
                    }
                }
              </style>
            </head>
            <body>
              ${printContent}
              
            </body>
          </html>
        `);
  
        printWindow.document.close();
  
        // Attendre un peu pour charger les styles avant d'imprimer
        setTimeout(() => {
          printWindow.print();
          printWindow.close();
        }, 500);
      }
    }
  }
  imprimer() {
    const printContent = document.getElementById('fiche-reservation')?.outerHTML;
  
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
  
                .reservation-card {
                  background: #ffffff;
                  padding: 20px;
                  border-radius: 10px;
                  box-shadow: 0px 4px 8px rgba(0, 0, 0, 0.1);
                  max-width: 800px;
                  margin: auto;
                }
                .t{
                  text-align : center;
                }
                .title {
                  display: flex;
                  align-items: center;
                  justify-content: center;
                  text-align: center;
                  font-size: 22px;
                  font-weight: bold;
                  margin-bottom: 10px;
                }
  
                .logo-img {
                  width: 80px;
                  height: 80px;
                  margin-right: 10px;
                }
  
                .section {
                  padding: 15px;
                  background: #ffffff;
                }
  
                .sec {
                  text-align: center;
                  font-weight: bold;
                  font-size: 18px;
                  color: white;
                  padding: 10px;
                  border-radius: 5px;
                }
  
                .client {
                  background: #e65100 !important;
                }
  
                .reservation {
                  background: #263238 !important;
                }
  
                .table {
                  width: 100%;
                  border-collapse: collapse;
                }
  
                .table td, .table th {
                  padding: 10px;
                  border: 1px solid #ddd;
                  font-size: 14px;
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
  
  

  infoReservation: any = {};
      getOneReservation() {
       // console.log('ID en GET : ', this.idReservation);
        this.service.getOne('reservation', 'getOne.php', this.idReservation).subscribe({
          next: (response: any) => {
         //   console.log('Info : ', response);
            this.infoReservation = response[0] ;
           // this.Reservation.patchValue(this.infoReservation);

          },
          error: (error: any) => {
            console.log('Error : ', error);
          },
        });
      }
}
