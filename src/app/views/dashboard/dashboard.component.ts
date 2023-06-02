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
                this.dashboardInfo = response;
            },
            error: error => {

            }
        })
    }

}
