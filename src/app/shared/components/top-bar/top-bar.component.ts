import { Component } from '@angular/core';
import { AuthService } from 'src/app/admin/guards/service/auth.service';

@Component({
  selector: 'app-top-bar',
  templateUrl: './top-bar.component.html',
  styleUrls: ['./top-bar.component.scss']
})
export class TopBarComponent {
  isDropdownOpen = false;

  constructor(private service: AuthService) {}

  toggleDropdown(state: boolean) {
    this.isDropdownOpen = state;
  }

  logout() {
    this.service.clearToken();
  }

  toggleSidebar() {
    // Émet un événement pour ouvrir/fermer la sidebar
    const event = new CustomEvent('toggleSidebar');
    window.dispatchEvent(event);
  }
}
