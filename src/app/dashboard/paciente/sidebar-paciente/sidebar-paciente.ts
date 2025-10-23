import { Component } from '@angular/core';
import {RouterLink, RouterLinkActive} from '@angular/router';
import {LoginService} from '../../../core/services/auth/login/login';

@Component({
  selector: 'app-sidebar-paciente',
  imports: [RouterLink, RouterLinkActive],
  templateUrl: './sidebar-paciente.html',
  styleUrl: './sidebar-paciente.css'
})
export class SidebarPaciente {
  nombreUsuario: string = '';

  constructor(private loginService: LoginService) {
    this.nombreUsuario = this.loginService.getUser();
  }
}
