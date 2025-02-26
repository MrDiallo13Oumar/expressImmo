import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ParametrageComponent } from './parametrage/parametrage.component';
import { RouterModule } from '@angular/router';
import { parametrageRouting } from './parametrage.routing';
import { DemoMaterialModule } from 'src/app/demo-material-module';



@NgModule({
  declarations: [
    ParametrageComponent,
  ],
  imports: [
    CommonModule,
    DemoMaterialModule,
    RouterModule.forChild(parametrageRouting),
  ]
})
export class ParametrageModule { }
