import {NgModule} from '@angular/core';
import {FillTrainingRoutingModule} from "./fillTraining-routing.module";
import {FillTrainingComponent} from "./fillTraining.component";
import {SharedModule} from "../../shared/shared.module";


@NgModule({
    imports: [
        FillTrainingRoutingModule,
        SharedModule
    ],
    declarations: [FillTrainingComponent],
})
export class FillTrainingModule {
}
