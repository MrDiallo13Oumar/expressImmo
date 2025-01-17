import { Routes } from '@angular/router';

export const AppRouting: Routes = [
  {
    path: '',
    children: [
    //  { path: '', redirectTo: 'accueil', pathMatch: 'full' }, // Redirection
      {
        path: 'home',
        loadChildren: () =>
          import('../app/sites/components/home/home.module').then(m => m.HomeModule)
      },
      {
        path: 'hoomeAdmin',
        loadChildren: () =>
          import('../app/admin/components/homeAdmin/home-admin.module').then(m => m.HomeAdminModule)
      },
      {
        path: 'propriete',
        loadChildren: () =>
          import('../app/admin/components/propriete/propriete.module').then(m => m.ProprieteModule)
      },
      {
        path: 'contrat',
        loadChildren: () =>
          import('../app/admin/components/contrat/contrat.module').then(m => m.ContratModule)
      },

      {
        path: 'locataire',
        loadChildren: () =>
          import('../app/admin/components/locataire/locataire.module').then(m => m.LocataireModule)
      },
      {
        path: 'operation',
        loadChildren: () =>
          import('../app/admin/components/operation/operation.module').then(m => m.OperationModule)
      },
      {
        path: 'reservation',
        loadChildren: () =>
          import('../app/admin/components/reservation/reservation.module').then(m => m.ReservationModule)
      },
      {
        path: 'utilisateur',
        loadChildren: () =>
          import('../app/admin/components/utilisateurs/utilisateurs.module').then(m => m.UtilisateursModule)
      },
      {
        path: 'partenaire',
        loadChildren: () =>
          import('../app/admin/components/partenaire/partenaire.module').then(m => m.PartenaireModule)
      },


    ]
  }
]
