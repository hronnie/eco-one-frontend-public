import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';

import {EmailTemplateComponent} from './emailTemplate.component';

const routes: Routes = [
    {
        path: '',
        component: EmailTemplateComponent,
        data: {
            title: $localize`Kezdőlap`
        }
    }
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class EmailTemplateRoutingModule {
}
