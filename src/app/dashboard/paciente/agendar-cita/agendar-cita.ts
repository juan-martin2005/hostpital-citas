import { DatePipe, NgClass } from '@angular/common';
import { Component } from '@angular/core';
import { FormsModule} from '@angular/forms';
import { Router, RouterLink } from "@angular/router";
import { DoctorService } from '../../../core/services/doctor/doctor';
import Swal from 'sweetalert2';
import { NgxPaginationModule } from 'ngx-pagination';


interface DoctorEntity {
  id?: number;
  email?: string;
  nombre?: string;
  apellido?: string;
  telefono?: string;
  sexo?: string;
  especialidad?: string;
  horarios?: HorarioEntity[];
}

interface HorarioEntity {
  id?: number;
  fecha?: string;
  horaInicio?: string;
  horaFin?: string;
  estado?: string;
}

@Component({
  selector: 'app-agendar-cita',
  imports: [FormsModule, NgClass, DatePipe, NgxPaginationModule],
  templateUrl: './agendar-cita.html',
  styleUrl: './agendar-cita.css'
})
export class AgendarCita {

  page!: number;
  today = new Date();
  currentMonth = new Date(this.today.getFullYear(), this.today.getMonth(), 1);
  selectedDay: Date | null = null;
  query: string = '';
  docSeleccionado: DoctorEntity | null= null;
  doctores: DoctorEntity[] = [];
  abreviatura = ''
  constructor(private doctorService: DoctorService, private router: Router) {
    this.listaDoctores();
  }

  listaDoctores() {
    this.doctorService.listarTodosLosDoctores().subscribe({
      next: (response) => {
        this.doctores = response;
      }
    })
  }

  // Verifica si hay doctores disponibles en un día específico
  hasDocDisponible(day: Date) : boolean {
    return this.doctores.some(d => d.horarios?.some(f => f.fecha === this.toYMD(day)));
  }

  // Convierte una fecha a formato 'YYYY-MM-DD'
  toYMD(d: Date): string {
    return d.toISOString().slice(0, 10);
  }

  isBeforeToday(date: Date) {
    return date < this.today;
  }

  isToday(day: Date): boolean {
    return day?.getDate() == this.today.getDate() && day?.getMonth() == this.today.getMonth() && day?.getFullYear() == this.today.getFullYear()
  }

  // Genera la cuadrícula del mes actual
  get monthGrid() {
    const year = this.currentMonth.getFullYear();
    const month = this.currentMonth.getMonth();
    const first = new Date(year, month, 1);
    const last = new Date(year, month + 1, 0);


    const startDay = (first.getDay() + 6) % 7;
    const totalDays = last.getDate();


    const cells: (Date | null)[] = [];
    for (let i = 0; i < startDay; i++) cells.push(null);
    for (let d = 1; d <= totalDays; d++) cells.push(new Date(year, month, d));
    while (cells.length % 7 !== 0) cells.push(null);


    const weeks = [];
    for (let i = 0; i < cells.length; i += 7) weeks.push(cells.slice(i, i + 7));
    return weeks;
  }
  prevMonth() {
    this.currentMonth = new Date(this.currentMonth.getFullYear(), this.currentMonth.getMonth() - 1, 1);
  }

  nextMonth() {
    this.currentMonth = new Date(this.currentMonth.getFullYear(), this.currentMonth.getMonth() + 1, 1);
  }

  selectDay(day: Date | null) {
    if (day) this.selectedDay = day;
    !this.doctorDisponible.length ? this.docSeleccionado = null: ''
  }

  get doctorDisponible() {
    if (!this.selectedDay) return [];
    const fechaSeleccionada = this.toYMD(this.selectedDay);
    return this.doctores
      .map(d => ({ ...d, times: d.horarios?.filter(f => f.fecha === fechaSeleccionada) || [] }))
      .filter(d => d.times.length)
      .filter(d => (d.nombre + ' ' + d.especialidad).toLowerCase().includes(this.query.toLowerCase()));
  }

  reservar(doctor: DoctorEntity, time: HorarioEntity) {
    Swal.fire({
      title: 'Confirmar cita',
      text: `¿Desea reservar una cita con el Dr. ${doctor.nombre} ${doctor.apellido} el ${time.fecha} a las ${time.horaInicio}?`,
      icon: 'question',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Sí, reservar'
    }).then((result) => {
      if (result.isConfirmed) {
        if(time.estado !== 'LIBRE'){
          Swal.fire({
            title: 'El horario no disponible',
            text: 'El horario seleccionado no está disponible.',
            icon: 'error',
          })
          return
        }
        Swal.fire({
          title: 'A un paso para poder hacer tu reserva',
          text: 'Redirigiendo a la página de pago...',
          allowOutsideClick: false,
          didOpen: () => {
            Swal.showLoading();
          }
        })
        setTimeout(() => {
          this.router.navigate(['/inicio/paciente/mercado-pago'], { queryParams: { doctorId: doctor.id, horarioId: time.id }});
          Swal.close();
        }, 1500);
      }
    })
  }
}
