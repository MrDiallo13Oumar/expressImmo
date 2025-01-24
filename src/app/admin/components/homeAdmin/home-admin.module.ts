import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LoginComponent } from './_component/login/login.component';
import { RouterModule } from '@angular/router';
import { homeAdminRouting } from './home-admin.routing';
import { DashboardComponent } from './_component/dashboard/dashboard.component';
import { DemoMaterialModule } from 'src/app/demo-material-module';



@NgModule({
  declarations: [
    LoginComponent,
    DashboardComponent
  ],
  imports: [
    CommonModule,
    DemoMaterialModule,
    RouterModule.forChild(homeAdminRouting)
  ]
})
export class HomeAdminModule { }
