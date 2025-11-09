import { Component } from '@angular/core';
import {Error} from '../../../info/pages/error/error';
import { LoginService } from '../../../core/services/auth/login/login';

@Component({
  selector: 'app-perfil-paciente',
  imports: [ ],
  templateUrl: './perfil-paciente.html',
  styleUrl: './perfil-paciente.css'
})
export class PerfilPaciente {
  infoPaciente: any = {};
  constructor(private loginService: LoginService){}

  ngOnInit(){
    const infoToken = this.loginService.getInfoToken();
    this.infoPaciente = {
      dni: infoToken.username,
      nombre: infoToken.nombre,
      apellido: infoToken.apellido,
      email: infoToken.email,
      telefono: infoToken.telefono
    };
  }


}
