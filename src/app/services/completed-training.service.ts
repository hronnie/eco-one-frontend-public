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

    addTraining(centerCode: string, trainingCode: string, email: string, completionDate: string): Observable<any> {
        const url = `${this.apiUrl}/${centerCode}/completedTrainings`;
        const completedTraining = {
            code: trainingCode,
            email: email,
            completionDate: completionDate
        };
        return this.http.post(url, completedTraining);
    }
}
