import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { homeRouting } from './home.routing';
import { AccueilComponent } from './accueil/accueil.component';
import { ProprieteComponent } from './propriete/propriete.component';
import { DemoMaterialModule } from 'src/app/demo-material-module';



@NgModule({
  declarations: [
    AccueilComponent,
    ProprieteComponent
  ],
  imports: [
    CommonModule,
    DemoMaterialModule,
    RouterModule.forChild(homeRouting)
  ]
})
export class HomeModule { }
