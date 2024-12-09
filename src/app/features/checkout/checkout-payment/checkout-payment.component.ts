import { Component, Input } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { Address } from 'src/app/core/models/address.model';
import { Basket } from 'src/app/core/models/basket.model';
import { BasketService } from 'src/app/core/services/basket.service';
import { CheckoutService } from 'src/app/core/services/checkout.service';

@Component({
  selector: 'app-checkout-payment',
  templateUrl: './checkout-payment.component.html',
  styleUrls: ['./checkout-payment.component.css']
})
export class CheckoutPaymentComponent {

  @Input() checkoutForm?: FormGroup

  constructor(
    private basketService: BasketService,
    private checkoutService: CheckoutService,
    private toastr: ToastrService,
    private router: Router
  ) { }

  createOrder() {
    // const basket = this.basketService.getCurrentBasketValue()
    // if (!basket) {
    //   return
    // }
    // const createOrder = this.getCreateOrder(basket)
    // if (!createOrder) {
    //   return
    // }
    // this.checkoutService.createOrder(createOrder).subscribe({
    //   next: order => {
    //     this.toastr.success("Đặt đơn sách thành công")
    //     this.basketService.deleteLocalBasket()
    //     this.basketService.deleteBasket(basket)
    //     const navigationExtras: NavigationExtras = { state: order }
    //     this.router.navigate(['checkout/order-success'], navigationExtras)
    //   }
    // })
  }

  private getCreateOrder(basket: Basket) {
    const dmId = this.checkoutForm?.get('deliveryForm')?.get('deliveryMethod')?.value
    const shippingAddress = this.checkoutForm?.get('userInfoForm')?.value as Address
    if (!dmId || !shippingAddress) {
      return
    }
    return {
      basketId: basket.id,
      deliveryMethodId: dmId,
      shippingAddress: shippingAddress
    }
  }

}
