import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';
import {environment} from "../../environments/environment";

@Injectable()
export class TrainingService {
    private apiUrl = `${environment.apiUrl}/trainings`;

    constructor(private http: HttpClient) {
    }

    getAllTrainings(): Observable<any> {
        return this.http.get(this.apiUrl);
    }
}
