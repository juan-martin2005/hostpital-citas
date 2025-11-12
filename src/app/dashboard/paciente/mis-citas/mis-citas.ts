import { Component } from '@angular/core';
import { CitaMedicaService } from '../../../core/services/cita-medica/cita-medica';
import Swal from 'sweetalert2';

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
  selector: 'app-mis-citas',
  imports: [],
  templateUrl: './mis-citas.html',
  styleUrl: './mis-citas.css'
})
export class MisCitas {

  citaMedica: CitaMedica[] = []
  isLoading = false

  constructor(private citaMedicaService: CitaMedicaService){}


  ngOnInit(): void {
    this.listarMisCitas();
  }

  listarMisCitas(): void{
    this.isLoading = true;
    this.citaMedicaService.listarMisCitas().subscribe({
      next: (res) => {
        this.citaMedica = res;
        this.isLoading = false
      },
      error: (err) => {
        this.isLoading = false;
        const errorMessage = err.error?.message || 'No se pudieron cargar los horarios';
        Swal.fire({ title: 'Error', text: errorMessage, icon: 'error', confirmButtonText: 'Aceptar' });
      }
    })
  }
  cancelarCita(id: number ): void{
    console.log(id)
    Swal.fire({
      title: "¿Quiere cancelar su cita médica?",
      text: "¡No podrás revertir esto!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonText: "Sí, cancelar",
      cancelButtonText: "Cancelar"
    }).then((result) => {
      if (result.isConfirmed) {
        this.citaMedicaService.cancelarCita(id).subscribe({
          next: (res) =>{
            Swal.fire({
              title: "Cita médica cancelada",
              text: "La cita médica ha sido cancelada",
              icon: "success",
              confirmButtonText: "Ok",
            })
            this.listarMisCitas()
          },
          error: (err) => {
            console.log(err)
          }
        })
      }

    })

  }

  getCitaBadgeInfo(estado: string | undefined){
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
