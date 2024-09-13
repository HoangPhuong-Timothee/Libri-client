import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { Router } from '@angular/router';
import { map, of, ReplaySubject } from 'rxjs';
import { LoginResponse } from '../models/login-response.model';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private currentUserSource = new ReplaySubject<LoginResponse | null>(1)
  currentUser$ = this.currentUserSource.asObservable()

  constructor(private http: HttpClient, private router: Router) { }

  login(model: any) {
    return this.http.post<LoginResponse>(`${environment.baseAPIUrl}/api/Accounts/login`, model)
    .pipe(
      map((user) => {
        if (user)
        {
          console.log(user)
          localStorage.setItem('access_token', user.token)
          this.currentUserSource.next(user)
        }
      })
    )
  }

  getCurrentUser(token: string | null) {
    if (token === null) {
      this.currentUserSource.next(null)
      return of(null)
    }
    let headers = new HttpHeaders()
    headers = headers.set('Authorization', `Bearer ${token}`)
    return this.http.get<LoginResponse>(`${environment.baseAPIUrl}/api/Users`, { headers }).pipe(
      map((user) => {
        if (user) {
          localStorage.setItem('access_token', user.token)
          this.currentUserSource.next(user)
          console.log(user)
          return user
        } else {
          return null
        }
      })
    )
  }

  register(model: any) {
    return this.http.post(`${environment.baseAPIUrl}/api/Accounts/register`, model)
  }
  
  logout() {
    localStorage.removeItem('access_token');
    this.currentUserSource.next(null)
    this.router.navigateByUrl('/')
    // return this.http.post(`${environment.baseAPIUrl}/api/Accounts/logout`)
  }

 checkEmailExists(email: string) {
  return this.http.get<boolean>(`${environment.baseAPIUrl}/api/Accounts/email-exists?email=${email}`)
 }
}
