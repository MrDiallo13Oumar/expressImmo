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
  isSidebarOpen = true; // L'état de la barre latérale (ouverte par défaut)

  toggleSidebar() {
    this.isSidebarOpen = !this.isSidebarOpen;
  }


    canShowMenu = true;

    constructor(public location: Location, private router: Router) {

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
  export function convertObjectInFormData (tab: any) {
    const formData = new FormData()

    for (const key in tab) {
      if (tab.hasOwnProperty(key)) {
        const value = tab[key]

        if (Array.isArray(value)) {
          for (let i = 0; i < value.length; i++) {
            formData.append(key, value[i])
          }
        } else if (typeof value === 'object' && value !== null) {
          const nestedFormData = convertObjectInFormData(value)
          nestedFormData.forEach((nestedValue, nestedKey) => {
            formData.append(key + '.' + nestedKey, nestedValue)
          })
        } else {
          formData.append(key, value)
        }
      }
    }

    return formData
  }






