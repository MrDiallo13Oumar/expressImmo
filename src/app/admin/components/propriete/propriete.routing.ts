import { Routes } from "@angular/router";
import { ListProprieteComponent } from "./_component/list-propriete/list-propriete.component";
import { DetailsProprieteComponent } from "./_component/details-propriete/details-propriete.component";
import { AddProprieteComponent } from "./_component/add-propriete/add-propriete.component";
import { AddTypeProprieteComponent } from "./_component/add-type-propriete/add-type-propriete.component";
import { UpdateTypeProprieteComponent } from "./_component/update-type-propriete/update-type-propriete.component";

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
    path :'details-typepropriete/:id',
    component: UpdateTypeProprieteComponent,

  },
  {
    path :'add-propriete',
    component: AddProprieteComponent,

  },
  {
    path :'type-propriete',
    component: AddTypeProprieteComponent,

  }
]
