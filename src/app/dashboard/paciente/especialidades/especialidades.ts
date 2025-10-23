import { Component, OnInit } from '@angular/core';
import {EspecialidadService} from '../../../core/services/especialidad/especialidad';
import {RouterLink, RouterLinkActive} from '@angular/router';


interface EspecialidadEntity {
  id?: number;
  nombre?: string;
  descripcion?: string;
  message?: string;
  status?: number;
}

@Component({
  selector: 'app-especialidades',
  templateUrl: './especialidades.html',
  imports: [
    RouterLink,
  ],
  styleUrls: ['./especialidades.css']
})
export class EspecialidadesPaciente implements OnInit {

  especialidades: EspecialidadEntity[] = [];

  constructor(private especialidadService: EspecialidadService) { }

  ngOnInit(): void {
    this.especialidadService.listarEspecialidades().subscribe({
      next: (data) => {
        this.especialidades = data;
        console.log('Especialidades:', data); // <-- ver en consola
      },
      error: (err) => console.error('Error al obtener especialidades', err)
    });
  }
}

