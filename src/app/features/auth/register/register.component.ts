import { Component } from '@angular/core';
import { AbstractControl, AsyncValidatorFn, FormBuilder, FormGroup, ValidationErrors, Validator, ValidatorFn, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { debounceTime, finalize, map, switchMap, take } from 'rxjs';
import { AuthService } from 'src/app/core/services/auth.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent {

  errors: string[] | null = null

  constructor(private fb: FormBuilder, private authService: AuthService, private router: Router, private toastr: ToastrService) { }

  passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{6,}$/;

  registerForm = this.fb.group({
    username: ['', Validators.required],
    email: ['', [Validators.required, Validators.email], [this.validateEmailNotTaken()]],
    password: ['', [Validators.required, Validators.pattern(this.passwordRegex)]],   
    confirmPassword: ['', Validators.required],
    phoneNumber: ['', Validators.required],
    address: ['', Validators.required]
  }, { validators: this.validatePasswordMatch });

  onRegister() {
    this.authService.register(this.registerForm.value).subscribe({
      next: () => {
        this.toastr.success("Register successfully.")
        this.router.navigateByUrl('/login')
        this.toastr.success('Register successfully!')
      },
      error: (error) => {
        this.errors = error.errors
        this.toastr.error('Failed to register account!')
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
            map(result => result ? { emailExists: true } : null),
            finalize(() => control.markAllAsTouched())
          )
        })
      )
    }
  }

  validatePasswordMatch(): ValidatorFn {
   return (control: AbstractControl): ValidationErrors | null => {
    const password = control.get('password')
    const confirmPassword = control.get('confirmPassword')
    return password?.value !== confirmPassword?.value 
      ? { passwordNotMatch: true }
      : null
   }
  }
}
