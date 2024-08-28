import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { Router } from '@angular/router';
import { BehaviorSubject, map } from 'rxjs';
import { Account } from '../models/account.model';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private currentUserSource = new BehaviorSubject<Account | null>(null)
  currentUser$ = this.currentUserSource.asObservable()

  constructor(private http: HttpClient, private router: Router) { }

  login(model: any) {
    return this.http.post<Account>(`${environment.baseAPIUrl}/api/Accounts/login`, model).pipe(
      map((user) => {
        if (user)
        {
          localStorage.setItem('user', JSON.stringify(user))
          this.currentUserSource.next(user)
        }
      })
    )
  }

  loadCurrentUser(token: string) {
    let headers = new HttpHeaders()
    headers = headers.set('Authorization', `Bearer ${token}`)
    return this.http.get<Account>(`${environment.baseAPIUrl}/api/Users`, { headers }).pipe(
      map((user) => {
        localStorage.setItem('access_token', user.token)
        this.currentUserSource.next(user)
      })
    )
  }

  register(model: any) {
    return this.http.post<Account>(`${environment.baseAPIUrl}/api/Accounts/register`, model)
  }
  
  logout() {
    localStorage.removeItem('user');
    this.currentUserSource.next(null)
    this.router.navigateByUrl('/')
  }

 checkEmailExists(email: string) {
  return this.http.get<boolean>(`${environment.baseAPIUrl}/api/Accounts/email-exists?email=${email}`)
 }
}
