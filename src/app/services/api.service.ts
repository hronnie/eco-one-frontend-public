import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
    providedIn: 'root'
})
export class ApiService {
    private url = 'http://127.0.0.1:5000/api/protected';

    constructor(private http: HttpClient) { }

    getProtectedData(): Observable<any> {
        return this.http.get<any>(this.url);
    }
}
