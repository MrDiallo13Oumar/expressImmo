import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ListLocataireComponent } from './_component/list-locataire/list-locataire.component';
import { DemoMaterialModule } from 'src/app/demo-material-module';
import { RouterModule } from '@angular/router';
import { locataireRouting } from './locataire.routing';
import { AddLocataireComponent } from './dialogs/add-locataire/add-locataire.component';



@NgModule({
  declarations: [
    ListLocataireComponent,
    AddLocataireComponent
  ],
  imports: [
    CommonModule,
    DemoMaterialModule,
    RouterModule.forChild(locataireRouting)
  ]
})
export class LocataireModule { }
