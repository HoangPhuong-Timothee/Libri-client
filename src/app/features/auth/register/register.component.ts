import { Component, OnInit } from '@angular/core';
import { AbstractControl, AsyncValidator, AsyncValidatorFn, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { debounceTime, finalize, map, switchMap, take } from 'rxjs';
import { AuthService } from 'src/app/core/services/auth.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {

  errors: string[] | null = null

  constructor(private fb: FormBuilder, private authService: AuthService, private router: Router) { }

  passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{6,}$/;


  registerForm = this.fb.group({
    username: ['', Validators.required],
    email: ['', [Validators.required, Validators.email], [this.validateEmailNotTaken()]],
    password: ['', [Validators.required, Validators.pattern(this.passwordRegex)]],
    confirmPassword: ['', [Validators.required]],
    phoneNumber: ['', Validators.required],
    address: ['', Validators.required]
  })

  ngOnInit(): void {
  }

  onRegister() {
    this.authService.register(this.registerForm.value).subscribe({
      next: () => {
        this.router.navigateByUrl('/login')
      },
      error: (error) => {
        this.errors = error.errors
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
  
}
