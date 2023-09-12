import { HttpEvent, HttpHandler, HttpInterceptor, HttpRequest, HttpResponse, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { Observable, throwError } from 'rxjs';
import { map, catchError } from 'rxjs/operators';
import { ActivatedRoute, Router } from '@angular/router';

@Injectable()
export class ErrorInterceptor implements HttpInterceptor {

  constructor(private toastr: ToastrService, private router: Router) { }

  intercept(request: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<unknown>> {

    return next.handle(request).pipe(
      map((event: HttpEvent<any>) => {
        if (event instanceof HttpResponse) {
          if (event && !event['status']) {
            this.toastr.error(event.body.message || 'Something went wrong!');
          }
        }
        return event;
      }),
      catchError((error: HttpErrorResponse) => {
        if (error.error.message) {
          this.toastr.error(error.error.message);
          if (error.error.code === 401) {
            window.localStorage.clear();
            console.log('this.router.url: ', this.router.url);
            if (this.router.url.indexOf('admin')) {
              this.router.navigate(['/admin/login']);
            } else {
              this.router.navigate(['/auth/login']);
            }
          }
          return throwError(error);
        }
      }));
  }
}
