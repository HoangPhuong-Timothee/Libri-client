import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { UserService } from 'src/app/core/services/user.service';

@Component({
  selector: 'app-checkout',
  templateUrl: './checkout.component.html',
  styleUrls: ['./checkout.component.css']
})
export class CheckoutComponent implements OnInit {

  constructor(
    private fb: FormBuilder,
    private userService: UserService
  ) { }

  checkoutForm = this.fb.group({
    userInfoForm: this.fb.group({
      fullName: ['', Validators.required],
      street: ['', Validators.required],
      ward: ['', Validators.required],
      district: ['', Validators.required],
      city: ['', Validators.required],
      postalCode: ['', Validators.required]
    }),
    deliveryForm: this.fb.group({
      deliveryMethod: ['', Validators.required]
    }),
    paymentForm: this.fb.group({
      nameOnCard: ['', Validators.required]
    })
  })

  ngOnInit(): void {
    this.getUserInfoFormValue()
  }

  getUserInfoFormValue() {
    this.userService.getUserAddress().subscribe({
      next: userInfo => {
        userInfo && this.checkoutForm.get('userInfoForm')?.patchValue(userInfo)
      }
    })
  }

}
