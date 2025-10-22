import {CanActivateFn, Router} from '@angular/router';
import {LoginService} from '../../services/auth/login/login';
import {inject} from '@angular/core';

export const pacienteGuard: CanActivateFn = (route, state) => {
  const loginService = inject(LoginService)
  const router = inject(Router)

  if(loginService.isPacienteAuthenticate()){
    return true
  }else{
    return router.navigate(['/login'])
  }
};
