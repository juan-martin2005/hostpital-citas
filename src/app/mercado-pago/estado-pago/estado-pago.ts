import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { MercadoPagoStatusService } from '../service/service-status';
import { CitaMedicaService } from '../../core/services/cita-medica/cita-medica';

@Component({
  selector: 'app-estado-pago',
  imports: [],
  templateUrl: './estado-pago.html',
  styleUrl: './estado-pago.css'
})
export class EstadoPago {

  cuentaRegresiva: number = 10;
  citaReservada: any ={}
  constructor(
    private mercadoPagoStatus: MercadoPagoStatusService,
    private route: ActivatedRoute,
    private router: Router,
    private citaService: CitaMedicaService
    ){}

  ngOnInit(){
    this.route.queryParamMap.subscribe(params => {
      const paymentId = params.get('paymentId') || '';
      const status = params.get('status') || '';
      this.mercadoPagoStatus.statusBrick(paymentId);
      this.regresiva();
    });
  }
  ngOnDestroy(): void {
    this.mercadoPagoStatus.destruirInstance()
  }

  regresiva(){
    const interval = setInterval(() => {
      this.cuentaRegresiva--;
      if(this.cuentaRegresiva === 0){
        clearInterval(interval);
        this.router.navigate(['/inicio/paciente/agedar-cita']);
      }
    }, 1000);
  }

  registrarCita(status: string){
    if(status === 'approved'){

      this.citaService.reservarCitaMedica(this.citaReservada).subscribe({
        next: (response) => {

        },
        error: (error) => {

        }
      });
    }
  }
}
