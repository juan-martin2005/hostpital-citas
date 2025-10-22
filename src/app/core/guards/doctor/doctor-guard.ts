import {CanActivateFn, Router} from '@angular/router';
import {inject} from '@angular/core';
import {LoginService} from '../../services/auth/login/login';

export const doctorGuard: CanActivateFn = (route, state) => {
  const loginService = inject(LoginService)
  const router = inject(Router)

  if(loginService.isDoctorAuthenticate()){
    return true
  }else{
    return router.navigate(['/login'])
  }
};
