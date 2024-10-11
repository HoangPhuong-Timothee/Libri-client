import { Component } from '@angular/core';
import { FormBuilder, FormControl, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { AuthService } from 'src/app/core/services/auth.service';
import { matchValue } from 'src/app/shared/helpers/validate/match-value.validate';
import { EmailValidator } from 'src/app/shared/helpers/validate/exist-email.validate';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent {

  errors: string[] | null = null

  constructor(private emailValidator: EmailValidator, private fb: FormBuilder, private authService: AuthService, private router: Router, private toastr: ToastrService) { }

  passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{6,}$/;

  registerForm = this.fb.group({
    username: ['', Validators.required],
    email: ['', [Validators.required, Validators.email], [this.emailValidator.validateEmailNotTaken()]],
    password: new FormControl ('', [Validators.required, Validators.pattern(this.passwordRegex), matchValue('confirmPassword', true)]),
    confirmPassword: new FormControl('', [Validators.required, matchValue('password', true)]),
    phoneNumber: ['', Validators.required]
  }
);

  onRegister() {
    this.authService.register(this.registerForm.value).subscribe({
      next: () => {
        this.toastr.success("Register successfully.")
        this.router.navigateByUrl('/login')
      },
      error: (error) => {
        this.errors = error.errors
        this.toastr.error('Failed to register account!')
      }
    })
  }

}
