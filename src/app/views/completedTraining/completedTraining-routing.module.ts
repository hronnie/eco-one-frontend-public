import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {CompletedTrainingcomponent} from "./completedTrainingcomponent";


const routes: Routes = [
    {
        path: '',
        component: CompletedTrainingcomponent,
        data: {
            title: $localize`Elvégzett tanfolyamok`
        }
    }
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class CompletedTrainingRoutingModule {
}
