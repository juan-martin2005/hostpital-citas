import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

interface CitaMedicaEntity {
  idDoctor?: number;
  idHorario?: number;

  id?: number;
  nombreDoctor?: string;
  especialidadDoctor?: string;
  dniPaciente?: string;
  nombrePaciente?: string;
  apellidoPaciente?: string;
  horarioDoctor?: HorarioEntity;
  horario?: HorarioEntity;
  estado?: string;

  message?: string;
  status?: number;
}

interface HorarioEntity {
  id?: number;
  fecha?: string;
  horaInicio?: string;
  horaFin?: string;
}

@Injectable({
  providedIn: 'root'
})

export class CitaMedicaService {
  private url = 'http://localhost:8080/api/cita-medica';

  constructor(private http: HttpClient) { }

  listarCitasPaciente(): Observable<CitaMedicaEntity[]> {
    return this.http.get<CitaMedicaEntity[]>(`${this.url}/pacientes`);
  }

  listarMisCitas(): Observable<CitaMedicaEntity[]> {
    return this.http.get<CitaMedicaEntity[]>(`${this.url}/mis-citas`);
  }

  reservarCitaMedica(cita: CitaMedicaEntity): Observable<CitaMedicaEntity> {
    return this.http.post<CitaMedicaEntity>(this.url, cita);
  }

  cancelarCita(id: number): Observable<CitaMedicaEntity> {
    return this.http.patch<CitaMedicaEntity>(`${this.url}/cancelar/${id}`, {});
  }

  finalizarCita(id: number): Observable<CitaMedicaEntity> {
    return this.http.patch<CitaMedicaEntity>(`${this.url}/finalizar/${id}`, {});
  }
}
