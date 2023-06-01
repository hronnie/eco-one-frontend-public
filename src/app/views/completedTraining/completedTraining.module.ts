import {NgModule} from '@angular/core';
import {DatePipe} from '@angular/common';
import {CompletedTrainingComponent} from "./completed-training.component";
import {CompletedTrainingRoutingModule} from "./completedTraining-routing.module";
import {SharedModule} from "../../shared/shared.module";


@NgModule({
    imports: [
        CompletedTrainingRoutingModule,
        SharedModule
    ],
    declarations: [
        CompletedTrainingComponent,
    ],
    providers: [
        DatePipe
    ]
})
export class CompletedTrainingModule {
}
