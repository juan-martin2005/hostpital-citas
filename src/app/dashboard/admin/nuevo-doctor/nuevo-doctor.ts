import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import Swal from 'sweetalert2';
import {DoctorService} from '../../../core/services/doctor/doctor';
import {EspecialidadService} from '../../../core/services/especialidad/especialidad';

interface DoctorFormControls {
  nombre: FormControl<string>;
  apellido: FormControl<string>;
  email: FormControl<string>;
  password: FormControl<string>;
  confirmPassword: FormControl<string>;
  telefono: FormControl<string>;
  sexo: FormControl<string>;
  especialidad: FormControl<string>;
}

interface EspecialidadEntity {
  id?: number;
  nombre?: string;
  descripcion?: string;
}

@Component({
  selector: 'app-nuevo-doctor',
  standalone: true,
  imports: [CommonModule, FormsModule, ReactiveFormsModule],
  templateUrl: './nuevo-doctor.html',
  styleUrl: './nuevo-doctor.css'
})
export class NuevoDoctor implements OnInit {
  especialidades: EspecialidadEntity[] = [];
  isLoading = false;

  constructor(
    private doctorService: DoctorService,
    private especialidadService: EspecialidadService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.cargarEspecialidades();
  }

  doctorForm = new FormGroup<DoctorFormControls>({
    nombre: new FormControl('', {
      nonNullable: true,
      validators: [Validators.required, Validators.minLength(2)]
    }),
    apellido: new FormControl('', {
      nonNullable: true,
      validators: [Validators.required, Validators.minLength(2)]
    }),
    email: new FormControl('', {
      nonNullable: true,
      validators: [Validators.required, Validators.email]
    }),
    telefono: new FormControl('', {
      nonNullable: true,
      validators: [Validators.required, Validators.pattern('^[0-9]{9}$')]
    }),
    sexo: new FormControl('', {
      nonNullable: true,
      validators: [Validators.required]
    }),
    especialidad: new FormControl('', {
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
    })
  });

  cargarEspecialidades(): void {
    this.especialidadService.listarEspecialidades().subscribe({
      next: (data) => {
        this.especialidades = data;
      },
      error: (err) => {
        console.error('Error al cargar especialidades:', err);
        Swal.fire({
          title: 'Error',
          text: 'No se pudieron cargar las especialidades',
          icon: 'error',
          confirmButtonText: 'Aceptar'
        });
      }
    });
  }

  onSubmit(form: any): void {
    if (this.doctorForm.invalid) {
      this.doctorForm.markAllAsTouched();
      return;
    }
    if (!this.confirmarPassword()) {
      Swal.fire({
        title: 'Error',
        text: 'Las contraseñas no coinciden',
        icon: 'error',
        confirmButtonText: 'Aceptar'
      });
      return;
    }

    this.isLoading = true;

    const doctorData = {
      nombre: form.nombre,
      apellido: form.apellido,
      email: form.email,
      password: form.password,
      telefono: form.telefono,
      sexo: form.sexo,
      especialidad: form.especialidad
    };

    this.doctorService.crearDoctor(doctorData).subscribe({
      next: (response) => {
        this.isLoading = false;
        Swal.fire({
          title: '¡Registro Exitoso!',
          text: 'El doctor ha sido registrado correctamente.',
          icon: 'success',
          confirmButtonText: 'Aceptar'
        }).then(() => {
          this.doctorForm.reset();
        });
      },
      error: (err) => {
        this.isLoading = false;
        console.error('Error al registrar doctor:', err);
        Swal.fire({
          title: 'Error',
          text: err.error?.message || 'No se pudo registrar el doctor',
          icon: 'error',
          confirmButtonText: 'Aceptar'
        });
      }
    });
  }

  confirmarPassword(): boolean {
    const password = this.doctorForm.get('password')?.value;
    const confirmPassword = this.doctorForm.get('confirmPassword')?.value;
    return password === confirmPassword;
  }
}
