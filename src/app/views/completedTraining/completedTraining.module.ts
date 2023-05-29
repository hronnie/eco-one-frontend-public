import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {ReactiveFormsModule} from '@angular/forms';

import {
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
import {CompletedTrainingRoutingModule} from "./completedTraining-routing.module";
import {CompletedTrainingcomponent} from "./completedTraining.component";
import {AgGridModule} from "@ag-grid-community/angular";
import {TrainingService} from "../../services/training.service";
import {MemberService} from "../../services/member.service";
import {DeleteButtonRendererComponent} from "../../components/aggrid/deleteButtonRenderer.component";


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
        ButtonModule,
        FormModule,
        ButtonModule,
        ButtonGroupModule,
        AvatarModule,
        TableModule,
        AgGridModule
    ],
    declarations: [CompletedTrainingcomponent],
    providers: [
        TrainingService,
        MemberService,
        DeleteButtonRendererComponent
    ]
})
export class CompletedTrainingModule {
}
