import { Component } from '@angular/core';
import { MercadoPagoService } from './service/service';
import { MercadoPagoBrickService } from './service/service-brick';



@Component({
  selector: 'app-metodo-pago',
  imports: [],
  templateUrl: './metodo-pago.html',
  styleUrl: './metodo-pago.css'
})
export class MetodoPago{

  constructor(private mercadoPagoService: MercadoPagoService, private mercadoPagoBrickService: MercadoPagoBrickService){}
  ngOnInit(){
    this.mercadoPagoBrickService.getPrefenceId().subscribe({
      next: (response) =>{
        console.log(response.id)
        this.mercadoPagoBrickService.loadMpBrick(response.id);
      }
    })
  }
}
