import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ListReservationComponent } from './components/list-reservation/list-reservation.component';
import { AddReservationComponent } from './dialogs/add-reservation/add-reservation.component';
import { DemoMaterialModule } from 'src/app/demo-material-module';
import { RouterModule } from '@angular/router';
import { reservationRouting } from './reservation.routing';
import { DetailReservationComponent } from './components/detail-reservation/detail-reservation.component';



@NgModule({
  declarations: [
    ListReservationComponent,
    AddReservationComponent,
    DetailReservationComponent
  ],
  imports: [
    CommonModule,
    DemoMaterialModule,
    RouterModule.forChild(reservationRouting),
  ]
})
export class ReservationModule { }
