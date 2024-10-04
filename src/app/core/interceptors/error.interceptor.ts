import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor,
  HttpErrorResponse
} from '@angular/common/http';
import { catchError, Observable, throwError } from 'rxjs';
import { NavigationExtras, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';

@Injectable()
export class ErrorInterceptor implements HttpInterceptor {

  constructor(private router: Router, private toastr: ToastrService) {}

  intercept(request: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<unknown>> {
    return next.handle(request).pipe(
     catchError((error: HttpErrorResponse) => {
      if (error.status === 400) {
        if (error.error.errors) {
          const modelStateErrors = [];
          for (const key in error.error.errors) {
            if (error.error.errors[key]) {
              modelStateErrors.push(error.error.errors[key])
            }
          }
          throw modelStateErrors.flat();
        } else {
          this.toastr.error(error.error.title || error.error);
        }
      }
      if (error.status === 401) {
        this.toastr.error(error.error.title || error.error);
      }
      if (error.status === 403) {
        this.toastr.error('Forbidden, you are not allowed to access this page');
      }
      if (error.status === 404) {
        this.router.navigateByUrl('/not-found');
      }
      if (error.status === 500) {
        const navigationExtras: NavigationExtras = {state: {error: error.error}}
        this.router.navigateByUrl('/server-error', navigationExtras);
      }
      return throwError(() => error)
     })
    )
  }
}