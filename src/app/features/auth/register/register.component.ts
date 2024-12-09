import { Component } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { RegisterRequest } from 'src/app/core/models/auth.model';
import { AuthService } from 'src/app/core/services/auth.service';
import { validateMatchValues } from 'src/app/shared/helpers/validates/validate-auth-inputs';
import { validateEmailExist } from 'src/app/shared/helpers/validates/validate-exist';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css'],
})
export class RegisterComponent {

  errors: string[] | null = null
  // maxDate!: Date

  passwordVisible = false
  confirmPasswordVisible = false

  constructor(
    private fb: FormBuilder,
    private authService: AuthService,
    private router: Router,
    private toastr: ToastrService
  ) {}

  // ngOnInit(): void {
  //   this.maxDate = new Date()
  //   this.maxDate.setFullYear(this.maxDate.getFullYear() - 18)
  // }

  passwordRegex =
    /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{6,}$/;

  registerForm = this.fb.group({
    username: ['', Validators.required],
    email: ['', [Validators.required, Validators.email], [validateEmailExist(this.authService)]],
    password: ['', [Validators.required, Validators.pattern(this.passwordRegex)]],
    confirmPassword: ['', [Validators.required, validateMatchValues('password')]],
    phoneNumber: ['', Validators.required],
    gender: ['male'],
    dateOfBirth: ['', Validators.required]
  })

  onRegister() {
    var registerRequest = this.registerForm.value as RegisterRequest
    this.authService.register(registerRequest).subscribe({
      next: () => {
        console.log(this.registerForm.value)
        this.toastr.success('Đăng ký tài khoản thành công.');
        this.router.navigateByUrl('/login');
      },
      error: (error) => {
        this.errors = error.errors
        this.toastr.error('Có lỗi xảy ra trong quá trình đăng ký!');
      }
    })
  }

  togglePasswordVisibility(): void {
    this.passwordVisible = !this.passwordVisible
  }

  toggleConfirmPasswordVisibility(): void {
    this.confirmPasswordVisible = !this.confirmPasswordVisible
  }

}
