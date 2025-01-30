import { Routes } from "@angular/router";
import { LoginComponent } from "./_component/login/login.component";
import { DashboardComponent } from "./_component/dashboard/dashboard.component";
import { AddUserComponent } from "../utilisateurs/dialogs/add-user/add-user.component";

export const homeAdminRouting: Routes = [

  {
    path: 'login',
    component:LoginComponent ,

  },
  {
    path: 'register',
    component: AddUserComponent ,

  },
  {
    path: 'dashboard',
    component:DashboardComponent ,

  },



]
