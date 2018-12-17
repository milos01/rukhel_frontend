import {Injectable} from '@angular/core';
import {HttpClient, HttpEventType, HttpRequest} from '@angular/common/http';
import {Observable, throwError} from 'rxjs';
import {catchError, last, map, tap} from 'rxjs/operators';

@Injectable({
    providedIn: 'root'
})
export class FileUploadService {

    constructor(private http: HttpClient) {
    }

    postUploadFile(file: File): Observable<any> {
        console.log(file);
        const imageFormData = new FormData();
        imageFormData.append('file', file);
        const httpRequest = new HttpRequest('POST', 'http://localhost:8000/api/upload/task/1/file', imageFormData, {
            reportProgress: true
        });

        return this.http.request(httpRequest).pipe(
            map(event => this._getEventMessage(event, file)),
            tap(message => {
                console.log(message);
            }),
            last(),
            catchError(error => {
                return throwError(error);
            })
        );
    }

    _getEventMessage(event, body) {
        switch (event.type) {
            case HttpEventType.Sent:
                return `Uploading file "${body.name}" of size ${body.size}.`;

            case HttpEventType.UploadProgress:
                // Compute and show the % done:
                const percentDone = Math.round(100 * event.loaded / event.total);
                return `File "${body.name}" is ${percentDone}% uploaded.`;

            case HttpEventType.Response:
                return `File "${body.name}" was completely uploaded!`;

            default:
                return `File "${body.name}" surprising upload event: ${event.type}.`;
        }
    }
}
