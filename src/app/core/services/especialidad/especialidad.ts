import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../../../environments/environment';

interface EspecialidadEntity {
  id?: number;
  nombre?: string;
  descripcion?: string;
  precio?: number;
  message?: string;
  status?: number;
}

@Injectable({
  providedIn: 'root'
})

export class EspecialidadService {
  // private url = `${environment.apiURL}/especialidad`;
  private url = 'http://localhost:8080/api/especialidad';

  constructor(private http: HttpClient) { }

  listarEspecialidades(): Observable<EspecialidadEntity[]> {
    return this.http.get<EspecialidadEntity[]>(this.url);
  }
  listarEspecialidadById(id: number | null): Observable<EspecialidadEntity> {
    return this.http.get<EspecialidadEntity>(`${this.url}/${id}`);
  }

  registrarEspecialidad(especialidad: EspecialidadEntity): Observable<EspecialidadService> {
    return this.http.post<EspecialidadService>(this.url, especialidad);
  }

  modificarEspecialidad(id: number, especialidad: EspecialidadEntity): Observable<EspecialidadService> {
    return this.http.put<EspecialidadService>(`${this.url}/${id}`, especialidad);
  }

  eliminarEspecialidad(id: number): Observable<EspecialidadService> {
    return this.http.delete<EspecialidadService>(`${this.url}/${id}`);
  }
}
