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
    sexo: new FormControl(null, {
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
    console.log(form);
    // SERVICIO
    if(!this.registerForm.invalid){
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
          .then((result) => {
            this.registerForm.reset();
          });
      },
    })
    }
  }

  confirPassword(){
    return this.registerForm.get('confirmPassword')?.value  === this.registerForm.get('password')?.value ? true : false;
  }
}
