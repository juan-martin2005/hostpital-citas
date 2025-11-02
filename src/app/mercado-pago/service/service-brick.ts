import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { loadMercadoPago } from '@mercadopago/sdk-js';
import { Observable } from 'rxjs';
import { MercadoPagoStatusService } from './service-status';
import { ActivatedRoute, Router } from '@angular/router';

declare var window: any;

@Injectable({
  providedIn: 'root'
})
export class MercadoPagoBrickService {

  private readonly publicKey = 'TEST-64e4aba6-e8ce-47ca-b26d-27d9a70ffc59';
  private readonly apiUrl = 'http://localhost:8080/api/mercado-pago';
  private mp: any;

  constructor(private http: HttpClient, private statusBrinck: MercadoPagoStatusService, private router: Router) { }
  getPrefenceId(): Observable<any> {
    return this.http.post<any>(`${this.apiUrl}/proceso_pago`, {})
  }

  public async loadMpBrick(preference: string) {
    await loadMercadoPago();
    this.mp = new window.MercadoPago(this.publicKey, {
      locale: 'es-PE'
    });
    const bricksBuilder = this.mp.bricks();
    const renderPaymentBrick = async (bricksBuilder: any) => {
      const settings = {
        initialization: {
          preferenceId: preference,
          amount: 150, // monto total a pagar
        },
        customization: {
          visual: {
            style: {
              theme: "default",
            }
          },
          paymentMethods: {
            ticket: "all",
            creditCard: "all",
            prepaidCard: "all",
            debitCard: "all",
            mercadoPago: "all",
            wallet_purchase: "all",
          },
        },
        callbacks: {
          onReady: () => {
            /*
              Callback llamado cuando Brick está listo.
              Aquí puedes ocultar cargamentos de su sitio, por ejemplo.
            */
          },
          onSubmit: (formData: any) => {
            // callback llamado al hacer clic en el botón enviar datos
            return new Promise<void>((resolve, reject) => {
              fetch(`${this.apiUrl}/process_payment`, {
                method: 'POST',
                headers: {
                  'Content-Type': 'application/json',
                },
                body: JSON.stringify(formData.formData),
              })
                .then(response => {
                  // response.ok será 'true' si el status es 2xx (aprobado o pendiente)
                  // y 'false' si es 4xx (rechazado)
                  return response.json().then(data => {
                    if (!response.ok) {
                      // El backend nos envió un error (pago rechazado)
                      throw new Error(data.error || 'El pago fue rechazado.');
                    }
                    return data; // 'data' es nuestro PaymentResponseDto
                  });
                })
                .then((paymentResponse) => {
                  // ¡PAGO PROCESADO!
                  console.log(paymentResponse);

                  this.router.navigate(['/inicio/paciente/estado-pago'], { queryParams: { paymentId: paymentResponse.id , status: paymentResponse.status } });
                  // if (paymentResponse.status === 'approved') {
                  //   // REDIRIGIR A PÁGINA DE ÉXITO
                  //   alert('¡Pago aprobado!');
                  // } else if (paymentResponse.status === 'in_process' || paymentResponse.status === 'pending') {
                  //   // REDIRIGIR A PÁGINA DE PENDIENTE
                  //   // this.router.navigate(['/pago-pendiente']);
                  //   alert('Tu pago está pendiente de aprobación.');
                  // }
                  // resolve();
                })
                .catch((error) => {
                  // manejar la respuesta de error al intentar crear el pago
                  console.error(error);
                  alert(error.message); // Muestra el error
                  reject(error);
                });
            });
          },
          onError: (error: any) => {
            // callback llamado para todos los casos de error de Brick
            console.error(error);
          },
        },
      };
      window.cardPaymentBrickController = await bricksBuilder.create(
        'payment',
        'paymentBrick_container',
        settings,
      );
    };
    renderPaymentBrick(bricksBuilder);
  }

  destruirInstance(){
    // Verifica si el controlador del brick existe en la ventana global
    if (window.cardPaymentBrickController) {

      // Destruye la instancia para liberar memoria
      window.cardPaymentBrickController.unmount();

      console.log('Payment Brick destruido exitosamente.');
    }
  }
}
