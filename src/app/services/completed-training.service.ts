import {Injectable} from '@angular/core';
import {Observable} from "rxjs";
import {HttpClient} from "@angular/common/http";
import {environment} from "../../environments/environment";
import {CompletedTraining} from "../interfaces/completedTraining.model";

@Injectable({
    providedIn: 'root'
})
export class CompletedTrainingService {
    private apiUrl = `${environment.apiUrl}/centers`;

    constructor(private http: HttpClient) {
    }

    getCompletedTraining(center_code: string, email: string): Observable<CompletedTraining[]> {
        return this.http.get<CompletedTraining[]>(`${this.apiUrl}/${center_code}/completedTrainings/${email}/byemail`);
    }
}
