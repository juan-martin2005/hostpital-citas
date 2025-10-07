import { Routes } from '@angular/router';
import { InicioComponent } from './pages/inicio-component/inicio-component';
import { EspecialidadComponent } from './pages/paciente/especialidad-component/especialidad-component';

export const routes: Routes = [
  {
    path: '', redirectTo: 'inicio', pathMatch: 'full'
  },
  {
    path: 'inicio', component: InicioComponent
  },
  {
    path: 'especialidades', component: EspecialidadComponent
  }
];
