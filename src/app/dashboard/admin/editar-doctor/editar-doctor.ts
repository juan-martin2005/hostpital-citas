import { Component, OnInit } from '@angular/core';
import { FormGroup, Validators, ReactiveFormsModule, FormControl } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import Swal from 'sweetalert2';
import { UsuarioService } from '../../../core/services/usuario/usuario';

interface UsuarioEntity {
  id?: number;
  password?: string;
}

interface PasswordFormControls {
  password: FormControl<string>;
  confirmPassword: FormControl<string>;
}

@Component({
  selector: 'app-editar-doctor',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './editar-doctor.html',
  styleUrls: ['./editar-doctor.css']
})
export class EditarDoctor implements OnInit {
  passwordForm!: FormGroup<PasswordFormControls>;
  usuarioId!: number;
  isLoading = false;

  constructor(
    private usuarioService: UsuarioService,
    private route: ActivatedRoute,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.passwordForm = new FormGroup<PasswordFormControls>({
      password: new FormControl('', {
        nonNullable: true,
        validators: [Validators.required, Validators.minLength(8)]
      }),
      confirmPassword: new FormControl('', {
        nonNullable: true,
        validators: [Validators.required]
      })
    });

    this.usuarioId = Number(this.route.snapshot.paramMap.get('id'));

    if (!this.usuarioId) {
      this.mostrarError('No se encontró el ID del usuario asociado al doctor.');
    }
  }

  confirmarPassword(): boolean {
    const password = this.passwordForm.get('password')?.value;
    const confirmPassword = this.passwordForm.get('confirmPassword')?.value;
    return password === confirmPassword;
  }

  onSubmit(): void {
    if (this.passwordForm.invalid) {
      this.passwordForm.markAllAsTouched();
      Swal.fire({
        title: 'Formulario inválido',
        text: 'Por favor completa todos los campos correctamente',
        icon: 'warning',
        confirmButtonText: 'Aceptar'
      });
      return;
    }

    if (!this.confirmarPassword()) {
      Swal.fire({
        title: 'Contraseñas no coinciden',
        text: 'Asegúrate de que ambas contraseñas sean iguales',
        icon: 'error',
        confirmButtonText: 'Aceptar'
      });
      return;
    }

    if (!this.usuarioId) {
      this.mostrarError('No se encontró el usuario asociado al doctor.');
      return;
    }

    this.isLoading = true;

    const updatedUsuario: Partial<UsuarioEntity> = {
      id: this.usuarioId,
      password: this.passwordForm.get('password')?.value
    };

    this.usuarioService.modificarUsuario(this.usuarioId, updatedUsuario).subscribe({
      next: () => {
        this.isLoading = false;
        Swal.fire({
          title: 'Actualizado',
          text: 'La contraseña del doctor ha sido actualizada correctamente.',
          icon: 'success',
          confirmButtonText: 'Aceptar'
        }).then(() => this.router.navigate(['/inicio/admin/doctores']));
      },
      error: (err) => {
        this.isLoading = false;
        console.error('Error al actualizar usuario:', err);
        this.mostrarError('Ocurrió un error al actualizar la contraseña.');
      }
    });
  }

  private mostrarError(mensaje: string): void {
    this.isLoading = false;
    Swal.fire({
      title: 'Error',
      text: mensaje,
      icon: 'error',
      confirmButtonText: 'Aceptar'
    }).then(() => this.router.navigate(['/inicio/admin/doctores']));
  }

  cancelar(): void {
    this.router.navigate(['/inicio/admin/doctores']);
  }
}
