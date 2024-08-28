import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor
} from '@angular/common/http';
import { delay, finalize, Observable } from 'rxjs';
import { WaitingService } from '../services/waiting.service';

@Injectable()
export class LoadingInterceptor implements HttpInterceptor {

  constructor(private waitingService: WaitingService) {}

  intercept(request: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<unknown>> {
    this.waitingService.waiting()
    return next.handle(request).pipe(
      delay(1000),
      finalize(() => this.waitingService.idle())
    )
  }
}