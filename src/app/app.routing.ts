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


    ]
  }
]
