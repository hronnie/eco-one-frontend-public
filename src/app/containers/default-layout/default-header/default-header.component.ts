import {Component, Input} from '@angular/core';

import {HeaderComponent} from '@coreui/angular-pro';
import {Router} from "@angular/router";

@Component({
    selector: 'app-default-header',
    templateUrl: './default-header.component.html'
})
export class DefaultHeaderComponent extends HeaderComponent {

    @Input() sidebarId: string = 'sidebar1';

    constructor(private router: Router) {
        super();
    }

    logOut() {
        localStorage.removeItem('access_token');
        this.router.navigate(['/login']);
    }
}
