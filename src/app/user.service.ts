import {Injectable} from '@angular/core';
import {HttpClient, HttpParams} from '@angular/common/http';
import {Observable, of, throwError} from 'rxjs';
import {catchError, map, tap} from 'rxjs/operators';

@Injectable({
    providedIn: 'root'
})
export class UserService {

    constructor(private http: HttpClient) {
    }

    postSignup(form): Observable<any> {
        const body = JSON.stringify(form.value);

        return this.http.post('http://localhost:8000/api/auth/signup', body).pipe(
            catchError(error => {
                return throwError(error.error.errors);
            })
        );
    }

    postSignin(form): Observable<any> {
        const body = JSON.stringify(form.value);

        return this.http.post('http://localhost:8000/api/auth/signin', body).pipe(
            tap(res => {
                this.setSession(res);
            }),
            catchError(error => {
                return throwError(error.error.errors);
            })
        );
    }

    postResetPassword(form): Observable<any> {
        const body = JSON.stringify(form.value);
        console.log(body);
        return this.http.post('http://localhost:8000/api/auth/reset-link', body).pipe(
            tap(res => {
                this.setSession(res);
            }),
            catchError(error => {
                return throwError(error.error.errors);
            })
        );
    }

    private setSession(authResult) {
        localStorage.setItem('access_token', authResult.access_token);
        localStorage.setItem('expires_in', authResult.expires_in);
    }

    logout() {
        localStorage.removeItem('access_token');
        localStorage.removeItem('expires_in');
    }

    public isLoggedIn() {
        if (localStorage.getItem('access_token')) {
            return true;
        }
        return false;
    }

    public getUser() {
        return this.http.get('http://localhost:8000/api/user').pipe(
            catchError(error => {
                return throwError(error.error.errors);
            })
        );
    }

    public checkEmailHash($hash) {
        const params = new HttpParams().set('token', $hash);

        return this.http.get('http://localhost:8000/api/auth/check-hash', {params}).pipe(
            catchError(error => {
                return throwError(error.error.errors);
            })
        );
    }

    public postUpdatePassword(form, token): Observable<any> {
        const body = form.value;
        body.token = token;

        return this.http.post('http://localhost:8000/api/auth/update-password', JSON.stringify(body)).pipe(
            catchError(error => {
                return throwError(error.error.errors);
            })
        );
    }
}

