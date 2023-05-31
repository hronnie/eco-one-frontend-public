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
import {FillTrainingRoutingModule} from "./fillTraining-routing.module";
import {FillTrainingComponent} from "./fillTraining.component";


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
        ButtonModule,
        FormModule,
        ButtonModule,
        ButtonGroupModule,
        AvatarModule,
        TableModule
    ],
    declarations: [FillTrainingComponent]
})
export class FillTrainingModule {
}
