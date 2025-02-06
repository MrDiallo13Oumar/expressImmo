import { Component } from '@angular/core';
import { OperationService } from '../services/operation.service';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-detail-paiement',
  templateUrl: './detail-paiement.component.html',
  styleUrls: ['./detail-paiement.component.scss'],
})
export class DetailPaiementComponent {
  constructor(
    private service: OperationService,

    private activeroute: ActivatedRoute
  ) {}
  idPaiement: any;
  ngOnInit() {
    (this.idPaiement = this.activeroute.snapshot.params['id']),
      this.getOnePaiement();
  }
  infoPaiement: any = {};
  getOnePaiement() {
    console.log('ID en GET : ', this.idPaiement);
    this.service.getOne('paiement', 'getOne.php', this.idPaiement).subscribe({
      next: (response: any) => {
        console.log('Info : ', response);
        this.infoPaiement = response;
      },
      error: (error: any) => {
        console.log('Error : ', error);
      },
    });
  }
  imprimerRecu() {
    const recuContent = document.getElementById('recu')?.innerHTML;
    const originalContent = document.body.innerHTML;

    // Remplacer le contenu du body par celui du reçu
    document.body.innerHTML = recuContent || '';
    window.print();

    // Restaurer le contenu original du body après l'impression
    document.body.innerHTML = originalContent;
  }

}
