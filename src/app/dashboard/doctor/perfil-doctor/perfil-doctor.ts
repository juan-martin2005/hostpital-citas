import { Component } from '@angular/core';
import { DoctorService } from '../../../core/services/doctor/doctor';
import Swal from 'sweetalert2';
import { NgClass } from '@angular/common';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';

interface InfoDoctor {
  id?: number;
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
  selector: 'app-perfil-doctor',
  imports: [NgClass, ReactiveFormsModule],
  templateUrl: './perfil-doctor.html',
  styleUrl: './perfil-doctor.css'
})
export class PerfilDoctor {

  infoDoctor: InfoDoctor = {};
  cambiarPassword: boolean = false;
  seePassword: boolean = false;
  seeConfirmPassword: boolean = false;
  constructor(private doctorService: DoctorService){}

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
    this.doctorService.obtenerPerfilDoctor().subscribe({
      next: (info) => {
        this.infoDoctor = info;
        this.infoDoctor.sexo = info.sexo === 'M' ? 'Masculino' : 'Femenino';
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

    this.doctorService.actualizarPassword(newPassword).subscribe({
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

  confirmarPassword():boolean {
    const password = this.form.get('newPassword')?.value;
    const confirmPassword = this.form.get('confirmPassword')?.value;
    return password === confirmPassword;
  }

  cancelar(){
    this.cambiarPassword = false
    this.form.reset()
  }

}
