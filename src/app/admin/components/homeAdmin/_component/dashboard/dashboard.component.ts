import { Component } from '@angular/core';
import { HomeService } from '../../services/home.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss'],
})
export class DashboardComponent {
  constructor(private service: HomeService) {}
  ngOnInit() {
    this.getDashbord();
    this.getContratDashbord();
  }
  infoDashBoard: any;
  getDashbord() {
    this.service.getall('dashboard', 'statistiquesJour.php').subscribe({
      next: (reponse: any) => {
        console.log('REPONSE SUCCESS : ', reponse);
        this.infoDashBoard = reponse;
      },
      error: (err: any) => {
        console.log('REPONSE ERROR : ', err);
      },
    });
  }
  infoContratDashBoard :any
  getContratDashbord() {
    this.service.getall('dashboard', '').subscribe({
      next: (reponse: any) => {
        console.log('REPONSE SUCCESS : ', reponse);
        this.infoContratDashBoard = reponse;
      },
      error: (err: any) => {
        console.log('REPONSE ERROR : ', err);
      },
    });
  }
}
