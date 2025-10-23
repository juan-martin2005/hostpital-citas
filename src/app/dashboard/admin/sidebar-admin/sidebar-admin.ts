import { Component } from '@angular/core';
import {RouterLink, RouterLinkActive} from '@angular/router';
import {LoginService} from '../../../core/services/auth/login/login';

@Component({
  selector: 'app-sidebar-admin',
  imports: [RouterLink, RouterLinkActive],
  templateUrl: './sidebar-admin.html',
  styleUrl: './sidebar-admin.css'
})
export class SidebarAdmin {
  nombreUsuario: string = '';

  constructor(private loginService: LoginService) {
    this.nombreUsuario = this.loginService.getUser();
  }
}
