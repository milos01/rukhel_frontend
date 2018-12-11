import {Injectable} from '@angular/core';
import {HttpEvent, HttpHandler, HttpInterceptor, HttpRequest} from '@angular/common/http';
import {Observable} from 'rxjs';

@Injectable()
export class AuthInterceptor implements HttpInterceptor {

    intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
        const access_token = localStorage.getItem('access_token');

        if (access_token) {
             request = request.clone({
                headers: request.headers.set('Authorization', 'Bearer ' + access_token)
            });

            return next.handle(request);
        } else {
            return next.handle(request);
        }
    }
}
