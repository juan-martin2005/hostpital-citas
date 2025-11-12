import { Component, NgModule } from '@angular/core';
import { PacienteService } from '../../../core/services/paciente/paciente';
import Swal from 'sweetalert2';
import { NgClass } from '@angular/common';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';

interface InfoPaciente {
  id?: number;
  dni?: string;
  nombre?: string;
  apellido?: string;
  edad?: number;
  sexo?: string;
  fechaNacimiento?: string;
  telefono?: string;
  email?: string;
}

interface CambiarPassword{
  password?: string;
}

@Component({
  selector: 'app-perfil-paciente',
  imports: [NgClass, ReactiveFormsModule],
  templateUrl: './perfil-paciente.html',
  styleUrl: './perfil-paciente.css'
})
export class PerfilPaciente {
  infoPaciente: InfoPaciente = {};

  cambiarPassword: boolean = false;
  seePassword: boolean = false;
  seeConfirmPassword: boolean = false;
  constructor(private pacienteService: PacienteService){}

  form = new FormGroup({
  newPassword: new FormControl('', {
    nonNullable: true,
    validators: [
      Validators.required,
      Validators.minLength(8)
    ]
  }),
  confirmPassword: new FormControl('', {
    nonNullable: true,
    validators: [
      Validators.required,
      Validators.minLength(8)
    ]
    }),
  })


  ngOnInit(){
    this.cargarInfoPaciente();
  }

  cargarInfoPaciente(){
    this.pacienteService.obtenerPerfilPaciente().subscribe({
      next: (info) => {
        this.infoPaciente = info;
        this.infoPaciente.sexo = info.sexo === 'M' ? 'Masculino' : 'Femenino';
      }
    })
  }

  editarPerfil(){
    this.pacienteService.actualizarPaciente(this.infoPaciente).subscribe({
      next: (response) => {
        Swal.fire({
          icon: 'success',
          title: 'Perfil actualizado',
          showConfirmButton: false,
          timer: 1500
        });
        this.cargarInfoPaciente();
      },
      error: (error) => {
        Swal.fire({
          icon: 'error',
          title: 'Error al actualizar el perfil',
          text: error.error.message,
          showConfirmButton: false,
          timer: 1500
        });
      }
    })
  }
  actualizarPassword(){
    if (this.form.invalid) {
      this.form.markAllAsTouched();
      return;
    }

    const newPassword : CambiarPassword = {
      password: this.form.get('newPassword')?.value
    }

    this.pacienteService.actualizarPassword(newPassword).subscribe({
      next: (response) => {
        Swal.fire({
          icon: 'success',
          title: 'Contraseña actualizado',
          showConfirmButton: false,
          timer: 1500
        });
        this.cargarInfoPaciente();
        this.cancelar()
      },
      error: (error) => {
        Swal.fire({
          icon: 'error',
          title: 'Error al actualizar el perfil',
          text: error.error.message,
          showConfirmButton: true,
        });
      }
    })
  }
  togglePasswordVisibility(): void {
    let password = document.getElementById('newPasswordPaciente') as HTMLInputElement
    this.seePassword = !this.seePassword;
    password.type = this.seePassword ? 'text' : 'password';
  }
  toggleConfirmPasswordVisibility(): void {
    let password = document.getElementById('confirPasswordPaciente') as HTMLInputElement
    this.seeConfirmPassword = !this.seeConfirmPassword;
    password.type = this.seeConfirmPassword ? 'text' : 'password';
  }

  confirmarPassword(): boolean {
    const password = document.getElementById('newPasswordPaciente') as HTMLInputElement;
    const confirmPassword = document.getElementById('confirPasswordPaciente')as HTMLInputElement;
    return password.value === confirmPassword.value;
  }

  cancelar(){
    this.cambiarPassword = false
    this.form.reset()
  }
}
