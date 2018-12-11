import {Injectable} from '@angular/core';
import {Observable, throwError} from 'rxjs';
import {catchError, tap} from 'rxjs/operators';
import {HttpClient, HttpParams} from '@angular/common/http';

@Injectable({
    providedIn: 'root'
})
export class TaskService {
    constructor(private http: HttpClient) {
    }

    getMyTasks(): Observable<any> {
        const params = new HttpParams()
            .set('term', 'all')
            .set('category_id', 'math')
            .set('page', '1');
        return this.http.get('http://localhost:8000/api/task/find', {params}).pipe(
            catchError(error => {
                return throwError(error.error.errors);
            })
        );
    }
}
