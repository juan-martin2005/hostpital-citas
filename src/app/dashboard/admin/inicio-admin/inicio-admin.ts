import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ChartjsModule } from '@coreui/angular-chartjs';
import { DashboardService } from '../../../core/services/dashboard/dashboard';
import { Chart, ChartConfiguration, registerables } from 'chart.js';

Chart.register(...registerables);

@Component({
  selector: 'app-inicio-admin',
  standalone: true,
  imports: [CommonModule, ChartjsModule],
  templateUrl: './inicio-admin.html',
  styleUrl: './inicio-admin.css'
})
export class InicioAdmin implements OnInit {
  loading = true;
  totales: any = {};
  ultimosPacientes: any[] = [];
  citasPorEstado: { [estado: string]: number } = {};
  citasPorEspecialidad: { [especialidad: string]: number } = {};

  chartEstado: ChartConfiguration<'doughnut'> | null = null;
  chartEspecialidad: ChartConfiguration<'bar'> | null = null;

  constructor(private dashboardService: DashboardService) {}

  ngOnInit() {
    this.cargarDashboard();
  }

  cargarDashboard() {
    this.loading = true;
    this.dashboardService.getTotals().subscribe(tot => this.totales = tot);
    this.dashboardService.getLatestPacientes(5).subscribe(pac => this.ultimosPacientes = pac);
    this.dashboardService.getCitasByEstado().subscribe(data => {
      this.citasPorEstado = data;
      this.chartEstado = {
        type: 'doughnut',
        data: {
          labels: Object.keys(data),
          datasets: [{
            data: Object.values(data),
            backgroundColor: ['#ffc107', '#28a745', '#dc3545'],
            label: 'Citas por Estado'
          }]
        },
        options: {
          responsive: true,
          plugins: { legend: { position: 'bottom' } }
        }
      };
    });
    this.dashboardService.getCitasByEspecialidad().subscribe(data => {
      this.citasPorEspecialidad = data;
      this.chartEspecialidad = {
        type: 'bar',
        data: {
          labels: Object.keys(data),
          datasets: [{
            data: Object.values(data),
            backgroundColor: '#007bff',
            label: 'Citas por Especialidad'
          }]
        },
        options: {
          responsive: true,
          plugins: { legend: { display: false } }
        }
      };
    });
    this.loading = false;
  }
}
