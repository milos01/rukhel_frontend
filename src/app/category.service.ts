import {Injectable} from '@angular/core';
import {HttpClient, HttpParams} from '@angular/common/http';
import {Observable, throwError} from 'rxjs';
import {catchError} from 'rxjs/operators';

@Injectable({
    providedIn: 'root'
})
export class CategoryService {

    constructor(private http: HttpClient) {
    }

    getCategories(): Observable<any> {
        return this.http.get('http://localhost:8000/api/categories').pipe(
            catchError(error => {
                return throwError(error.error.errors);
            })
        );
    }
}
