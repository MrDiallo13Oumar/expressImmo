import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ListContratComponent } from './_components/list-contrat/list-contrat.component';
import { DemoMaterialModule } from 'src/app/demo-material-module';
import { RouterModule } from '@angular/router';
import { contratRouting } from './contrat.routing';
import { AddContratComponent } from './dialogs/add-contrat/add-contrat.component';
import { DetailsContratComponent } from './_components/details-contrat/details-contrat.component';



@NgModule({
  declarations: [
    ListContratComponent,
    AddContratComponent,
    DetailsContratComponent
  ],
  imports: [
    CommonModule,
    DemoMaterialModule,
    RouterModule.forChild(contratRouting)
  ]
})
export class ContratModule { }
