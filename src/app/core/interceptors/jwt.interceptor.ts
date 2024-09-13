import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor
} from '@angular/common/http';
import { Observable, take } from 'rxjs';
import { AuthService } from '../services/auth.service';

@Injectable()
export class JwtInterceptor implements HttpInterceptor {

  token?: string

  constructor(private authService: AuthService) {}

  intercept(request: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<unknown>> {
    this.authService.currentUser$.pipe(take(1)).subscribe({
      next: (user) => {
        this.token = user?.token
      }
    })
    if (this.token) {
      request = request.clone({
        setHeaders: {
          Authorization: `Bearer ${this.token}`
        }
      })
    }
    return next.handle(request);
  }
}
