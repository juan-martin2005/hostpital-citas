import { Component } from '@angular/core';
import {RouterLink, RouterLinkActive} from '@angular/router';
import {LoginService} from '../../../core/services/auth/login/login';

@Component({
  selector: 'app-sidebar-doctor',
  imports: [
    RouterLink,
    RouterLinkActive
  ],
  templateUrl: './sidebar-doctor.html',
  styleUrl: './sidebar-doctor.css'
})
export class SidebarDoctor {
  nombreUsuario: string = '';

  constructor(private loginService: LoginService) {
    this.nombreUsuario = this.loginService.getUser();
  }
}
