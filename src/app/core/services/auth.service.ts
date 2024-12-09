import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { map, Observable, of, ReplaySubject } from 'rxjs';
import { environment } from 'src/environments/environment';
import { ChangePasswordRequest, LoginRequest, RegisterRequest } from '../models/auth.model';
import { User } from '../models/user.model';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private currentUserSource = new ReplaySubject<User | null>(1)
  currentUser$ = this.currentUserSource.asObservable()

  constructor(private http: HttpClient, private router: Router, private toastr: ToastrService) {}

  login(request: LoginRequest) {
    return this.http.post<User>(`${environment.baseAPIUrl}/api/Auth/login`, request).pipe(
      map((user) => {
        if (user) {
          localStorage.setItem('access_token', user.token)
        }
      })
    )
  }

  loadCurrentUser(token: string | null) {
    if (token === null) {
      this.currentUserSource.next(null)
      return of(null)
    }
    let headers = new HttpHeaders().set('Authorization', `Bearer ${token}`);
    return this.http.get<User>(`${environment.baseAPIUrl}/api/Users/current-user`, { headers }).pipe(
     map((user) => {
      if (user) {
        this.currentUserSource.next(user)
        return user
      } else {
        return null
      }
     })
    )
  }

  get isAdmin$(): Observable<boolean> {
    return this.currentUser$.pipe(
      map((user) => {
        const roles = user?.roles
        return Array.isArray(roles) ? roles.includes('Admin') : roles === 'Admin'
      })
    )
  }

  register(request: RegisterRequest) {
    return this.http.post(`${environment.baseAPIUrl}/api/Auth/register`, request)
  }

  logout() {
    localStorage.removeItem('access_token');
    this.currentUserSource.next(null)
    setTimeout(() => {
      this.router.navigateByUrl('/')
      this.toastr.success('Đã đăng xuất tài khoản')
    }, 800)
  }

 checkEmailExists(email: string) {
  return this.http.get<boolean>(`${environment.baseAPIUrl}/api/Auth/email-exists?email=${email}`)
 }

 changePassword(request: ChangePasswordRequest) {
    return this.http.post(`${environment.baseAPIUrl}/api/Auth/change-password`, request)
 }

 refreshToken() {

 }

}
