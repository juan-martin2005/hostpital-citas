import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';

interface RegistroEntity {
  dni: string;
  email: string;
  password:string
  nombre:string
  apellido:string
  telefono:string
  fechaNacimiento:string
  sexo:string
}

@Injectable({
  providedIn: 'root'
})
export class RegisterService {
  private url = 'http://localhost:8080/api/paciente'
  constructor(private http: HttpClient) { }

  registrar(regitro: RegistroEntity):Observable<RegistroEntity>{
    return this.http.post<RegistroEntity>(this.url, regitro);
  }
}
