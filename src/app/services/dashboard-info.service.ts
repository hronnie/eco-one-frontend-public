import {Injectable} from '@angular/core';
import {environment} from "../../environments/environment";
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";
import {DashboardInfo} from "../interfaces/dashboardInfo.model";

@Injectable({
    providedIn: 'root'
})
export class DashboardInfoService {
    private apiUrl = `${environment.apiUrl}/centers`;

    constructor(private http: HttpClient) {
    }

    getDashboardInfo(center_code: string): Observable<DashboardInfo> {
        return this.http.get<DashboardInfo>(`${this.apiUrl}/${center_code}/dashboardInfo`);
    }
}
