import { Component, OnInit } from '@angular/core';
import { CommonModule, DatePipe } from '@angular/common';
import { RouterLink } from "@angular/router";
import { CitaMedicaService } from '../../../core/services/cita-medica/cita-medica';
import { PacienteService } from '../../../core/services/paciente/paciente';
import Swal from 'sweetalert2';

interface Paciente {
  id?: number;
  dniPaciente?: string;
  nombrePaciente?: string;
  apellidoPaciente?: string;
}
interface CitaMedica {
  id?: number;
  nombreDoctor?: string;
  especialidadDoctor?: string;
  fecha?: string;
  horaInicio?: string;
  horaFin?: string;
  estado?: string;
}

@Component({
  selector: 'app-inicio-paciente',
  imports: [RouterLink, CommonModule],
  templateUrl: './inicio-paciente.html',
  styleUrl: './inicio-paciente.css'
})
export class InicioPaciente implements OnInit {
  loading: boolean = true;
  proximaCita: CitaMedica | undefined = {};
  citasRecientes: CitaMedica[] = [];
  paciente: Paciente = {};

  constructor(private citaService: CitaMedicaService, private pacienteService: PacienteService) {}

  ngOnInit() {
    this.obtenerPerfilPaciente();
    this.obtenerCitas();
  }

  obtenerPerfilPaciente() {
    this.pacienteService.obtenerPerfilPaciente().subscribe({
      next: (perfil) => {
        this.paciente = perfil;
      },
      error: () => {
        this.paciente = {};
      }
    });
  }

  obtenerCitas() {
    this.loading = true;
    this.citaService.listarMisCitas().subscribe({
      next: (citas) => {
        // Ordenar por fecha y hora (ascendente)
        const citasOrdenadas = [...citas].sort((a, b) => {
          const fechaA = (a.fecha || '');
          const horaA = (a.horaInicio || '');
          const fechaB = (b.fecha || '');
          const horaB = (b.horaInicio || '');
          return (fechaA + horaA).localeCompare(fechaB + horaB);
        });
        console.log(citasOrdenadas)
        // Próxima cita: la primera que esté pendiente y sea en el futuro
        const ahora = new Date();
        this.proximaCita = citasOrdenadas.find(cita => {
          const fecha = cita.fecha;
          const hora = cita.horaInicio;
          if (!fecha || !hora) return false;
          const fechaHora = new Date(fecha + 'T' + hora);
          return cita.estado === 'PENDIENTE' && fechaHora >= ahora;
        });
        console.log(this.proximaCita)
        // Citas recientes: las últimas 5 finalizadas o canceladas
        this.citasRecientes = citasOrdenadas
          .filter(cita => cita.estado === 'FINALIZADO' || cita.estado === 'CANCELADO')
          .reverse()
          .slice(0, 5);
        this.loading = false;
      },
      error: () => {

      }
    });
  }

  cancelarCita(cita: any) {
    if (!cita.id) return;
    Swal.fire({
      title: '¿Cancelar cita?',
      text: '¿Estás seguro de que deseas cancelar esta cita?',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Sí, cancelar',
      cancelButtonText: 'No',
      confirmButtonColor: '#d33',
      cancelButtonColor: '#3085d6'
    }).then((result) => {
      if (result.isConfirmed) {
        this.citaService.cancelarCita(cita.id).subscribe({
          next: () => {
            this.obtenerCitas();
            Swal.fire('Cancelada', 'La cita ha sido cancelada.', 'success');
          },
          error: () => {
            Swal.fire('Error', 'No se pudo cancelar la cita.', 'error');
          }
        });
      }
    });
  }

  getFechaEs(fechaStr?: string): string {
    if (!fechaStr) return '';
    const fecha = new Date(`${fechaStr}T00:00:00`);
    return fecha.toLocaleDateString('es-ES', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' });
  }
}
