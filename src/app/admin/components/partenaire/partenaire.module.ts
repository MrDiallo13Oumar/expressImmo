import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DemoMaterialModule } from 'src/app/demo-material-module';
import { RouterModule } from '@angular/router';
import { reservationRouting } from '../reservation/reservation.routing';
import { ListPartenaireComponent } from './components/list-partenaire/list-partenaire.component';
import { AddPartenaireComponent } from './dialogs/add-partenaire/add-partenaire.component';
import { partenaireRouting } from './partenaire.routing';



@NgModule({
  declarations: [
    ListPartenaireComponent,
    AddPartenaireComponent
  ],
  imports: [
    CommonModule,
    DemoMaterialModule,
    RouterModule.forChild(partenaireRouting),
  ]
})
export class PartenaireModule { }
