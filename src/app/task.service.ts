import {Injectable} from '@angular/core';
import {Observable, throwError} from 'rxjs';
import {catchError} from 'rxjs/operators';
import {HttpClient, HttpParams} from '@angular/common/http';

@Injectable({
    providedIn: 'root'
})
export class TaskService {
    constructor(private http: HttpClient) {
    }

    getMyTasks(params: HttpParams): Observable<any> {
        return this.http.get('http://localhost:8000/api/task/find', {params}).pipe(
            catchError(error => {
                return throwError(error.error.errors);
            })
        );
    }

    postTask(form): Observable<any> {
        const body = JSON.stringify(form.value);

        return this.http.post('http://localhost:8000/api/task', body).pipe(
            catchError(error => {
                return throwError(error);
            })
        );
    }

    postAcceptOffer(offer): Observable<any> {
        return this.http.post('http://localhost:8000/api/task', body).pipe(
            catchError(error => {
                return throwError(error);
            })
        );
    }
}
