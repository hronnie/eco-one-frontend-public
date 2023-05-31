import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {CompletedTrainingComponent} from "./completed-training.component";


const routes: Routes = [
    {
        path: '',
        component: CompletedTrainingComponent,
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
