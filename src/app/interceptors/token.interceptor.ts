import { HttpEvent, HttpHandler, HttpInterceptor, HttpRequest } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { AuthService } from '../front/services/auth.service';

@Injectable()
export class TokenInterceptor implements HttpInterceptor {
    constructor(public authService: AuthService) { }

    intercept(request: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<unknown>> {

        request.headers.get('x-role-access')
        const access = localStorage.getItem('userType') ? atob(localStorage.getItem('userType')) : request.headers.get('x-role-access');

        const newRequest = request.clone({
            setHeaders: {
                Authorization: `${this.authService.getToken()}`,
                'x-role-access': btoa(access)
            }
        });

        return next.handle(newRequest);
    }
}