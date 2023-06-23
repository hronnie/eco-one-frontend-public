import {Component, OnInit} from '@angular/core';
import {Router} from "@angular/router";
import {LOCAL_STORAGE_KEY_CENTER_CODE, LOCAL_STORAGE_KEY_CENTER_DESC} from "../../constants/localStorageKeys.constant";
import {DashboardInfo} from "../../interfaces/dashboardInfo.model";
import {DashboardInfoService} from "../../services/dashboard-info.service";

@Component({
    templateUrl: 'dashboard.component.html',
    styleUrls: ['dashboard.component.scss']
})
export class DashboardComponent implements OnInit {
    centerDesc: string | null = null;
    centerCode: string | null = null;
    dashboardInfo: DashboardInfo | undefined;

    constructor(private dashboardInfoService: DashboardInfoService) { }

    ngOnInit(): void {
        this.centerDesc = localStorage.getItem(LOCAL_STORAGE_KEY_CENTER_DESC);
        this.centerCode = localStorage.getItem(LOCAL_STORAGE_KEY_CENTER_CODE);
        if (!this.centerCode) {
            return;
        }
        this.dashboardInfoService.getDashboardInfo(this.centerCode).subscribe({
            next: response => {
                this.dashboardInfo = this.sortDashboardInfoByStudentTrainingCount(response);
            },
            error: error => {

            }
        })
    }

    sortDashboardInfoByStudentTrainingCount(dashboardInfo: DashboardInfo): DashboardInfo {
        let sortedDashboardInfo = { ...dashboardInfo };  // Create a shallow copy of the object to avoid modifying the original
        sortedDashboardInfo.studentTrainings.sort((a, b) => b.noStudents - a.noStudents);
        return sortedDashboardInfo;
    }

    getTrainingPrereqByTrainingName(trainingName: string) {
        const data = this.dashboardInfo?.studentPrereqTrainings;
        if (!data) {
            return 0;
        }
        for (let i = 0; i < data?.length; i++) {
            if (data[i].name === trainingName) {
                return data[i].noStudents;
            }
        }
        return 0;
    }

}
