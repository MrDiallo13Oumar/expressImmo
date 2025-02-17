import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ListProprieteComponent } from './_component/list-propriete/list-propriete.component';
import { RouterModule } from '@angular/router';
import { proprieteRouting } from './propriete.routing';
import { AddProprieteComponent } from './_component/add-propriete/add-propriete.component';
import { DemoMaterialModule } from 'src/app/demo-material-module';
import { DetailsProprieteComponent } from './_component/details-propriete/details-propriete.component';
import { AddTypeProprieteComponent } from './_component/add-type-propriete/add-type-propriete.component';
import { TruncatePipe } from '../../../truncate.pipe';
import { NgSelectModule } from '@ng-select/ng-select';
import { UpdateTypeProprieteComponent } from './_component/update-type-propriete/update-type-propriete.component';



@NgModule({
  declarations: [
    ListProprieteComponent,
    AddProprieteComponent,
    DetailsProprieteComponent,
    AddTypeProprieteComponent,
    TruncatePipe,
    UpdateTypeProprieteComponent
  ],
  imports: [
    CommonModule,
    DemoMaterialModule,
     RouterModule.forChild(proprieteRouting),
     NgSelectModule,
  ]
})
export class ProprieteModule { }
