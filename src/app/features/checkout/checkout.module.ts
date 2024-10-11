import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { CheckoutRoutingModule } from './checkout-routing.module';
import { CheckoutUserInfoComponent } from './checkout-user-info/checkout-user-info.component';
import { CheckoutDeliveryComponent } from './checkout-delivery/checkout-delivery.component';
import { CheckoutPaymentComponent } from './checkout-payment/checkout-payment.component';
import { CheckoutSuccessComponent } from './checkout-success/checkout-success.component';
import { CheckoutComponent } from './checkout.component';
import { SharedModule } from 'src/app/shared/shared.module';
import { CheckoutReviewComponent } from './checkout-review/checkout-review.component';


@NgModule({
  declarations: [
    CheckoutUserInfoComponent,
    CheckoutDeliveryComponent,
    CheckoutPaymentComponent,
    CheckoutSuccessComponent,
    CheckoutComponent,
    CheckoutReviewComponent
  ],
  imports: [
    CommonModule,
    CheckoutRoutingModule,
    SharedModule
  ]
})
export class CheckoutModule { }
