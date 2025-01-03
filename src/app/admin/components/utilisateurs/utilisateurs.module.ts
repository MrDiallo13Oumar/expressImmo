import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ListUserComponent } from './components/list-user/list-user.component';
import { AddUserComponent } from './dialogs/add-user/add-user.component';
import { DemoMaterialModule } from 'src/app/demo-material-module';
import { RouterModule } from '@angular/router';
import { userRouting } from './utilisateur.routing';



@NgModule({
  declarations: [
    ListUserComponent,
    AddUserComponent
  ],
  imports: [
    CommonModule,
    DemoMaterialModule,
    RouterModule.forChild(userRouting)

  ]
})
export class UtilisateursModule { }
