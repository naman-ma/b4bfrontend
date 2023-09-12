import { HttpEvent, HttpHandler, HttpInterceptor, HttpRequest } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { CookieService } from 'ngx-cookie-service';

@Injectable()
export class LanguageInterceptor implements HttpInterceptor {

    constructor(private cookieService: CookieService) { }

    intercept(request: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<unknown>> {

        let headers = {}, userMeta = this.cookieService.get('_userlocationMeta');
        request.headers.keys().map(key => headers[key] = request.headers.get(key));

        try {
            userMeta = JSON.parse(userMeta);
            headers['language'] = userMeta['languages'];
            headers['currency'] = userMeta['currency'];
        } catch (err) {
            headers['language'] = 'EN';
            headers['currency'] = 'USD';
        }

        const newRequest = request.clone({
            setHeaders: headers
        });

        return next.handle(newRequest);
    }

}
