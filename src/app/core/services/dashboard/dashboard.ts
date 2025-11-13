import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class DashboardService {
  private url = 'http://localhost:8080/api/dashboard';

  constructor(private http: HttpClient) {}

  getTotals(): Observable<any> {
    return this.http.get<any>(`${this.url}/totales`);
  }

  getLatestPacientes(limit: number = 5): Observable<any[]> {
    return this.http.get<any[]>(`${this.url}/ultimos-pacientes?limit=${limit}`);
  }

  getCitasByEstado(): Observable<{ [estado: string]: number }> {
    return this.http.get<{ [estado: string]: number }>(`${this.url}/citas-por-estado`);
  }

  getCitasByEspecialidad(): Observable<{ [especialidad: string]: number }> {
    return this.http.get<{ [especialidad: string]: number }>(`${this.url}/citas-por-especialidad`);
  }
}
