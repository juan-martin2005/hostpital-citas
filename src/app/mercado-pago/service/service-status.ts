import { Injectable } from '@angular/core';
import { loadMercadoPago } from '@mercadopago/sdk-js';

declare var window: any;

@Injectable({
  providedIn: 'root'
})
export class MercadoPagoStatusService {
  private readonly publicKey = 'TEST-64e4aba6-e8ce-47ca-b26d-27d9a70ffc59';
  private mp: any;

  public async statusBrick(paymentId: string){
    await loadMercadoPago();
    this.mp = new window.MercadoPago(this.publicKey, {
      locale: 'es-PE'
    });
    const bricksBuilder = this.mp.bricks();
    const renderStatusScreenBrick = async (bricksBuilder: any) => {
    const settings = {
      initialization: {
        paymentId: paymentId, // id de pago para mostrar el estado
      },
      callbacks: {
        onReady: () => {
          /*
            Callback llamado cuando Brick está listo.
            Aquí puede ocultar cargamentos de su sitio, por ejemplo.
          */
        },
        onError: (error: any) => {
          // callback llamado solicitada para todos los casos de error de Brick
          console.error(error);
        },
      },
      };
      window.statusScreenBrickController = await bricksBuilder.create(
        'statusScreen',
        'statusScreenBrick_container',
        settings,
      );
    };
    renderStatusScreenBrick(bricksBuilder);
  }

  destruirInstance(){
    if (window.statusScreenBrickController) {
      window.statusScreenBrickController.unmount();
    }
  }
}
