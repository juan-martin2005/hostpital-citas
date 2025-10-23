import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Router} from '@angular/router';
import {Observable, tap} from 'rxjs';

interface LoginEnity {
  username: string;
  password: string;
  status?: number;
  token?: string;
}

@Injectable({
  providedIn: 'root'
})
export class LoginService {
  private url = 'http://localhost:8080/auth/login'
  private tokenKey = 'token';
  constructor(private http: HttpClient, private router: Router) { }

  login(login: LoginEnity): Observable<LoginEnity>{
    return this.http.post<LoginEnity>(this.url, login).pipe(
      tap( response =>{
        if(response.token){
          console.log(response.token);
          this.setToken(response.token);
        }
      })
    );
  }

  private setToken(token : string): void{
    localStorage.setItem(this.tokenKey, token);
  }
  getToken(): string | null{
    return localStorage.getItem(this.tokenKey);
  }

  //Obtener el rol del usuario
  geRol(){
    const token = this.getToken();
    if(!token){
      return false;
    }
    const paylod = JSON.parse(atob(token.split('.')[1]));
    return paylod.role[0].authority;
  }

  //Tiempo de expiración del token
  geExp(): boolean{
    const token = this.getToken();
    if(!token){
      return false;
    }
    const paylod = JSON.parse(atob(token.split('.')[1]));
    return Date.now() < paylod.exp * 1000;
  }

  getInfoToken(): any {
    const token = this.getToken();
    if (!token) {
      return null;
    }
    const payload = JSON.parse(atob(token.split('.')[1]));
    return {
      id: payload.id || payload.sub,
      username: payload.username || payload.sub,
      nombre: payload.nombre,
      apellido: payload.apellido,
      email: payload.email,
      rol: payload.role[0].authority
    };
  }

  getUser(): string {
    const userInfo = this.getInfoToken();
    const rol = this.geRol();

    if (userInfo?.nombre && userInfo?.apellido) {
      return `${userInfo.apellido}, ${userInfo.nombre}`;
    }

    if (rol === 'ROLE_ADMIN') {
      return 'Administrador';
    }

    return userInfo?.username || 'Usuario';
  }

  isPacienteAuthenticate(): boolean{
    const role = this.geRol()
    return role === 'ROLE_PACIENTE' && this.geExp();
  }
  isDoctorAuthenticate(): boolean{
    const role = this.geRol()
    return role === 'ROLE_DOCTOR' && this.geExp();
  }
  isAdminAuthenticate(): boolean{
    const role = this.geRol()
    return role === 'ROLE_ADMIN' && this.geExp();
  }

  logOut(): void{
    localStorage.removeItem(this.tokenKey)
    this.router.navigate(['/login']);
  }
}
