import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';

import {DefaultLayoutComponent} from './containers';

const routes: Routes = [
    {
        path: '',
        redirectTo: 'dashboard',
        pathMatch: 'full'
    },
    {
        path: '',
        component: DefaultLayoutComponent,
        data: {
            title: $localize`Home`
        },
        children: [
            {
                path: 'dashboard',
                loadChildren: () =>
                    import('./views/dashboard/dashboard.module').then((m) => m.DashboardModule)
            },
            {
                path: 'email-template',
                loadChildren: () =>
                    import('./views/emailTemplate/emailTemplate.module').then((m) => m.EmailTemplateModule)
            },
            {
                path: 'student',
                loadChildren: () =>
                    import('./views/student/student.module').then((m) => m.StudentModule)
            },
            {
                path: 'invitation',
                loadChildren: () =>
                    import('./views/invitation/invitation.module').then((m) => m.InvitationModule)
            }
        ]
    },
    {path: '**', redirectTo: 'dashboard'}
];

@NgModule({
    imports: [
        RouterModule.forRoot(routes, {
            scrollPositionRestoration: 'top',
            anchorScrolling: 'enabled',
            initialNavigation: 'enabledBlocking'
            // relativeLinkResolution: 'legacy'
        })
    ],
    exports: [RouterModule]
})
export class AppRoutingModule {
}
