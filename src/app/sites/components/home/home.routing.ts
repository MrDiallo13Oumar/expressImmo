import { Routes } from "@angular/router";
import { AccueilComponent } from "./accueil/accueil.component";
import { ProprieteComponent } from "./propriete/propriete.component";
import { ServiceComponent } from "./service/service.component";
import { ContactComponent } from "./contact/contact.component";
import { InscriptionSiteComponent } from "./propriete/components/inscription-site/inscription-site.component";
import { DetailsProprieteComponent } from "./propriete/components/details-propriete-site/details-propriete.component";
import { AllProprietesComponent } from "./propriete/components/all-proprietes/all-proprietes.component";
import { NotFoundComponent } from "src/app/shared/components/not-found/not-found.component";


export const homeRouting: Routes = [


  {
    path: 'accueil',
    component: AccueilComponent,

  },

  {
    path: 'propriete',
    component: ProprieteComponent,

  },

  {
    path: 'service',
    component: ServiceComponent,

  },
  {
    path: 'contact',
    component: ContactComponent,

  },
  {
    path: 'detailProprieteSite/:id',
    component: DetailsProprieteComponent,
  },
  {
    path: 'inscriptionSite/:id',
    component: InscriptionSiteComponent,
  },
  {
    path: 'all-propriete',
    component: AllProprietesComponent,
  },
  {
    path: 'not-found',
    component: NotFoundComponent,
  },



  // {
  //   path: 'login',
  //   component: LoginComponent,
  //  // canActivate: [GuardGuard]
  // },

]
