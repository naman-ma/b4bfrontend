import { HttpEvent, HttpHandler, HttpInterceptor, HttpRequest, HttpErrorResponse, HttpResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { AuthService } from '../front/services/auth.service';
import { environment } from '../../environments/environment';
import { timeout, tap } from 'rxjs/operators';
import { ToastrService } from 'ngx-toastr';
import { NgxSpinnerService } from "ngx-spinner";

@Injectable()
export class UrlInterceptor implements HttpInterceptor {

    constructor(
        public authService: AuthService,
        public toastr: ToastrService,
        public spinner: NgxSpinnerService
    ) { }

    intercept(request: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<unknown>> {

        const options = {
            url: `${environment.apiUrl}${request.url}`,
            setHeaders: {
                Authorization: `${this.authService.getToken()}`
            }
        };

        return next.handle(request.clone(options)).pipe(timeout(10000))
            .pipe(tap((event: HttpEvent<any>) => {
                if (event instanceof HttpResponse) {
                }
            }, (error: any) => {
                console.log('error: UrlInterceptor>>>', error);
                //  hide the spinner/loader
                this.spinner.hide();
                //  show toaster message for TimeoutErrorImpl {message: "Timeout has occurred", name: "TimeoutError"}
                // this.toastr.info('Server is taking longer than usual, thanks for your patience!');
            }));
    }

}

