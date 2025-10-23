import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators, ReactiveFormsModule, FormsModule } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import Swal from 'sweetalert2';
import { HorarioService } from '../../../core/services/horarios/horario';


@Component({
  selector: 'app-editar-horario',
  standalone: true,
  imports: [CommonModule, FormsModule, ReactiveFormsModule],
  templateUrl: './editar-horario.html',
  styleUrls: ['./editar-horario.css']
})
export class EditarHorario implements OnInit {

  horarioForm = new FormGroup({
    fecha: new FormControl('', Validators.required),
    horaInicio: new FormControl('', Validators.required),
    horaFin: new FormControl('', Validators.required)
  });

  horarioId!: number;
  isLoading = false;

  constructor(
    private horarioService: HorarioService,
    private route: ActivatedRoute,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.horarioId = Number(this.route.snapshot.paramMap.get('id'));
    this.cargarHorario();
  }

  cargarHorario(): void {
    this.isLoading = true;
    this.horarioService.listarHorarios().subscribe({
      next: (data) => {
        const horario = data.find(h => h.id === this.horarioId);
        if (!horario) {
          Swal.fire('Error', 'No se encontró el horario.', 'error');
          this.router.navigate(['/inicio/doctor/horarios']);
          return;
        }

        this.horarioForm.patchValue({
          fecha: horario.fecha,
          horaInicio: horario.horaInicio,
          horaFin: horario.horaFin
        });

        this.isLoading = false;
      },
      error: () => {
        this.isLoading = false;
        Swal.fire('Error', 'No se pudo cargar el horario.', 'error');
      }
    });
  }

  onSubmit(): void {
    if (this.horarioForm.invalid) {
      this.horarioForm.markAllAsTouched();
      return;
    }

    this.isLoading = true;
    const formValue = this.horarioForm.value;

    const horarioData = {
      fecha: formValue.fecha!,
      horaInicio: formValue.horaInicio!,
      horaFin: formValue.horaFin!
    };

    this.horarioService.actualizarHorario(this.horarioId, horarioData).subscribe({
      next: () => {
        this.isLoading = false;
        Swal.fire({
          title: '¡Horario Actualizado!',
          text: 'Los cambios se guardaron correctamente.',
          icon: 'success',
          confirmButtonText: 'Aceptar'
        }).then(() => this.volver());
      },
      error: (err) => {
        this.isLoading = false;
        const errorMessage = err.error?.message || 'No se pudo actualizar el horario';
        Swal.fire('Error', errorMessage, 'error');
      }
    });
  }


  volver(): void {
    this.router.navigate(['/inicio/doctor/horarios']);
  }

}
