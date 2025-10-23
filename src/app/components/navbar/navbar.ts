import { Component, EventEmitter, Output } from '@angular/core';
import {Router, RouterLink} from '@angular/router';
import Swal from 'sweetalert2';
import { LoginService } from '../../core/services/auth/login/login';

@Component({
  selector: 'app-navbar',
  imports: [RouterLink],
  templateUrl: './navbar.html',
  styleUrl: './navbar.css'
})
export class Navbar {
  constructor(private router: Router, private service: LoginService) { }

  @Output() sidebarToggle = new EventEmitter<void>();

  toggleSidebar(event: Event) {
    event.preventDefault();
    this.sidebarToggle.emit();
  }

  logout() {
    // SERVICIO
    Swal.fire({
      title: "¿Quieres cerrar sesión?",
      icon: "question",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Si",
      cancelButtonText: "Cancelar"
    }).then((result) => {
      if (result.isConfirmed) {
        Swal.fire({
          title: "Sesión cerrada",
          text: "Tu sesión ha sido cerrada correctamente.",
          icon: "success"
        });
        this.service.logOut();
      }
    });
  }
}
