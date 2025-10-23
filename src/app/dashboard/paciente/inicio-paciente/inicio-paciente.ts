import { Component } from '@angular/core';
import {SidebarPaciente} from '../sidebar-paciente/sidebar-paciente';
import {RouterOutlet} from '@angular/router';
import {Navbar} from '../../../components/navbar/navbar';
import {Footer} from '../../../components/footer/footer';
import {Error} from '../../../info/pages/error/error';

@Component({
  selector: 'app-inicio-paciente',
  imports: [
    Error
  ],
  templateUrl: './inicio-paciente.html',
  styleUrl: './inicio-paciente.css'
})
export class InicioPaciente {

}
