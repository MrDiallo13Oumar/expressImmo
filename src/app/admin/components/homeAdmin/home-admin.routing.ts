import { Routes } from "@angular/router";
import { LoginComponent } from "./_component/login/login.component";
import { DashboardComponent } from "./_component/dashboard/dashboard.component";

export const homeAdminRouting: Routes = [

 {
    path: 'login',
    component:LoginComponent ,

  },
  {
    path: 'dashboard',
    component:DashboardComponent ,

  },



]
