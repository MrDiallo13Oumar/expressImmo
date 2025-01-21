import { Routes } from "@angular/router";
import { ListOperationComponent } from "./components/list-operation/list-operation.component";
import { DetailPaiementComponent } from "./detail-paiement/detail-paiement.component";

export const operationRouting: Routes = [

 {
    path: 'list-operation',
    component:ListOperationComponent ,

  },
  {
    path: 'detail-paiement/:id',
    component:DetailPaiementComponent ,

  },
]
