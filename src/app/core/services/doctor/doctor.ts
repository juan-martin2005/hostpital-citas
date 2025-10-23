import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';

interface DoctorEntity {
  id?: number;
  email?: string;
  password?: string;
  nombre?: string;
  apellido?: string;
  telefono?: string;
  sexo?: string;
  especialidad?: string;
  horarios?: HorarioEntity[];

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

export class DoctorService {
  private url = 'http://localhost:8080/api/doctor';

  constructor(private http: HttpClient) { }

  listarTodosLosDoctores(): Observable<DoctorEntity[]> {
    return this.http.get<DoctorEntity[]>(`${this.url}/todos`);
  }

  listarDoctoresPorEspecialidad(especialidad: string): Observable<DoctorEntity[]> {
    const params = new HttpParams().set('especialidad', especialidad);
    return this.http.get<DoctorEntity[]>(this.url, { params });
  }

  crearDoctor(doctor: DoctorEntity): Observable<DoctorEntity> {
    return this.http.post<DoctorEntity>(this.url, doctor);
  }
}
