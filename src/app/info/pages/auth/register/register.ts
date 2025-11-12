import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators, FormsModule, ReactiveFormsModule, AbstractControl, ValidationErrors } from '@angular/forms';
import { CommonModule } from '@angular/common';
import {Router} from '@angular/router';
import {RegisterService} from '../../../../core/services/auth/register/register';
import Swal from 'sweetalert2';
import { LoginService } from '../../../../core/services/auth/login/login';

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

  constructor(private service: RegisterService, private router: Router, private loginService: LoginService) {
  }

  registerForm = new FormGroup<RegisterFormControls>({
    nombre: new FormControl('', {
      nonNullable: true,
      validators: [Validators.required, Validators.pattern('^[a-zA-ZáéíóúÁÉÍÓÚñÑ\\s]+$')]
    }),
    apellido: new FormControl('', {
      nonNullable: true,
      validators: [Validators.required, Validators.pattern('^[a-zA-ZáéíóúÁÉÍÓÚñÑ\\s]+$')]
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
      validators: [Validators.required, this.validarEdadMinima(18)]
    }),
    telefono: new FormControl('', {
      nonNullable: true,
      validators: [Validators.required, Validators.pattern('^[0-9]{9}$')]
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

  validarEdadMinima(edadMinima: number) {
    return (control: AbstractControl): ValidationErrors | null => {
      if (!control.value) {
        return null;
      }

      const fechaNacimiento = new Date(control.value);
      const hoy = new Date();

      if (fechaNacimiento > hoy) {
        return { fechaFutura: true };
      }

      let edad = hoy.getFullYear() - fechaNacimiento.getFullYear();
      const mes = hoy.getMonth() - fechaNacimiento.getMonth();

      if (mes < 0 || (mes === 0 && hoy.getDate() < fechaNacimiento.getDate())) {
        edad--;
      }

      if (edad < edadMinima) {
        return { edadMinima: true };
      }

      return null;
    };
  }

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
    if(!this.loginService.geExp()){localStorage.removeItem('token')}
    this.service.registrar(form).subscribe({
      next: () => {
        Swal.fire({
          title: '¡Registro Exitoso!',
          text: 'Tu cuenta ha sido creada correctamente.',
          icon: 'success',
          confirmButtonText: 'Aceptar'
        }).then(() => {
          this.registerForm.reset();
        });
      },
      error: (err) => {
        console.error('Error al registrar paciente:', err);

        const errorMessage = err.error?.message || 'Ocurrió un error inesperado durante el registro.';

        Swal.fire({
          title: 'Error',
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
    return password === confirmPassword;
  }
}
