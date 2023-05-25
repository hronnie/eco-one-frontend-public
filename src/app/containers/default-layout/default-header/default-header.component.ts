import {Component, Input, OnInit} from '@angular/core';

import {HeaderComponent} from '@coreui/angular-pro';
import {Router} from "@angular/router";
import {
    LOCAL_STORAGE_KEY_ACCESS_TOKEN,
    LOCAL_STORAGE_KEY_CENTER_DESC,
    LOCAL_STORAGE_KEY_USERNAME
} from "../../../constants/localStorageKeys.constant";

@Component({
    selector: 'app-default-header',
    templateUrl: './default-header.component.html'
})
export class DefaultHeaderComponent extends HeaderComponent implements OnInit{

    @Input() sidebarId: string = 'sidebar1';
    currentUser: string | null = null;
    centerDesc: string | null = null;

    constructor(private router: Router) {
        super();
    }

    ngOnInit(): void {
        this.currentUser = localStorage.getItem(LOCAL_STORAGE_KEY_USERNAME);
        this.centerDesc = localStorage.getItem(LOCAL_STORAGE_KEY_CENTER_DESC);
    }

    logOut() {
        localStorage.removeItem(LOCAL_STORAGE_KEY_ACCESS_TOKEN);
        this.router.navigate(['/login']);
    }

}
