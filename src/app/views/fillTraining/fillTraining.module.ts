import {NgModule} from '@angular/core';
import {CommonModule, DatePipe} from '@angular/common';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';

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
import {FillTrainingRoutingModule} from "./fillTraining-routing.module";
import {FillTrainingComponent} from "./fillTraining.component";
import {TrainingService} from "../../services/training.service";
import {AgGridModule} from "@ag-grid-community/angular";
import {SharedModule} from "../../shared/shared.module";


@NgModule({
    imports: [
        FillTrainingRoutingModule,
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
    declarations: [FillTrainingComponent],
})
export class FillTrainingModule {
}
