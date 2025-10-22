import {Component, EventEmitter, Output} from '@angular/core';
import {Router} from '@angular/router';

@Component({
  selector: 'app-navbar',
  imports: [],
  templateUrl: './navbar.html',
  styleUrl: './navbar.css'
})
export class Navbar {
  constructor(private router: Router) {}

  @Output() sidebarToggle = new EventEmitter<void>();

  toggleSidebar(event: Event) {
    event.preventDefault();
    this.sidebarToggle.emit();
  }

  logout() {
    // SERVICIO
    console.log('Cerrando sesión...');
    this.router.navigate(['/login']);
  }
}
