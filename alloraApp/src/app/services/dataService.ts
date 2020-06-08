import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError, retry } from 'rxjs/operators';

@Injectable()
export class DataService {
    constructor(private http: HttpClient) { }

    dataUrl = 'https://x6ce6j7dq6.execute-api.eu-central-1.amazonaws.com/dev/info';

    getData(): Observable<any> {

        return this.http.get(this.dataUrl, { headers: { 'x-api-key': localStorage.getItem("token") } });
    }

    postData(body): Observable<any> {
        return this.http.post(this.dataUrl, body, { headers: { 'x-api-key': localStorage.getItem("token") } });
    }

}
