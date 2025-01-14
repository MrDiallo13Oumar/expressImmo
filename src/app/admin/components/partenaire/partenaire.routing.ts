import { Routes } from "@angular/router";
import { ListPartenaireComponent } from "./components/list-partenaire/list-partenaire.component";
import { DetailsPartenaireComponent } from "./components/details-partenaire/details-partenaire.component";


export const partenaireRouting: Routes = [

 {
    path: 'list-partenaire',
    component:ListPartenaireComponent ,

  },
   {
      path :'detail-partenaire/:id',
      component: DetailsPartenaireComponent,

  }
]
