import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CheckoutRoutingModule } from './checkout-routing.module';
import { CheckoutDeliveryComponent } from './checkout-delivery/checkout-delivery.component';
import { CheckoutReviewComponent } from './checkout-review/checkout-review.component';
import { CheckoutSuccessComponent } from './checkout-success/checkout-success.component';
import { CheckoutComponent } from './checkout.component';
import { RouterModule } from '@angular/router';
import { SharedModule } from 'src/app/shared/shared.module';
import { CheckoutUserInfoComponent } from './checkout-user-info/checkout-user-info.component';
import { CheckoutPaymentComponent } from './checkout-payment/checkout-payment.component';

@NgModule({
  declarations: [
    CheckoutDeliveryComponent,
    CheckoutReviewComponent,
    CheckoutSuccessComponent,
    CheckoutComponent,
    CheckoutUserInfoComponent,
    CheckoutPaymentComponent,
  ],
  imports: [
    CommonModule,
    CheckoutRoutingModule,
    RouterModule,
    SharedModule,
  ]
})
export class CheckoutModule { }
