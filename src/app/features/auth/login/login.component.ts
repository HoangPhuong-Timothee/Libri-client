import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { LoginRequest } from 'src/app/core/models/auth.model';
import { AuthService } from 'src/app/core/services/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {

  loginForm = new FormGroup({
    email: new FormControl('', [Validators.required, Validators.email]),
    password: new FormControl('', Validators.required)
  })
  returnUrl: string
  passwordVisible = false

  constructor(
    private authService: AuthService,
    private router: Router,
    private route: ActivatedRoute,
    private toastr: ToastrService
  ) {
      this.returnUrl = this.route.snapshot.queryParams['returnUrl'] || '/'
  }

  onLogin() {
    let loginRequest = this.loginForm.value as LoginRequest
    this.authService.login(loginRequest).subscribe({
      next: () => {
        this.loginForm.reset()
        this.router.navigateByUrl(this.returnUrl)
      },
      error: (error) => {
        console.error(error)
        this.toastr.error('Email hoặc tài khoảng không đúng!')
      }
    })
  }

  togglePasswordVisibility(): void {
    this.passwordVisible = !this.passwordVisible
  }

}
