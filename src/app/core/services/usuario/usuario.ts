import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';

interface UsuarioEntity {
  id?: number;
  username?: string;
  password?: string;
  nombre?: string;
  apellido?: string;
  roles?: string[];
  estado?: string;
  message?: string;
  status?: number;
}

@Injectable({
  providedIn: 'root'
})
export class UsuarioService {
  private url = 'http://localhost:8080/api/usuario';

  constructor(private http: HttpClient) { }

  listarUsuarios(): Observable<UsuarioEntity[]> {
    return this.http.get<UsuarioEntity[]>(this.url);
  }

  modificarUsuario(id: number, usuario: UsuarioEntity): Observable<UsuarioEntity> {
    return this.http.put<UsuarioEntity>(`${this.url}/${id}`, usuario);
  }

  eliminarUsuario(id: number): Observable<UsuarioEntity> {
    return this.http.delete<UsuarioEntity>(`${this.url}/${id}`);
  }
}
