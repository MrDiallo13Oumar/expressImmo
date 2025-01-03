import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AddOperationComponent } from './dialogs/add-operation/add-operation.component';
import { ListOperationComponent } from './components/list-operation/list-operation.component';
import { DemoMaterialModule } from 'src/app/demo-material-module';
import { RouterModule } from '@angular/router';
import { operationRouting } from './operation.routing';



@NgModule({
  declarations: [
    AddOperationComponent,
    ListOperationComponent
  ],
  imports: [
    CommonModule,
    DemoMaterialModule,
    RouterModule.forChild(operationRouting)
  ]
})
export class OperationModule { }
