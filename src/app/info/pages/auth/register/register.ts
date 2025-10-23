import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import {Router} from '@angular/router';
import {RegisterService} from '../../../../core/services/auth/register/register';
import Swal from 'sweetalert2';

interface RegisterFormControls {
  nombre: FormControl<string>;
  apellido: FormControl<string>;
  email: FormControl<string>;
  dni: FormControl<string>;
  fechaNacimiento: FormControl<string>;
  password: FormControl<string>;
  confirmPassword: FormControl<string>;
  telefono: FormControl<string>;
  sexo: FormControl<string | null>;
}

@Component({
  selector: 'app-register',
  standalone: true,
  imports: [CommonModule, FormsModule, ReactiveFormsModule],
  templateUrl: './register.html',
  styleUrls: ['./register.css']
})
export class RegisterComponent {

  constructor(private service: RegisterService, private router: Router) {
  }

  registerForm = new FormGroup<RegisterFormControls>({
    nombre: new FormControl('', {
      nonNullable: true,
      validators: [Validators.required]
    }),
    apellido: new FormControl('', {
      nonNullable: true,
      validators: [Validators.required]
    }),
    email: new FormControl('', {
      nonNullable: true,
      validators: [Validators.required, Validators.email]
    }),
    dni: new FormControl('', {
      nonNullable: true,
      validators: [Validators.required, Validators.pattern('^[0-9]{8}$')]
    }),
    fechaNacimiento: new FormControl('', {
      nonNullable: true,
      validators: [Validators.required]
    }),
    telefono: new FormControl('', {
      nonNullable: true,
      validators: [Validators.required, Validators.pattern('^[0-9]{9}$')] // Ejemplo: 9 dígitos
    }),
    sexo: new FormControl('', {
      nonNullable: true,
      validators: [Validators.required]
    }),
    password: new FormControl('', {
      nonNullable: true,
      validators: [Validators.required, Validators.minLength(8)]
    }),
    confirmPassword: new FormControl('', {
      nonNullable: true,
      validators: [Validators.required]
    }),
  });

  onSubmit(form: any) {
    if (this.registerForm.invalid) {
      this.registerForm.markAllAsTouched();
      return;
    }

    if (!this.confirmarPassword()) {
      Swal.fire({
        title: 'Error de Validación',
        text: 'Las contraseñas no coinciden. Por favor, revísalas.',
        icon: 'error',
        confirmButtonText: 'Aceptar'
      });
      return;
    }

    this.service.registrar(form).subscribe({
      next: () => {
        Swal.fire({
          theme: 'bootstrap-5',
          title: "¡Registro Exitoso!",
          text: "Serás redirigido a la página de inicio.",
          icon: "success",
          draggable: true,
          confirmButtonText: "Aceptar"
        })
          .then(() => {
            this.registerForm.reset();
          });
      },
      error: (err) => {
        console.error('Error al registrar paciente:', err);
        const errorMessage = err.error?.message || 'Ocurrió un error inesperado durante el registro.';
        Swal.fire({
          title: 'Error en el Registro',
          text: errorMessage,
          icon: 'error',
          confirmButtonText: 'Aceptar'
        });
      }
    });
  }

  confirmarPassword():boolean {
    const password = this.registerForm.get('password')?.value;
    const confirmPassword = this.registerForm.get('confirmPassword')?.value;
    return password === confirmPassword;  }
}
