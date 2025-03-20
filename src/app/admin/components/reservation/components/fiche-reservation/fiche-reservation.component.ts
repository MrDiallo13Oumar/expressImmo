import { Component, ElementRef, ViewChild } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ReservationService } from '../../services/reservation.service';

@Component({
  selector: 'app-fiche-reservation',
  templateUrl: './fiche-reservation.component.html',
  styleUrls: ['./fiche-reservation.component.scss']
})
export class FicheReservationComponent {
  idReservation: any;
  constructor(private activeroute : ActivatedRoute, private service : ReservationService){}

  ngOnInit(): void {
    (this.idReservation = this.activeroute.snapshot.params['id']) 
    this.getOneReservation() 
  }
  @ViewChild('ficheReservation') ficheReservation!: ElementRef;

  imprimer() {
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
