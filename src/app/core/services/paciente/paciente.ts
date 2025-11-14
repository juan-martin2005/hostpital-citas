import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../../../environments/environment';

interface PacienteEntity {
  id?: number;
  dni?: string;
  email?: string;
  password?: string;
  nombre?: string;
  apellido?: string;
  fechaNacimiento?: string;
  telefono?: string;
  sexo?: string;

  message?: string;
  status?: number;
}

@Injectable({
  providedIn: 'root'
})

export class PacienteService {
  // private url = `${environment.apiURL}/paciente`;
  private url = 'http://localhost:8080/api/paciente';


  constructor(private http: HttpClient) {
  }

  listarPacientes(): Observable<PacienteEntity[]> {
    return this.http.get<PacienteEntity[]>(this.url);
  }

  obtenerPerfilPaciente(): Observable<PacienteEntity> {
    return this.http.get<PacienteEntity>(`${this.url}/perfil`);
  }

  crearPaciente(paciente: PacienteEntity): Observable<PacienteEntity> {
    return this.http.post<PacienteEntity>(this.url, paciente);
  }

  actualizarPaciente(paciente: PacienteEntity): Observable<PacienteEntity> {
    return this.http.put<PacienteEntity>(`${this.url}/update-perfil`, paciente);
  }
  actualizarPassword(paciente: PacienteEntity): Observable<PacienteEntity> {
    return this.http.patch<PacienteEntity>(`${this.url}/update-password`, paciente);
  }
}
