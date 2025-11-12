import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators, ReactiveFormsModule, FormsModule } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { EspecialidadService } from '../../../core/services/especialidad/especialidad';
import Swal from 'sweetalert2';
import {CommonModule} from '@angular/common';

@Component({
  selector: 'app-editar-especialidad',
  standalone: true,
  templateUrl: './editar-especialidad.html',
  imports: [
    CommonModule, FormsModule, ReactiveFormsModule
  ],
  styleUrls: ['./editar-especialidad.css']
})

export class EditarEspecialidad implements OnInit {

  especialidadForm = new FormGroup({
    nombre: new FormControl('', Validators.required),
    descripcion: new FormControl('', Validators.required),
    precio: new FormControl(0, Validators.required),
  });

  especialidadId!: number;
  isLoading = false;

  constructor(
    private especialidadService: EspecialidadService,
    private route: ActivatedRoute,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.especialidadId = Number(this.route.snapshot.paramMap.get('id'));
    this.cargarEspecialidad(this.especialidadId);
  }

  cargarEspecialidad(id: number): void {
    this.isLoading = true;
    this.especialidadService.listarEspecialidades().subscribe({
      next: (data) => {
        const especialidad = data.find(esp => esp.id === id);
        if (!especialidad) {
          Swal.fire('Error', 'No se encontró la especialidad.', 'error');
          this.router.navigate(['/inicio/admin/especialidades']);
          return;
        }

        this.especialidadForm.patchValue({
          nombre: especialidad.nombre,
          descripcion: especialidad.descripcion,
          precio: especialidad.precio
        });

        this.isLoading = false;
      },
      error: (err) => {
        console.error(err);
        this.isLoading = false;
        Swal.fire('Error', 'No se pudo cargar la especialidad.', 'error');
      }
    });
  }

  onSubmit(): void {
    if (this.especialidadForm.invalid) {
      this.especialidadForm.markAllAsTouched();
      return;
    }

    this.isLoading = true;
    const formValue = this.especialidadForm.value;

    const especialidadData = {
      nombre: formValue.nombre!,
      descripcion: formValue.descripcion!,
      precio: formValue.precio!
    };

    this.especialidadService.modificarEspecialidad(this.especialidadId, especialidadData).subscribe({
      next: () => {
        this.isLoading = false;
        Swal.fire({
          title: '¡Especialidad Actualizada!',
          text: 'Los cambios se guardaron correctamente.',
          icon: 'success',
          confirmButtonText: 'Aceptar'
        }).then(() => this.volver());
      },
      error: (err) => {
        this.isLoading = false;
        let title = 'Error al actualizar';
        let errorMessage = 'No se pudo actualizar la especialidad. Por favor, inténtelo de nuevo.';

        if (err.status === 400 && err.error && err.error.message) {
          title = err.error.error || 'Error de Validación';

          if (typeof err.error.message === 'object') {
            const fieldErrors = Object.entries(err.error.message)
              .map(([field, error]) => `${field.charAt(0).toUpperCase() + field.slice(1)}: ${error}`)
              .join('<br>');

            errorMessage = `Se encontraron los siguientes problemas de validación:<br><br>${fieldErrors}`;
          } else if (typeof err.error.message === 'string') {
            errorMessage = err.error.message;
          }
        } else if (err.error?.message) {
          errorMessage = err.error.message;
        }

        Swal.fire({
          title: title,
          html: errorMessage,
          icon: 'error',
          confirmButtonText: 'Entendido'
        });
      }
    });
  }

  volver(): void {
    this.router.navigate(['/inicio/admin/especialidades']);
  }
}
