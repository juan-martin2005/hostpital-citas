import {CanActivateFn, Router} from '@angular/router';
import {inject} from '@angular/core';
import {LoginService} from '../../services/auth/login/login';

export const adminGuard: CanActivateFn = (route, state) => {
  const loginService = inject(LoginService)
  const router = inject(Router)

  if(loginService.isAdminAuthenticate()){
    return true
  }else{
    return router.navigate(['/login'])
  }
};
