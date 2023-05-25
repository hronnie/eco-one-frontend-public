import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';
import {environment} from "../../environments/environment";
import {Center} from "../interfaces/center.model";

@Injectable({
    providedIn: 'root'
})
export class CenterService {

    private apiUrl = `${environment.apiUrl}`;

    constructor(private http: HttpClient) {
    }

    getCenterByUsername(username: string): Observable<Center> {
        return this.http.get<Center>(`${this.apiUrl}/centers/${username}/code`);
    }
}
