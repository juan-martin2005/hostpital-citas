import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { MercadoPagoStatusService } from '../service/service-status';
import { CitaMedicaService } from '../../core/services/cita-medica/cita-medica';
import Swal from 'sweetalert2';

interface CitaMedicaEntity{
  idDoctor?: number;
  idHorario?: number;
}

@Component({
  selector: 'app-estado-pago',
  imports: [],
  templateUrl: './estado-pago.html',
  styleUrl: './estado-pago.css'
})
export class EstadoPago {

  cuentaRegresiva: number = 5;
  citaReservada: CitaMedicaEntity ={}
  constructor(
    private mercadoPagoStatus: MercadoPagoStatusService,
    private route: ActivatedRoute,
    private router: Router,
    private citaService: CitaMedicaService
    ){}

  ngOnInit(){
    this.registrarCita();
  }
  ngOnDestroy(): void {
    this.mercadoPagoStatus.destruirInstance()
  }

  regresiva(){
    const interval = setInterval(() => {
      this.cuentaRegresiva--;
      if(this.cuentaRegresiva === 0){
        clearInterval(interval);
        this.router.navigate(['/inicio/paciente/agendar-cita']);
        Swal.fire({
          icon: 'success',
          title: 'Cita reservada con éxito',
        })
      }
    }, 1000);
  }

  registrarCita(){
    this.route.queryParamMap.subscribe(params => {
      const paymentId = params.get('paymentId') || '';
      const status = params.get('status') || '';
      this.mercadoPagoStatus.statusBrick(paymentId);

      if(status === 'approved'){
        this.citaReservada.idDoctor = Number(params.get('doctorId'));
        this.citaReservada.idHorario = Number(params.get('horarioId'));
        console.log(this.citaReservada);
        this.citaService.reservarCitaMedica(this.citaReservada).subscribe({
          next: (response) => {
            this.regresiva();
          },
          error: (error) => {
            Swal.fire({
              icon: 'error',
              title: 'Error al reservar la cita',
              text: 'Ha ocurrido un error inesperado.',
            })
            return
          }
        });
      }
    });

  }
}
