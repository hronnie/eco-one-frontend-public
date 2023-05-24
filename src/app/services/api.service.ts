import {HttpClient} from '@angular/common/http';
import {Injectable} from '@angular/core';
import {Observable} from 'rxjs';
import {environment} from "../../environments/environment";

@Injectable({
    providedIn: 'root'
})
export class ApiService {
    private url = `${environment.apiUrl}/protected`;

    constructor(private http: HttpClient) {
    }

    getProtectedData(): Observable<any> {
        return this.http.get<any>(this.url);
    }
}
