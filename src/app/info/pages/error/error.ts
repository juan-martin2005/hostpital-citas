import { Component } from '@angular/core';
import {Router} from '@angular/router';
import {LoginService} from '../../../core/services/auth/login/login';

@Component({
  selector: 'app-error',
  imports: [],
  templateUrl: './error.html',
  styleUrl: './error.css'
})
export class Error {
  constructor(private router: Router, private service: LoginService ) {
  }
  navegarInicio(): void {
    if (this.service.isAdminAuthenticate()) {
      this.router.navigate(['/inicio/admin']);
    } else if (this.service.isDoctorAuthenticate()) {
      this.router.navigate(['/inicio/doctor']);
    } else if (this.service.isPacienteAuthenticate()) {
      this.router.navigate(['/inicio/paciente']);
    } else {
      // Si no está autenticado o el rol no coincide, va a la página principal
      this.router.navigate(['/']);
    }
  }
}
