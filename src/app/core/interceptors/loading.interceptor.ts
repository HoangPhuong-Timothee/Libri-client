import {
  HttpEvent,
  HttpHandler,
  HttpInterceptor,
  HttpRequest
} from '@angular/common/http';
import { Injectable } from '@angular/core';
import { delay, finalize, Observable } from 'rxjs';
import { WaitingService } from '../services/waiting.service';

@Injectable()
export class LoadingInterceptor implements HttpInterceptor {

  constructor(private waitingService: WaitingService) {}

  intercept(request: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<unknown>> {
    if (!request.url.includes('email-exists') ||!request.url.includes('book-exists') || !request.url.includes('exists-in-bookstore'))
      {
        this.waitingService.waiting();
      }

      return next.handle(request).pipe(
        delay(250),
        finalize(() => this.waitingService.idle())
      );
  }
}
