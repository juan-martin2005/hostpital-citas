import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { loadMercadoPago } from '@mercadopago/sdk-js';
import { Observable } from 'rxjs';

declare var window: any;

@Injectable({
  providedIn: 'root'
})
export class MercadoPagoBrickService {

  private readonly publicKey = 'TEST-64e4aba6-e8ce-47ca-b26d-27d9a70ffc59';
  private readonly apiUrl = 'http://localhost:8080/api/mercado-pago';
  private mp: any;

  constructor(private http: HttpClient) { }
  getPrefenceId(): Observable<any>{
    return this.http.post<any>(`${this.apiUrl}/proceso_pago`, {})
  }

  public async loadMpBrick(preference: string) {
    await loadMercadoPago();
    this.mp = new window.MercadoPago(this.publicKey, {
      locale: 'es-PE'
    });
    const bricksBuilder = this.mp.bricks();
    const renderPaymentBrick  = async (bricksBuilder: any) => {
      const settings = {
        initialization: {
          preferenceId: preference,
          amount: 100, // monto total a pagar
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
            console.log(formData)
            // callback llamado al hacer clic en el botón enviar datos
            return new Promise<void>((resolve, reject) => {
              fetch(`${this.apiUrl}/process_payment`, {
                method: 'POST',
                headers: {
                  'Content-Type': 'application/json',
                },
                body: JSON.stringify(formData),
              })
                .then((response) => {

                  // recibir el resultado del pago
                  resolve();
                })
                .catch((error) => {
                  // manejar la respuesta de error al intentar crear el pago
                  console.error(error)
                  reject();
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
    renderPaymentBrick (bricksBuilder);
  }
}
