import { Location } from '@angular/common';
import { Component } from '@angular/core';
import { Router, NavigationEnd } from '@angular/router';
import { filter } from 'rxjs';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'expressimmo';



    canShowMenu = true;

    constructor(public location: Location, private router: Router) {
      // Redirection initiale vers /home/accueil au lancement
     // this.router.navigate(['/home/accueil']);

      this.router.events
        .pipe(filter((event: any) => event instanceof NavigationEnd))
        .subscribe((event: NavigationEnd) => {
          const hiddenExactUrls = ['/hoomeAdmin/login'];
          const hiddenModuleUrls = ['/home'];

          // Vérification des URL exactes à cacher
          if (hiddenExactUrls.includes(event.url)) {
            this.canShowMenu = false;
            return;
          }

          // Vérification si l'URL commence par un chemin spécifique (module /home)
          if (hiddenModuleUrls.some((path) => event.url.startsWith(path))) {
            this.canShowMenu = false;
            return;
          }

          // Afficher le menu pour toutes les autres URLs
          this.canShowMenu = true;
        });
    }
  }






