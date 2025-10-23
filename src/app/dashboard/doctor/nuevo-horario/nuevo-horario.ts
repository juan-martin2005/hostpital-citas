import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators, AbstractControl, ValidationErrors, ReactiveFormsModule, FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import Swal from 'sweetalert2';
import {HorarioService} from '../../../core/services/horarios/horario';
import {LoginService} from '../../../core/services/auth/login/login';


interface HorarioFormControls {
  fecha: FormControl<string>;
  horaInicio: FormControl<string>;
  horaFin: FormControl<string>;
}

@Component({
  selector: 'app-nuevo-horario',
  standalone: true,
  imports: [CommonModule, FormsModule, ReactiveFormsModule],
  templateUrl: './nuevo-horario.html',
  styleUrls: ['./nuevo-horario.css']
})
export class NuevoHorario implements OnInit {

  horarioForm = new FormGroup<HorarioFormControls>({
    fecha: new FormControl('', {
      nonNullable: true,
      validators: [Validators.required, this.fechaMinimaValidator]
    }),
    horaInicio: new FormControl('', {
      nonNullable: true,
      validators: [Validators.required, this.horaValidator]
    }),
    horaFin: new FormControl('', {
      nonNullable: true,
      validators: [Validators.required, this.horaValidator]
    }),
  }, { validators: this.horaInicioFinValidator });

  isLoading = false;

  constructor(private horarioService: HorarioService, private loginService: LoginService) {}

  ngOnInit(): void {}


  fechaMinimaValidator(control: AbstractControl): ValidationErrors | null {
    if (!control.value) return null;

    const inputTime = new Date(control.value).getTime();

    const hoy = new Date();
    hoy.setHours(0, 0, 0, 0);

    const manana = new Date(hoy);
    manana.setDate(hoy.getDate() + 0);

    return inputTime >= manana.getTime()
      ? null
      : { fechaInvalida: 'La fecha debe ser el día siguiente o posterior' };
  }


  horaValidator(control: AbstractControl): ValidationErrors | null {
    if (!control.value) return null;

    if (!/^\d{2}:\d{2}$/.test(control.value)) return { formatoInvalido: 'Formato de hora inválido' };

    const [hora, min] = control.value.split(':').map(Number);

    const totalMinutos = hora * 60 + min;

    const minRango = 7 * 60;   // 07:00
    const maxRango = 17 * 60 + 30; // 17:30

    if (totalMinutos < minRango || totalMinutos > maxRango) {
      return { horaFueraRango: 'La hora debe ser entre 07:00 y 17:30' };
    }
    return null;
  }

  horaInicioFinValidator(group: AbstractControl): ValidationErrors | null {
    const horaInicio = group.get('horaInicio')?.value;
    const horaFin = group.get('horaFin')?.value;

    if (!horaInicio || !horaFin) return null;

    const [hiH, hiM] = horaInicio.split(':').map(Number);
    const [hfH, hfM] = horaFin.split(':').map(Number);

    const inicio = hiH * 60 + hiM;
    const fin = hfH * 60 + hfM;

    if (inicio >= fin) {
      return { horaInicioMayorFin: 'La hora de inicio debe ser estrictamente menor que la hora de fin' };
    }

    const diff = fin - inicio;
    if (diff < 30) {
      return { diferenciaMinima: 'La diferencia entre hora inicio y fin debe ser al menos 30 minutos' };
    }

    return null;
  }

  onSubmit(): void {
    if (this.horarioForm.invalid) {
      this.horarioForm.markAllAsTouched();
      return;
    }

    this.isLoading = true;
    const doctorId = this.loginService.getInfoToken()?.id;

    const formValue = this.horarioForm.value;

    const horarioData = {
      fecha: formValue.fecha!,
      horaInicio: formValue.horaInicio!,
      horaFin: formValue.horaFin!,
      doctorId
    };

    this.horarioService.crearHorario(horarioData).subscribe({
      next: () => {
        this.isLoading = false;
        Swal.fire({ title: '¡Horario Registrado!', text: 'El horario ha sido creado correctamente.', icon: 'success', confirmButtonText: 'Aceptar' })
          .then(() => this.horarioForm.reset());
      },
      error: (err) => {
        this.isLoading = false;
        const errorMessage = err.error?.message || 'No se pudo crear el horario';
        Swal.fire({ title: 'Error', text: errorMessage, icon: 'error', confirmButtonText: 'Aceptar' });
      }
    });
  }
}
