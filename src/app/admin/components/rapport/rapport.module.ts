import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RapportComponent } from './component/rapport/rapport.component';
import { DemoMaterialModule } from 'src/app/demo-material-module';
import { RouterModule } from '@angular/router';
import { rapportRouting } from './rapport.routing';



@NgModule({
  declarations: [
  RapportComponent
  ],
  imports: [
    CommonModule,
    DemoMaterialModule,
    RouterModule.forChild(rapportRouting)
  ]
})
export class RapportModule { }
