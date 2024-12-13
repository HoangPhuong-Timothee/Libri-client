import { Component, ElementRef, Input, OnInit, ViewChild } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { NavigationExtras, Router } from '@angular/router';
import {
  loadStripe,
  Stripe,
  StripeCardCvcElement,
  StripeCardExpiryElement,
  StripeCardNumberElement
} from '@stripe/stripe-js';
import { ToastrService } from 'ngx-toastr';
import { firstValueFrom } from 'rxjs';
import { Address } from 'src/app/core/models/address.model';
import { Basket } from 'src/app/core/models/basket.model';
import { CreateOrderRequest } from 'src/app/core/models/order.model';
import { BasketService } from 'src/app/core/services/basket.service';
import { CheckoutService } from 'src/app/core/services/checkout.service';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-checkout-payment',
  templateUrl: './checkout-payment.component.html',
  styleUrls: ['./checkout-payment.component.css']
})
export class CheckoutPaymentComponent implements OnInit {

  @Input() checkoutForm?: FormGroup
  @ViewChild('cardNumber') cardNumberElement?: ElementRef
  @ViewChild('cardExpiry') cardExpiryElement?: ElementRef
  @ViewChild('cardCVC') cardCVCElement?: ElementRef
  stripe?: Stripe | null
  cardNumber?: StripeCardNumberElement
  cardExpiry?: StripeCardExpiryElement
  cardCVC?: StripeCardCvcElement
  cardErrors: any
  loading = false

  constructor(
    private basketService: BasketService,
    private checkoutService: CheckoutService,
    private toastr: ToastrService,
    private router: Router
  ) { }

  ngOnInit(): void {
    loadStripe(environment.stripePublicKey).then(stripe => {
      this.stripe = stripe
      const stripeElements = stripe?.elements()
      if (stripeElements) {
        this.cardNumber = stripeElements.create('cardNumber')
        this.cardNumber.mount(this.cardNumberElement?.nativeElement)
        this.cardNumber.on('change', event => {
          if (event.error) {
            this.cardErrors = event.error.message
          } else {
            this.cardErrors = null
          }
        })

        this.cardExpiry = stripeElements.create('cardExpiry')
        this.cardExpiry.mount(this.cardExpiryElement?.nativeElement)
        this.cardExpiry.on('change', event => {
          if (event.error) {
            this.cardErrors = event.error.message
          } else {
            this.cardErrors = null
          }
        })

        this.cardCVC = stripeElements.create('cardCvc')
        this.cardCVC.mount(this.cardCVCElement?.nativeElement)
        this.cardCVC.on('change', event => {
          if (event.error) {
            this.cardErrors = event.error.message
          } else {
            this.cardErrors = null
          }
        })
      }
    })
  }

  async submitOrder() {
    this.loading = true
    const basket = this.basketService.getCurrentBasketValue()
    if (!basket) {
    throw new Error('Không thể lấy thông tin giò hàng')
    }
    try {
      const createdOrder = await this.createOrder(basket)
      const paymentResult = await this.confirmPaymentWithStripe(basket)
      if (paymentResult.paymentIntent) {
        this.basketService.deleteBasket(basket)
        const navigationExtras: NavigationExtras = { state: createdOrder }
        this.router.navigate(['checkout/success'], navigationExtras)
      } else {
        this.toastr.error(paymentResult.error.message)
      }
    } catch (error: any) {
      console.log("Có lỗi: ", error)
      this.toastr.error(error.message)
    } finally {
      this.loading = false
    }
  }

  private async confirmPaymentWithStripe(basket: Basket | null) {
    if (!basket) {
      throw new Error('Giỏ hàng rỗng')
    }
    const result = this.stripe?.confirmCardPayment(basket.clientSecret!, {
      payment_method: {
        card: this.cardNumber!,
        billing_details: {
          name: this.checkoutForm?.get('paymentForm')?.get('nameOnCard')?.value
        }
      }
    })
    if (!result) {
      throw new Error('Có lỗi xảy ra khi thực hiện thanh toán qua cổng stripe')
    }
    return result
  }

  private async createOrder(basket: Basket | null) {
    if (!basket) {
      throw new Error('Giỏ hàng rỗng')
    }
    const orderToCreate = this.getOrderToCreate()
    return firstValueFrom(this.checkoutService.createOrder(orderToCreate, basket.id))
  }

  private getOrderToCreate():  CreateOrderRequest {
    const deliveryMethodId = this.checkoutForm?.get('deliveryForm')?.get('deliveryMethod')?.value
    const shippingAddress = this.checkoutForm?.get('userInfoForm')?.value as Address
    if (!deliveryMethodId || !shippingAddress) {
      throw new Error('Có lỗi xảy ra khi thực hiện thanh toán giỏ hàng')
    }
    return {
      deliveryMethodId: deliveryMethodId,
      shippingAddress: shippingAddress
    }
  }

}
