import {NgModule} from '@angular/core';
import {CommonModule, DatePipe} from '@angular/common';
import {ReactiveFormsModule} from '@angular/forms';
import { AgGridModule } from 'ag-grid-angular';
import { FormsModule } from '@angular/forms';


import {
    AlertModule,
    AvatarModule,
    ButtonGroupModule,
    ButtonModule,
    CardModule,
    FormModule,
    GridModule,
    NavModule,
    ProgressModule,
    TableModule,
    TabsModule
} from '@coreui/angular-pro';

import {IconModule} from '@coreui/icons-angular';
import {CompletedTrainingComponent} from "./completed-training.component";
import {CompletedTrainingRoutingModule} from "./completedTraining-routing.module";
import {SharedModule} from "../../shared/shared.module";


@NgModule({
    imports: [
        CompletedTrainingRoutingModule,
        CardModule,
        NavModule,
        IconModule,
        TabsModule,
        CommonModule,
        GridModule,
        ProgressModule,
        ReactiveFormsModule,
        FormsModule,
        ButtonModule,
        FormModule,
        ButtonModule,
        ButtonGroupModule,
        AvatarModule,
        TableModule,
        AgGridModule,
        AlertModule,
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
