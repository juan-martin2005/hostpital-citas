import { Injectable } from '@angular/core';
import { loadMercadoPago } from '@mercadopago/sdk-js';

declare var window: any;

@Injectable({
  providedIn: 'root'
})
export class MercadoPagoService {

  private readonly publicKey = 'TEST-64e4aba6-e8ce-47ca-b26d-27d9a70ffc59';
  private readonly apiUrl = '';
  private mp : any;
  
  constructor(){}
  
  public async loadMp(amount: string){
    await loadMercadoPago();
    this.mp = new window.MercadoPago(this.publicKey, {
      locale: 'es-PE'
    });

    const cardFom = this.mp.cardForm({
      amount: amount,
      iframe: true,
      form: {
        id: "form-checkout",
        cardNumber: {
          id: "form-checkout__cardNumber",
          placeholder: "Numero de tarjeta"
        },
        expirationDate: {
          id: "form-checkout__expirationDate",
          placeholder: "MM/YY",
        },
        securityCode: {
          id: "form-checkout__securityCode",
          placeholder: "CVV"
        },
        cardholderName: {
          id: "form-checkout__cardholderName",
          placeholder: "Nombre del titular",
        },
        issuer: {
          id: "form-checkout__issuer",
          placeholder: "Banco"
        },
        installments: {
          id: "form-checkout__installments",
          placeholder: "Cuotas",
        },
        identificationType: {
          id: "form-checkout__identificationType",
          placeholder: "Tipo de documento",
        },
        identificationNumber: {
          id: "form-checkout__identificationNumber",
          placeholder: "Número de documento",
        },
        cardholderEmail: {
          id: "form-checkout__cardholderEmail",
          placeholder: "Email",
        },
      },
      callbacks: {
        onFormMounted: (error: Error) => {
          if (error) {

            return console.warn("Hubo un error en el formulario:", error);
          }
        },
        onSubmit: (event: Event) => {
          event.preventDefault();

          const{
            paymentMethodId: payment_method_id,
            issuerId: issuer_id,
            cardholderEmail: email,
            amount,
            token,
            installments,
            identificationNumber,
            identificationType,
          } = cardFom.getCardFormData();

          fetch(this.apiUrl, {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({
              token,
              issuer_id,
              payment_method_id,
              transaction_amount: Number(amount),
              installments: Number(installments),
              description: "Product Description",
              payer: {
                email,
                identification: {
                  type: identificationType,
                  number: identificationNumber,
                },
              }
            }),
          })
          .then(response => {
            if (!response.ok) {
              throw new Error("Error la procesar el pago");
            }
            return response.json();
          })
          .then(data => console.log("Payment processed:", data))
          .catch(error => console.error("Payment error:", error));
        },
        onFetching: (resource: any) =>{
          console.log("Fetching resource:", resource);
        }
      }
    })
  }
}
