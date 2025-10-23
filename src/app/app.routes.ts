import { Especialidades } from './dashboard/admin/especialidades/especialidades';
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
import {InicioAdmin} from './dashboard/admin/inicio-admin/inicio-admin';
import {AgendarCita} from './dashboard/paciente/agendar-cita/agendar-cita';
import {MisCitas} from './dashboard/paciente/mis-citas/mis-citas';
import {Doctores} from './dashboard/paciente/doctores/doctores';
import {InicioDoctor} from './dashboard/doctor/inicio-doctor/inicio-doctor';
import {Horarios} from './dashboard/doctor/horarios/horarios';
import {NuevoHorario} from './dashboard/doctor/nuevo-horario/nuevo-horario';
import {Citas} from './dashboard/doctor/citas/citas';
import {PerfilPaciente} from './dashboard/paciente/perfil-paciente/perfil-paciente';
import {PerfilDoctor} from './dashboard/doctor/perfil-doctor/perfil-doctor';
import {NuevaEspecialidad} from './dashboard/admin/nueva-especialidad/nueva-especialidad';
import {NuevoDoctor} from './dashboard/admin/nuevo-doctor/nuevo-doctor';
import {DoctoresAdmin} from './dashboard/admin/doctores-admin/doctores-admin';
import {EditarDoctor} from './dashboard/admin/editar-doctor/editar-doctor';
import {EditarHorario} from './dashboard/doctor/editar-horario/editar-horario';
import {EditarEspecialidad} from './dashboard/admin/editar-especialidad/editar-especialidad';
import {EspecialidadesPaciente} from './dashboard/paciente/especialidades/especialidades';

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
  {path: 'inicio/paciente', component: Paciente, canActivate: [pacienteGuard],
    children: [
      {path: '', component: InicioPaciente},
      {path: 'agedar-cita', component: AgendarCita},
      {path: 'mis-citas', component: MisCitas},
      {path: 'doctores', component: Doctores},
      {path: 'especialidades', component: EspecialidadesPaciente},
      {path: 'perfil/paciente', component: PerfilPaciente},
    ]},
  {path: 'inicio/doctor', component: Doctor, canActivate: [doctorGuard],
    children: [
      {path: '', component: InicioDoctor},
      {path: 'horarios', component: Horarios},
      {path: 'nuevo-horario', component: NuevoHorario},
      {path: 'editar-horario/:id', component: EditarHorario},
      {path: 'citas', component: Citas},
      {path: 'perfil/doctor', component: PerfilDoctor},

    ]},
  {path: 'inicio/admin', component: Admin, canActivate: [adminGuard],
    children: [
      {path: '', component: InicioAdmin},
      {path: 'especialidades', component: Especialidades},
      {path: 'nueva-especialidad', component: NuevaEspecialidad},
      {path: 'editar-especialidad/:id', component: EditarEspecialidad},
      {path: 'doctores', component: DoctoresAdmin},
      {path: 'registrar-doctor', component: NuevoDoctor},
      {path: 'editar-doctor/:id', component: EditarDoctor},
    ]},


  {path: '**', redirectTo: ''},
];
