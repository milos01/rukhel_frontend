import {Injectable} from '@angular/core';
import {HttpClient, HttpEventType, HttpHeaders, HttpRequest} from '@angular/common/http';
import {Observable, throwError} from 'rxjs';
import {catchError, last, map, tap} from 'rxjs/operators';

@Injectable({
    providedIn: 'root'
})
export class FileUploadService {

    constructor(private http: HttpClient) {
    }

    postUploadFile(file: File): Observable<any> {
        const imageFormData = new FormData();
        imageFormData.append('file', file);

        const httpRequest = new HttpRequest('POST', 'http://localhost:8000/api/upload/task/1/file', imageFormData, {
            reportProgress: true,
        });

        return this.http.request(httpRequest).pipe(
            catchError(error => {
                return throwError(error);
            })
        );
    }
}
