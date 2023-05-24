import {Component, OnInit} from '@angular/core';
import {ApiService} from "../../services/api.service";

@Component({
    templateUrl: 'dashboard.component.html',
    styleUrls: ['dashboard.component.scss']
})
export class DashboardComponent implements OnInit {
    protectedData: any;

    constructor(private apiService: ApiService) { }

    ngOnInit(): void {
        this.apiService.getProtectedData().subscribe(
            data => {
                this.protectedData = data;
            },
            err => {
                // Handle error here
                console.log(err);
            }
        );
    }

}
