import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';
import {environment} from "../../environments/environment";

@Injectable({
    providedIn: 'root'
})
export class CenterService {

    private apiUrl = `${environment.apiUrl}`;

    constructor(private http: HttpClient) {
    }

    getCenterCodeByUsername(username: string): Observable<any> {
        return this.http.get(`${this.apiUrl}/centers/${username}/code`);
    }
}
