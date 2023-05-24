import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';

import {DefaultLayoutComponent} from './containers';
import {AuthGuardService} from "./services/authGuard.service";

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
            { path: '', redirectTo: '/pages/login', pathMatch: 'full' },
            {
                path: 'pages',
                loadChildren: () =>
                    import('./views/pages/pages.module').then((m) => m.PagesModule)
            },
            // { path: 'login', component: LoginComponent },
            {
                path: 'dashboard',
                canActivate: [AuthGuardService],
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
            },
            {
                path: 'completed-training',
                loadChildren: () =>
                    import('./views/completedTraining/completedTraining.module').then((m) => m.CompletedTrainingModule)
            },
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
