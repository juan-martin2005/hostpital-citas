import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

interface HorarioEntity {
  id?: number;
  fecha?: string;
  horaInicio?: string;
  horaFin?: string;

  message?: string;
  status?: number;
}


@Injectable({
  providedIn: 'root'
})

export class HorarioService {
  private url = 'http://localhost:8080/api/horario';

  constructor(private http: HttpClient) { }

  listarHorarios(): Observable<HorarioEntity[]> {
    return this.http.get<HorarioEntity[]>(this.url);
  }

  crearHorario(horario: HorarioEntity): Observable<HorarioService> {
    return this.http.post<HorarioService>(this.url, horario);
  }

  actualizarHorario(id: number, horario: HorarioEntity): Observable<HorarioService> {
    return this.http.put<HorarioService>(`${this.url}/${id}`, horario);
  }

  eliminarHorario(id: number): Observable<HorarioService> {
    return this.http.delete<HorarioService>(`${this.url}/${id}`);
  }
}
