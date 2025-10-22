import { HttpInterceptorFn } from '@angular/common/http';
import { inject } from '@angular/core';
import {LoginService} from '../services/auth/login/login';
export const authInterceptor: HttpInterceptorFn = (req, next) => {

  const authService = inject(LoginService)
  const authToken = authService.getToken()

  if(!authToken){
    return next(req)
  }
  const auhtReq = req.clone({
    headers: req.headers.set('Authorization', `Bearer ${authToken}`)
  })

  return next(auhtReq)
};
