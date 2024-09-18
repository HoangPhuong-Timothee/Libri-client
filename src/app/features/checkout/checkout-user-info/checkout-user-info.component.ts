import { Component, Input } from '@angular/core';
import { FormGroup } from '@angular/forms';

@Component({
  selector: 'app-checkout-user-info',
  templateUrl: './checkout-user-info.component.html',
  styleUrls: ['./checkout-user-info.component.css']
})
export class CheckoutUserInfoComponent {

  @Input() checkoutForm?: FormGroup

  constructor() { }

}
