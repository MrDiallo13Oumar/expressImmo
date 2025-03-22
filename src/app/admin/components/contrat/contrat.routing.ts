import { Routes } from "@angular/router";
import { ListContratComponent } from "./_components/list-contrat/list-contrat.component";
import { AddContratComponent } from "./dialogs/add-contrat/add-contrat.component";
import { DetailsContratComponent } from "./_components/details-contrat/details-contrat.component";
import { FicheLocataireComponent } from "./_components/fiche-locataire/fiche-locataire.component";

export const contratRouting: Routes = [

 {
    path: 'list-contrat',
    component:ListContratComponent ,
  },

  {
    path: 'detail-contrat/:id',
    component : DetailsContratComponent ,
  },
  {
    path: 'fiche_client/:id',
    component : FicheLocataireComponent ,
  }
]
