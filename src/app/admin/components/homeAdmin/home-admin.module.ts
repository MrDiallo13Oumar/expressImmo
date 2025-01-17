import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LoginComponent } from './_component/login/login.component';
import { RouterModule } from '@angular/router';
import { homeAdminRouting } from './home-admin.routing';
import { DashboardComponent } from './_component/dashboard/dashboard.component';



@NgModule({
  declarations: [
    LoginComponent,
    DashboardComponent
  ],
  imports: [
    CommonModule,
    RouterModule.forChild(homeAdminRouting)
  ]
})
export class HomeAdminModule { }
