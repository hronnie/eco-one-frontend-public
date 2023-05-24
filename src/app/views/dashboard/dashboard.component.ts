import {Component, OnInit} from '@angular/core';
import {ApiService} from "../../services/api.service";
import {Router} from "@angular/router";

@Component({
    templateUrl: 'dashboard.component.html',
    styleUrls: ['dashboard.component.scss']
})
export class DashboardComponent implements OnInit {
    protectedData: any;

    constructor(private apiService: ApiService,
                private router: Router) { }

    ngOnInit(): void {
        this.apiService.getProtectedData().subscribe(
            data => {
                this.protectedData = data;
            },
            err => {
                console.log(err);
            }
        );
    }

}
