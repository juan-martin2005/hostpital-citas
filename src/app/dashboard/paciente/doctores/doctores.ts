import { Component, OnInit } from '@angular/core';
import {DoctorService} from '../../../core/services/doctor/doctor';

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

@Component({
  selector: 'app-doctores',
  templateUrl: './doctores.html',
  styleUrls: ['./doctores.css']
})
export class Doctores implements OnInit {

  doctores: DoctorEntity[] = [];

  constructor(private doctorService: DoctorService) { }

  ngOnInit(): void {
    this.doctorService.listarTodosLosDoctores().subscribe({
      next: (data) => {
        this.doctores = data;
        console.log('Doctores:', data);
      },
      error: (err) => console.error('Error al obtener doctores', err)
    });
  }
}
