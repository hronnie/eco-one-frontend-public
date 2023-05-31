import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';

import {FillTrainingComponent} from './fillTraining.component';

const routes: Routes = [
    {
        path: '',
        component: FillTrainingComponent,
        data: {
            title: `Tanfolyam felvitele`
        }
    }
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class FillTrainingRoutingModule {
}
