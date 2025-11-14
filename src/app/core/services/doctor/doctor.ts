import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../../../environments/environment';

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
  // private url = `${environment.apiURL}/doctor`;
  private url = 'http://localhost:8080/api/doctor';


  constructor(private http: HttpClient) { }

  listarTodosLosDoctores(): Observable<DoctorEntity[]> {
    return this.http.get<DoctorEntity[]>(`${this.url}/todos`);
  }

  obtenerPerfilDoctor(): Observable<DoctorEntity> {
    return this.http.get<DoctorEntity>(`${this.url}/perfil`);
  }

  listarDoctoresPorEspecialidad(especialidad: string): Observable<DoctorEntity[]> {
    const params = new HttpParams().set('especialidad', especialidad);
    return this.http.get<DoctorEntity[]>(this.url, { params });
  }

  crearDoctor(doctor: DoctorEntity): Observable<DoctorEntity> {
    return this.http.post<DoctorEntity>(this.url, doctor);
  }
  actualizarPassword(doctor: DoctorEntity): Observable<DoctorEntity> {
    return this.http.patch<DoctorEntity>(`${this.url}/update-password`, doctor);
  }
}
