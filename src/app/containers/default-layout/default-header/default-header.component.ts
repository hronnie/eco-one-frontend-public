import {Component, Input} from '@angular/core';

import {HeaderComponent} from '@coreui/angular-pro';

@Component({
    selector: 'app-default-header',
    templateUrl: './default-header.component.html'
})
export class DefaultHeaderComponent extends HeaderComponent {

    @Input() sidebarId: string = 'sidebar1';

    constructor() {
        super();
    }
}
