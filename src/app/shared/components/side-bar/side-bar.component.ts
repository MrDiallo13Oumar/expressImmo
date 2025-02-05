import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-side-bar',
  templateUrl: './side-bar.component.html',
  styleUrls: ['./side-bar.component.scss']
})
export class SideBarComponent {
  isCollapsed = false;
  activeRoute = '';

  menuItems = [
    { label: 'Dashboard', icon: 'icon-speedometer menu-icon', link: '/hoomeAdmin/dashboard' },
    { label: 'Site Web', icon: 'icon-globe-alt menu-icon', link: '/home/accueil' },
    { label: 'Réservation', icon: 'icon-envelope menu-icon', link: '/reservation/list-reservation' },
    { label: 'Propriétés', icon: 'icon-home menu-icon', link: '/propriete/list-propriete' },
    { label: 'Partenaire', icon: 'icon-screen-tablet menu-icon', link: '/partenaire/list-partenaire' },
    { label: 'Locataire', icon: 'icon-graph menu-icon', link: '/locataire/list-locataire' },
    { label: 'Contrats', icon: 'icon-grid menu-icon', link: '/contrat/list-contrat' },
    { label: 'Opérations', icon: 'icon-badge menu-icon', link: '/operation/list-operation' },
    { label: 'Rapports', icon: 'icon-note menu-icon', link: '/rapport/rapport' },
    { label: 'Paramétrage', icon: 'icon-notebook menu-icon', link: '/parametrage' },
    { label: 'Utilisateurs', icon: 'icon-user menu-icon', link: '/utilisateur/list-utilisateur' },
  ];

  constructor(private router: Router) {
    this.activeRoute = this.router.url;
  }

  toggleSidebar() {
    this.isCollapsed = !this.isCollapsed;
  }

  setActive(route: string) {
    this.activeRoute = route;
  }
}
