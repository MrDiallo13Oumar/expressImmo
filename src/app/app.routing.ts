import { Routes } from '@angular/router';
import { AuthGuard } from './admin/guards/auth.guard';
import { NotFoundComponent } from './shared/components/not-found/not-found.component';

export const AppRouting: Routes = [

//  {path: '',
//   redirectTo:'/home/accueil',
//   pathMatch :'full'
//  },

  {


    path: '',
    children: [

      {
        path: 'home',
        loadChildren: () =>
          import('../app/sites/components/home/home.module').then(m => m.HomeModule)
      },
      {
        path: 'hoomeAdmin',
        loadChildren: () =>
          import('../app/admin/components/homeAdmin/home-admin.module').then(m => m.HomeAdminModule),

      },
      {
        path: 'propriete',
        loadChildren: () =>
          import('../app/admin/components/propriete/propriete.module').then(m => m.ProprieteModule),
        canActivate: [AuthGuard],
      },
      {
        path: 'contrat',
        loadChildren: () =>
          import('../app/admin/components/contrat/contrat.module').then(m => m.ContratModule),
        canActivate: [AuthGuard],
      },

      {
        path: 'locataire',
        loadChildren: () =>
          import('../app/admin/components/locataire/locataire.module').then(m => m.LocataireModule),
        canActivate: [AuthGuard],
      },
      {
        path: 'operation',
        loadChildren: () =>
          import('../app/admin/components/operation/operation.module').then(m => m.OperationModule),
        canActivate: [AuthGuard],
      },
      {
        path: 'reservation',
        loadChildren: () =>
          import('../app/admin/components/reservation/reservation.module').then(m => m.ReservationModule),
        canActivate: [AuthGuard],
      },
      {
        path: 'utilisateur',
        loadChildren: () =>
          import('../app/admin/components/utilisateurs/utilisateurs.module').then(m => m.UtilisateursModule),
        canActivate: [AuthGuard],
      },
      {
        path: 'partenaire',
        loadChildren: () =>
          import('../app/admin/components/partenaire/partenaire.module').then(m => m.PartenaireModule),
        canActivate: [AuthGuard],
      },
      {
        path: 'rapport',
        loadChildren: () =>
          import('../app/admin/components/rapport/rapport.module').then(m => m.RapportModule),
        canActivate: [AuthGuard],
      },
       // Gestion des routes non trouvées
       {
        path: '**',
        redirectTo: '/home/not-found',
       pathMatch: 'full',

      }

    ]
  }
]
