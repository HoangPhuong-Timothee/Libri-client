import { StepperSelectionEvent } from '@angular/cdk/stepper';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { MatCheckboxChange } from '@angular/material/checkbox';
import { ToastrService } from 'ngx-toastr';
import { Address } from 'src/app/core/models/address.model';
import { BasketService } from 'src/app/core/services/basket.service';
import { UserService } from 'src/app/core/services/user.service';

@Component({
  selector: 'app-checkout',
  templateUrl: './checkout.component.html',
  styleUrls: ['./checkout.component.css']
})
export class CheckoutComponent implements OnInit {

  saveInfo = false

  constructor(private fb: FormBuilder, private userService: UserService, private basketService: BasketService, private toastr: ToastrService) { }

  ngOnInit() {
    this.getUserInfoFormValue()
  }

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

  onSaveUserInfoCheckboxChange(event: MatCheckboxChange) {
    this.saveInfo = event.checked
  }

  onStepChange(event: StepperSelectionEvent) {
    if (event.selectedIndex === 1) {
      if (this.saveInfo) {
        const userInfo: Address = this.checkoutForm.get('userInfoForm')?.value as Address
        this.userService.modifyUserAddress(userInfo).subscribe({
          next: () => {
            this.toastr.success('Đã lưu thông tin làm mặc định.')
            this.checkoutForm.get('userInfoForm')?.reset(this.checkoutForm.get('userInfoForm')?.value)
          }
        })
      }
    }
  }

  getUserInfoFormValue() {
    this.userService.getUserAddress().subscribe({
      next: userInfo => {
        userInfo && this.checkoutForm.get('userInfoForm')?.patchValue(userInfo)
      }
    })
  }
}
