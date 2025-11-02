import {Component} from '@angular/core';
import {FormControl, FormGroup, ReactiveFormsModule, Validators} from '@angular/forms';
import {Router} from '@angular/router';
import {LoginService} from '../../../../core/services/auth/login/login';
import Swal from 'sweetalert2';

interface LoginFormControls {
  username: FormControl<string>;
  password: FormControl<string>;
}

@Component({
  selector: 'app-login',
  imports: [
    ReactiveFormsModule
  ],
  templateUrl: './login.html',
  styleUrl: './login.css'
})
export class Login {
  constructor(private service: LoginService, private router: Router) {
  }

  protected loginForm = new FormGroup<LoginFormControls>({
    username: new FormControl('', {
      nonNullable: true,
      validators: [
        Validators.required
      ]
    }),
    password: new FormControl('', {
      nonNullable: true,
      validators: [
        Validators.required,
        Validators.minLength(8)
      ]
    }),
  });

  onSubmit(form: any) {
    if (this.loginForm.valid) {
      console.log('Datos de Login enviados:', this.loginForm.value);

      this.service.login(form).subscribe({
        next: () => {
          Swal.fire({
            theme: 'bootstrap-5',
            title: "Inicio de Sesión Exitoso!",
            icon: "success",
            draggable: true,
            confirmButtonText: "Ir a Inicio"
          }).then((result) => {
            this.closeModal();

            if (this.service.isAdminAuthenticate()) {
              this.router.navigate(['/inicio/admin']);
            } else if (this.service.isDoctorAuthenticate()) {
              this.router.navigate(['/inicio/doctor']);
            } else if (this.service.isPacienteAuthenticate()) {
              this.router.navigate(['/inicio/paciente']);
            } else {
              this.router.navigate(['/']);
            }
          });
        },
        error: (err) => {
          const errorMessage = err.error.message || 'Ocurrió un error al iniciar sesión';

          Swal.fire({
            theme: 'bootstrap-5',
            title: "Error",
            text: errorMessage,
            icon: "error",
            draggable: true,
            confirmButtonText: "Entendido"
          });
        }
      });
    } else {
      this.loginForm.markAllAsTouched();
    }
  }

  private closeModal() {
    const modalElement = document.getElementById('authModal');

    if (modalElement) {
      modalElement.classList.remove('show');
      modalElement.style.display = 'none';
      modalElement.setAttribute('aria-hidden', 'true');
      modalElement.removeAttribute('aria-modal');

      document.querySelectorAll('.modal-backdrop').forEach(el => el.remove());
      document.body.classList.remove('modal-open');
      document.body.style.overflow = '';
      document.body.style.paddingRight = '';
    }
  }
}
