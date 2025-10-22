import { Routes } from '@angular/router';
import {MainHome} from './info/pages/main-home/main-home';
import {Home} from './info/pages/home/home';
import {InicioPaciente} from './dashboard/paciente/inicio-paciente/inicio-paciente';
import {pacienteGuard} from './core/guards/paciente/paciente-guard';
import {doctorGuard} from './core/guards/doctor/doctor-guard';
import {adminGuard} from './core/guards/admin/admin-guard';
import {Paciente} from './dashboard/paciente/paciente';
import {Doctor} from './dashboard/doctor/doctor';
import {Admin} from './dashboard/admin/admin';
import {AboutUs} from './info/pages/about-us/about-us';
import {Services} from './info/pages/services/services';
import {Doctors} from './info/pages/doctors/doctors';
import {Contact} from './info/pages/contact/contact';



export const routes: Routes = [
  {path: '', pathMatch: 'full', redirectTo: ''},
  {path: '', component: MainHome, children: [
      {path: '', component: Home},
      {path: '', pathMatch: 'full', redirectTo: ''},
      {path: 'about-us', component: AboutUs},
      {path: 'services', component: Services},
      {path: 'doctors', component: Doctors},
      {path: 'contact', component: Contact},
    ]},
  {path: 'inicio', component: Paciente, canActivate: [pacienteGuard],
    children: [
      {path: '', component: InicioPaciente},
    ]},
  {path: 'inicio', component: Doctor, canActivate: [doctorGuard]},
  {path: 'inicio', component: Admin, canActivate: [adminGuard]},


  {path: '**', redirectTo: ''},
];
