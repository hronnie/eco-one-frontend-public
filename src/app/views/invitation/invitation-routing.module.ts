import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {InvitationComponent} from "./invitation.component";


const routes: Routes = [
    {
        path: '',
        component: InvitationComponent,
        data: {
            title: $localize`Kezdőlap`
        }
    }
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class InvitationRoutingModule {
}
