import {
  HttpErrorResponse,
  HttpEvent,
  HttpHandler,
  HttpInterceptor,
  HttpRequest,
} from '@angular/common/http';
import { Injectable } from '@angular/core';
import { NavigationExtras, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { catchError, Observable, throwError } from 'rxjs';

@Injectable()
export class ErrorInterceptor implements HttpInterceptor {
  constructor(private router: Router, private toastr: ToastrService) {}

  intercept(
    request: HttpRequest<unknown>,
    next: HttpHandler
  ): Observable<HttpEvent<unknown>> {
    return next.handle(request).pipe(
      catchError((error: HttpErrorResponse) => {
        if (error) {
          if (error.status === 400) {
            if (error.error.errors) {
              const detailErrors = error.error.errors.map((err: any) => ({
                location: err.location,
                details: err.details
              }))
              throw { status: 400, errors: detailErrors }
            }
          }
          if (error.status === 401) {
            this.toastr.error(error.error.message, error.status.toString())
          }
          if (error.status === 403) {
            this.toastr.error(error.error.message, error.status.toString())
          }
          if (error.status === 404) {
            this.router.navigateByUrl('/not-found');
          }
          if (error.status === 500) {
            const navigationExtras: NavigationExtras = {
              state: {
                error: error.error
              }
            }
            this.router.navigateByUrl('/server-error', navigationExtras)
          }
        }
        return throwError(() => error)
      })
    )
  }
}
