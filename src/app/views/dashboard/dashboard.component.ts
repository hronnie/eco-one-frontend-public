import {Component, OnInit} from '@angular/core';
import {Router} from "@angular/router";

@Component({
    templateUrl: 'dashboard.component.html',
    styleUrls: ['dashboard.component.scss']
})
export class DashboardComponent implements OnInit {
    protectedData: any;

    constructor(private router: Router) { }

    ngOnInit(): void {
    }

}
