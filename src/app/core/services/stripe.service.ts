import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { loadStripe, Stripe, StripeElements } from '@stripe/stripe-js';
import { environment } from 'src/environments/environment';
import { BasketService } from './basket.service';
import { Basket } from '../models/basket.model';
import { firstValueFrom, map } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class StripeService {

  private stripePromise?: Promise<Stripe | null>
  private stripeElements?: StripeElements
  // private addressElement?: StripeAddressElement

  constructor(private http: HttpClient, private basketService: BasketService) {
    this.stripePromise = loadStripe(environment.stripePublicKey)
   }

   getStripeInstance() {
    return this.stripePromise
   }

   async initalizeStripeElements() {
    if (!this.stripeElements) {
      const stripe = await this.getStripeInstance()
      if (stripe) {
        const basket = await firstValueFrom(this.createOrUpdatePaymentIntent())
        this.stripeElements = stripe.elements({ clientSecret: basket.clientSecrect, appearance: { labels: 'floating' } })
      } else {
        throw new Error('Stripe has not beeen loaded.')
      }
    }
    return this.stripeElements
   }

  //  async createAddressElement() {
  //   if (!this.addressElement) {
  //     const elements = await this.initalizeStripeElements()
  //     if (elements) {
  //       const options: StripeAddressElementOptions = {
  //         mode: 'shipping'
  //       } 
  //       this.addressElement = elements.create('address', options)
  //     }else {
  //       throw new Error('Element instance has not been loaded.')
  //     }
  //   }
  //   return this.addressElement
  //  }

   createOrUpdatePaymentIntent() {
    const basket = this.basketService.getCurrentBasketValue()
    if (!basket) throw new Error('Problem with your basket.')
    return this.http.post<Basket>(`${environment.baseAPIUrl}/api/Payments/${basket.id}`, {}).pipe(
      map((basket) => {
        this.basketService.setBasket(basket)
        return basket
      })
    )
  }
}
