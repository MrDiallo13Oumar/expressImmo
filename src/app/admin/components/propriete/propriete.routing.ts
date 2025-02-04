import { Routes } from "@angular/router";
import { ListProprieteComponent } from "./_component/list-propriete/list-propriete.component";
import { DetailsProprieteComponent } from "./_component/details-propriete/details-propriete.component";
import { AddProprieteComponent } from "./dialogs/add-propriete/add-propriete.component";

export const proprieteRouting: Routes = [

  {
    path: 'list-propriete',
    component:ListProprieteComponent ,

  },
  {
    path :'detail-propriete/:id',
    component: DetailsProprieteComponent,

  },
  {
    path :'addPropriete',
    component: AddProprieteComponent,

  }
]
