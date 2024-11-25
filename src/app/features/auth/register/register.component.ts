import { Component, OnInit } from '@angular/core';
import { AbstractControl, AsyncValidatorFn, FormBuilder, ValidatorFn, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { debounceTime, finalize, map, switchMap, take } from 'rxjs';
import { AuthService } from 'src/app/core/services/auth.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css'],
})
export class RegisterComponent implements OnInit {

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

  ngOnInit(): void {
    // this.maxDate = new Date()
    // this.maxDate.setFullYear(this.maxDate.getFullYear() - 18)
  }

  passwordRegex =
    /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{6,}$/;

  registerForm = this.fb.group({
    username: ['', Validators.required],
    email: ['', [Validators.required, Validators.email], [this.validateEmailNotTaken()]],
    password: ['', [Validators.required, Validators.pattern(this.passwordRegex)]],
    confirmPassword: ['', [Validators.required, this.validateMatchValues('password')]],
    phoneNumber: ['', Validators.required],
    gender: ['male'],
    dateOfBirth: ['', Validators.required]
  })

  onRegister() {
    this.authService.register(this.registerForm.value).subscribe({
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

  validateEmailNotTaken(): AsyncValidatorFn {
    return (control: AbstractControl) => {
      return control.valueChanges.pipe(
        debounceTime(1000),
        take(1),
        switchMap(() => {
          return this.authService.checkEmailExists(control.value).pipe(
            map((result) => (result ? { emailExists: true } : null)),
            finalize(() => control.markAllAsTouched())
          )
        })
      )
    }
  }

  validateMatchValues(matchTo: string): ValidatorFn {
    return (control: AbstractControl) => {
      const parent = control?.parent
      const matchControl = parent ? parent.get(matchTo) : null
      if (!parent || !matchControl) {
        return null
      }
      return control.value === matchControl.value ? null : { isMatching: true }
    }
  }

  togglePasswordVisibility(): void {
    this.passwordVisible = !this.passwordVisible
  }

  toggleConfirmPasswordVisibility(): void {
    this.confirmPasswordVisible = !this.confirmPasswordVisible
  }

}
