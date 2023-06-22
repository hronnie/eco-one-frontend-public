import {Injectable} from '@angular/core';
import {environment} from "../../environments/environment";
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";

@Injectable({
    providedIn: 'root'
})
export class MailchimpSyncService {

    private apiUrl = `${environment.apiUrl}/centers`;

    constructor(private http: HttpClient) {
    }

    doMailchimpSync(center_code: string): Observable<void> {
        return this.http.get<void>(`${this.apiUrl}/${center_code}/mailchimpSync`);
    }
}
