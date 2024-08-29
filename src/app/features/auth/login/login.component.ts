import { Component } from '@angular/core';
import { FormControl,FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
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

  constructor(private authService: AuthService, private router: Router, private route: ActivatedRoute, private toastr: ToastrService) {
    this.returnUrl = this.route.snapshot.queryParams['returnUrl'] || '/'
   }
   
  onLogin() {
    this.authService.login(this.loginForm.value).subscribe({
      next: () => {
        this.loginForm.reset()
        this.router.navigateByUrl('/')
      },
      error: (error) => {
        console.error(error)
        this.toastr.error('Login failed!')
      }
    })
  }
}
