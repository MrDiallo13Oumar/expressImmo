import { Routes } from "@angular/router";
import { AccueilComponent } from "./accueil/accueil.component";
import { ProprieteComponent } from "./propriete/propriete.component";

export const homeRouting: Routes = [

 {
    path: 'accueil',
    component: AccueilComponent,

  },


  {
    path: 'propriete',
    component: ProprieteComponent,

  },
  // {
  //   path: 'login',
  //   component: LoginComponent,
  //  // canActivate: [GuardGuard]
  // },


]
