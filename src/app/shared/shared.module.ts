import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {DeleteButtonRendererComponent} from "../components/aggrid/deleteButtonRenderer.component";
import {TrainingService} from "../services/training.service";
import {DatePickerInputComponent} from "../components/aggrid/datePickerInput.component";
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
} from "@coreui/angular-pro";
import {IconModule} from "@coreui/icons-angular";
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import {AgGridModule} from "ag-grid-angular";
import {PercentagePipe} from "../pipes/percentage.pipe";

@NgModule({
    declarations: [
        DeleteButtonRendererComponent,
        DatePickerInputComponent,
        PercentagePipe
    ],
    imports: [
        CommonModule,
        CardModule,
        NavModule,
        IconModule,
        TabsModule,
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
    ],
    exports: [
        DeleteButtonRendererComponent,
        DatePickerInputComponent,
        CommonModule,
        CardModule,
        NavModule,
        IconModule,
        TabsModule,
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
        PercentagePipe,
    ],
    providers: [TrainingService]
})
export class SharedModule {
}
