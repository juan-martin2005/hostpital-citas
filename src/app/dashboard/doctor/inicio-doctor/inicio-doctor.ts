import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CitaMedicaService } from '../../../core/services/cita-medica/cita-medica';

@Component({
  selector: 'app-inicio-doctor',
  imports: [CommonModule],
  templateUrl: './inicio-doctor.html',
  styleUrl: './inicio-doctor.css'
})
export class InicioDoctor implements OnInit {
  citasHoy: any[] = [];
  totalCitas: number = 0;
  totalAtendidos: number = 0;
  totalPendientes: number = 0;
  loading: boolean = true;

  constructor(private citaService: CitaMedicaService) {}

  ngOnInit() {
    this.obtenerCitasHoy();
  }

  obtenerCitasHoy() {
    this.loading = true;
    this.citaService.listarMisCitas().subscribe({
      next: (citas: any[]) => {
        // Filtrar solo las citas de hoy
        const hoy = new Date();
        const hoyStr = hoy.toISOString().slice(0, 10);
        this.citasHoy = citas.filter(cita => {
          const fecha = cita.horarioDoctor?.fecha || cita.horario?.fecha;
          return fecha === hoyStr;
        });
        this.totalCitas = this.citasHoy.length;
        this.totalAtendidos = this.citasHoy.filter(c => c.estado === 'FINALIZADO').length;
        this.totalPendientes = this.citasHoy.filter(c => c.estado === 'PENDIENTE').length;
        this.loading = false;
      },
      error: () => {
        this.citasHoy = [];
        this.totalCitas = 0;
        this.totalAtendidos = 0;
        this.totalPendientes = 0;
        this.loading = false;
      }
    });
  }

  finalizarCita(cita: any) {
    if (!cita.id) return;
    this.citaService.finalizarCita(cita.id).subscribe({
      next: () => this.obtenerCitasHoy(),
      error: () => {}
    });
  }
}
