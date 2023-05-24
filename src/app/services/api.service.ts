import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
    providedIn: 'root'
})
export class ApiService {
    private url = 'http://127.0.0.1:5000/protected';

    constructor(private http: HttpClient) { }

    getProtectedData(): Observable<any> {
        const headers = new HttpHeaders().set('Authorization',  `Bearer ${localStorage.getItem('access_token')}`);
        return this.http.get<any>(this.url, { headers });
    }
}
