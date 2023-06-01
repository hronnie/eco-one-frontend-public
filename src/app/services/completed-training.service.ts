import {Injectable} from '@angular/core';
import {Observable, of} from "rxjs";
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

    fillTraining(centerCode: string, trainingCode: string, emailList: string[], completionDate: string): Observable<void> {
        const url = `${this.apiUrl}/${centerCode}/completedTrainings/bulk`;
        const completedTraining = {
            code: trainingCode,
            emailList,
            completionDate: completionDate
        };
        return this.http.post<void>(url, completedTraining);
    }

    updateTraining(centerCode: string, trainingCode: string, email: string, date: string): Observable<any> {
        const url = `${this.apiUrl}/${centerCode}/completedTrainings/${trainingCode}/${email}`;
        const updatedCompletedTraining = {
            completionDate: date
        };
        return this.http.put(url, updatedCompletedTraining);
    }

    deleteTraining(centerCode: string, trainingCode: string, email: string) {
        const url = `${this.apiUrl}/${centerCode}/completedTrainings/${trainingCode}/${email}`;
        return this.http.delete(url);
    }
}
