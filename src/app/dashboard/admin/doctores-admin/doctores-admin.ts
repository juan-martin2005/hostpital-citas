import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { DoctorService } from '../../../core/services/doctor/doctor';
import { UsuarioService } from '../../../core/services/usuario/usuario';
import Swal from 'sweetalert2';

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
  estado?: string;
}

interface HorarioEntity {
  id?: number;
  fecha?: string;
  horaInicio?: string;
  horaFin?: string;
}

@Component({
  selector: 'app-doctores-admin',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './doctores-admin.html',
  styleUrl: './doctores-admin.css',
})

export class DoctoresAdmin implements OnInit {
  doctores: DoctorEntity[] = [];
  isLoading = false;

  constructor(
    private doctorService: DoctorService,
    private usuarioService: UsuarioService,
    private router: Router
  ) {
  }

  ngOnInit(): void {
    this.cargarDoctores();
  }

  cargarDoctores(): void {
    this.isLoading = true;
    this.doctorService.listarTodosLosDoctores().subscribe({
      next: (doctores) => {
        this.doctores = doctores;
        this.usuarioService.listarUsuarios().subscribe({
          next: (usuarios) => {
            this.doctores = this.doctores.map(doctor => {
              const usuario = usuarios.find(u => u.username === doctor.email);
              return {...doctor, estado: usuario?.estado || 'DESCONOCIDO'};
            });
            this.isLoading = false;
          },
          error: (err) => {
            this.isLoading = false;
            console.error('Error al cargar usuarios:', err);
            const errorMessage = err.error?.message || 'No se pudieron cargar los usuarios';
            Swal.fire({
              title: 'Error',
              text: errorMessage,
              icon: 'error',
              confirmButtonText: 'Aceptar'
            });
          }
        });
      },
      error: (err) => {
        this.isLoading = false;
        console.error('Error al cargar doctores:', err);
        const errorMessage = err.error?.message || 'No se pudieron cargar los doctores';
        Swal.fire({
          title: 'Error',
          text: errorMessage,
          icon: 'error',
          confirmButtonText: 'Aceptar'
        });
      }
    });
  }

  eliminarDoctor(id: number | undefined): void {
    if (!id) return;

    const doctorSeleccionado = this.doctores.find(d => d.id === id);
    if (!doctorSeleccionado || !doctorSeleccionado.email) {
      Swal.fire({
        title: 'Error',
        text: 'No se encontró el doctor o su correo asociado.',
        icon: 'error',
        confirmButtonText: 'Aceptar'
      });
      return;
    }

    Swal.fire({
      title: '¿Estás seguro?',
      text: 'Esta acción cambiará el estado del doctor a inactivo.',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Sí, inhabilitar',
      cancelButtonText: 'Cancelar'
    }).then((result) => {
      if (result.isConfirmed) {
        this.isLoading = true;

        this.usuarioService.listarUsuarios().subscribe({
          next: (usuarios) => {
            const usuario = usuarios.find(u => u.username === doctorSeleccionado.email);

            if (!usuario) {
              this.isLoading = false;
              Swal.fire({
                title: 'No encontrado',
                text: 'No se encontró el usuario asociado a este doctor.',
                icon: 'info',
                confirmButtonText: 'Aceptar'
              });
              return;
            }

            this.usuarioService.eliminarUsuario(usuario.id!).subscribe({
              next: () => {
                this.isLoading = false;
                Swal.fire({
                  title: 'Estado actualizado',
                  text: 'El doctor ha sido inhabilitado correctamente.',
                  icon: 'success',
                  confirmButtonText: 'Aceptar'
                });
                this.cargarDoctores();
              },
              error: (err) => {
                this.isLoading = false;
                console.error('Error al eliminar usuario:', err);

                const errorMessage = err.error?.message || 'No se pudo eliminar el usuario asociado.';

                Swal.fire({
                  title: 'Error',
                  text: errorMessage,
                  icon: 'error',
                  confirmButtonText: 'Aceptar'
                });
              }
            });
          },
          error: (err) => {
            this.isLoading = false;
            console.error('Error al obtener usuarios:', err);

            const errorMessage = err.error?.message || 'No se pudieron obtener los usuarios.';

            Swal.fire({
              title: 'Error',
              text: errorMessage,
              icon: 'error',
              confirmButtonText: 'Aceptar'
            });
          }
        });
      }
    });
  }

  editarDoctor(id: number | undefined): void {
    if (!id) return;

    const doctorSeleccionado = this.doctores.find(d => d.id === id);
    if (!doctorSeleccionado || !doctorSeleccionado.email) {
      Swal.fire({
        title: 'Error',
        text: 'No se encontró el doctor o su correo asociado.',
        icon: 'error',
        confirmButtonText: 'Aceptar'
      });
      return;
    }

    this.isLoading = true;
    this.usuarioService.listarUsuarios().subscribe({
      next: (usuarios) => {
        const usuario = usuarios.find(u => u.username === doctorSeleccionado.email);
        this.isLoading = false;

        if (!usuario) {
          Swal.fire({
            title: 'No encontrado',
            text: 'No se encontró el usuario asociado a este doctor.',
            icon: 'info',
            confirmButtonText: 'Aceptar'
          });
          return;
        }

        this.router.navigate(['/inicio/admin/editar-doctor', usuario.id]);
      },
      error: (err) => {
        this.isLoading = false;
        console.error('Error al obtener usuarios:', err);

        const errorMessage = err.error?.message || 'No se pudieron obtener los usuarios.';

        Swal.fire({
          title: 'Error',
          text: errorMessage,
          icon: 'error',
          confirmButtonText: 'Aceptar'
        });
      }
    });
  }

}
