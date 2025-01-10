import { Routes } from "@angular/router";
import { ListContratComponent } from "./_components/list-contrat/list-contrat.component";
import { AddContratComponent } from "./dialogs/add-contrat/add-contrat.component";
import { DetailsContratComponent } from "./_components/details-contrat/details-contrat.component";

export const contratRouting: Routes = [

 {
    path: 'list-contrat',
    component:ListContratComponent ,    
  },
  
  {
    path: 'detail-contrat',
    component : DetailsContratComponent ,
  }
]
