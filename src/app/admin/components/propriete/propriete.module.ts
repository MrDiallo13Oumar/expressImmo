import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ListProprieteComponent } from './_component/list-propriete/list-propriete.component';
import { RouterModule } from '@angular/router';
import { proprieteRouting } from './propriete.routing';
import { AddProprieteComponent } from './dialogs/add-propriete/add-propriete.component';
import { DemoMaterialModule } from 'src/app/demo-material-module';



@NgModule({
  declarations: [
    ListProprieteComponent,
    AddProprieteComponent
  ],
  imports: [
    CommonModule,
    DemoMaterialModule,
     RouterModule.forChild(proprieteRouting)
  ]
})
export class ProprieteModule { }
