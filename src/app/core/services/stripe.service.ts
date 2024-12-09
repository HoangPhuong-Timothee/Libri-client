import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { loadStripe, Stripe, StripeElements } from '@stripe/stripe-js';
import { firstValueFrom, map } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Basket } from '../models/basket.model';
import { BasketService } from './basket.service';

@Injectable({
  providedIn: 'root'
})
export class StripeService {

  stripePromise?: Promise<Stripe | null>
  stripeElements?: StripeElements

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
        throw new Error('Không tải được dữ liệu từ Stripe.')
      }
    }
    return this.stripeElements
   }

   createOrUpdatePaymentIntent() {
    const basket = this.basketService.getCurrentBasketValue()
    if (!basket) throw new Error('Có lỗi ở giỏ hàng.')
    return this.http.post<Basket>(`${environment.baseAPIUrl}/api/Payments/${basket.id}`, {}).pipe(
      map((basket) => {
        this.basketService.setBasket(basket)
        return basket
      })
    )
  }
}
