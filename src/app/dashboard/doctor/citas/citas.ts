import { Component, NgModule } from '@angular/core';
import { CommonModule, DatePipe, NgClass } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { NgxPaginationModule } from 'ngx-pagination';
import { CitaMedicaService } from '../../../core/services/cita-medica/cita-medica';

interface PacienteEntity {
  id?: number;
  dniPaciente?: string;
  emailPaciente?: string;
  nombrePaciente?: string;
  apellidoPaciente?: string;
  telefonoPaciente?: string;
  sexoPaciente?: string;
  edadPaciente?: number;
  horario?: HorarioEntity;
}
interface HorarioEntity {
  id?: number;
  fecha?: string;
  horaInicio?: string;
  horaFin?: string;
  estado?: string;
}

@Component({
  selector: 'app-citas',
  imports: [NgClass, DatePipe, FormsModule, NgxPaginationModule ],
  templateUrl: './citas.html',
  styleUrl: './citas.css'
})
export class Citas {

  page!: number;
  today = new Date();
  currentMonth = new Date(this.today.getFullYear(), this.today.getMonth(), 1);
  selectedDay: Date | null = null;
  pacSeleccionado: PacienteEntity | null = null;
  pacientes : PacienteEntity[] = [];
  query: string = '';

  constructor(private citaService: CitaMedicaService){
    this.listarPacientes();
  }

  listarPacientes() {
    this.citaService.listarCitasPaciente().subscribe({
      next: (response) => {
        this.pacientes = response;
      }
    })
  }

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
    !this.citaPendientes.length ? this.pacSeleccionado = null: ''
  }

  get citaPendientes() {
    console.log(this.pacientes)
    if (!this.selectedDay) return [];
    const fechaSeleccionada = this.toYMD(this.selectedDay);
    return this.pacientes
      .map(p => ({ ...p || [] }))
      .filter(d => d.horario?.fecha === fechaSeleccionada)
      .filter(d => (d.nombrePaciente + ' ' + d.dniPaciente).toLowerCase().includes(this.query.toLowerCase()));
  }

  hasCitaPendiente(day: Date) {
    return this.pacientes.some(p => p.horario?.fecha === this.toYMD(day));
  }
}
