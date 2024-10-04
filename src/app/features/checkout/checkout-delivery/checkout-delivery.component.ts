import { Component, Input, OnInit } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { DeliveryMethod } from 'src/app/core/models/delivery-method.model';
import { BasketService } from 'src/app/core/services/basket.service';
import { DeliveryMethodService } from 'src/app/core/services/delivery-method.service';

@Component({
  selector: 'app-checkout-delivery',
  templateUrl: './checkout-delivery.component.html',
  styleUrls: ['./checkout-delivery.component.css']
})
export class CheckoutDeliveryComponent implements OnInit {

  @Input() checkoutForm?: FormGroup
  deliveryMethods: DeliveryMethod[] = []

  constructor(public basketService: BasketService, public deliveryMethodService: DeliveryMethodService) { }

  ngOnInit(): void {
    this.deliveryMethodService.getAllDeliveryMethods().subscribe({
      next: response => this.deliveryMethods = response
    })
  }

  setDeliveryPrice(deliveryMethod: DeliveryMethod) {
    this.basketService.setDeliveryPrice(deliveryMethod)
  }
}
