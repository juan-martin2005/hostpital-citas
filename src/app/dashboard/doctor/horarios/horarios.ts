import {Component, OnInit} from '@angular/core';
import {HorarioService} from '../../../core/services/horarios/horario';
import {CommonModule} from '@angular/common';
import Swal from 'sweetalert2';
import {Router} from '@angular/router';

interface HorarioEntity {
  id?: number;
  fecha?: string;
  horaInicio?: string;
  horaFin?: string;
  doctorId?: number;
  estado?: string;
}
interface BadgeInfo {
  colorClass: string;
  text: string;
}

@Component({
  selector: 'app-horarios',
  imports: [CommonModule],
  templateUrl: './horarios.html',
  styleUrl: './horarios.css'
})
export class Horarios implements OnInit {

  horarios: HorarioEntity[] = [];
  isLoading = false;

  constructor(private horarioService: HorarioService, private router: Router) {}

  ngOnInit(): void {
    this.listarHorarios();
  }

  listarHorarios(): void {
    this.isLoading = true;
    this.horarioService.listarHorarios().subscribe({
      next: (res: HorarioEntity[]) => {
        this.horarios = res;
        this.isLoading = false;
      },
      error: (err) => {
        this.isLoading = false;
        const errorMessage = err.error?.message || 'No se pudieron cargar los horarios';
        Swal.fire({ title: 'Error', text: errorMessage, icon: 'error', confirmButtonText: 'Aceptar' });
      }
    });
  }
  eliminarHorario(id: any): void {
    Swal.fire({
      title: '¿Estás seguro?',
      text: "¡No podrás revertir esto!",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Sí, eliminar',
      cancelButtonText: 'Cancelar'
    }).then((result) => {
      if (result.isConfirmed) {
        this.horarioService.eliminarHorario(id).subscribe({
          next: () => {
            Swal.fire('Eliminado', 'El horario ha sido eliminado.', 'success');
            this.listarHorarios();
          },
          error: (err) => {
            const errorMessage = err.error?.message || 'No se pudo eliminar el horario';
            Swal.fire('Error', errorMessage, 'error');
          }
        });
      }
    });
  }
  editarHorario(horario: HorarioEntity): void {
    this.router.navigate(['inicio/doctor/editar-horario', horario.id]);
  }

  getHorarioBadgeInfo(estado: string | undefined): BadgeInfo {
    let colorClass: string;
    let texto: string;

    switch (estado) {
      case 'ACTIVO':
      case 'LIBRE':
        colorClass = 'bg-success-subtle text-success';
        texto = estado;
        break;
      case 'OCUPADO':
      case 'PENDIENTE':
        colorClass = 'bg-warning-subtle text-warning';
        texto = estado;
        break;
      case 'INACTIVO':
      case 'CANCELADO':
        colorClass = 'bg-danger-subtle text-danger';
        texto = estado;
        break;
      case 'FINALIZADO':
        colorClass = 'bg-info-subtle text-info';
        texto = estado;
        break;
      default:
        colorClass = 'bg-secondary-subtle text-secondary';
        texto = 'DESCONOCIDO';
        break;
    }
    return { colorClass, text: texto };
  }
}
