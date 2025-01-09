import { Routes } from "@angular/router";
import { ListLocataireComponent } from "./_component/list-locataire/list-locataire.component";
import { DetailsLocataireComponent } from "./_component/details-locataire/details-locataire.component";

export const locataireRouting: Routes = [

 {
    path: 'list-locataire',
    component:ListLocataireComponent ,

  },
  {
        path :'detail-locataire/:id',
        component: DetailsLocataireComponent,
  
    }
]
