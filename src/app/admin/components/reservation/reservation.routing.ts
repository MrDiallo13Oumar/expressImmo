import { Routes } from "@angular/router";
import { ListReservationComponent } from "./components/list-reservation/list-reservation.component";
import { AddContratComponent } from "../contrat/dialogs/add-contrat/add-contrat.component";

export const reservationRouting: Routes = [

 {
    path: 'list-reservation',
    component:ListReservationComponent ,

  },
  {
   path :'propri-reservation/:id',
       component: AddContratComponent, 
  }



]
