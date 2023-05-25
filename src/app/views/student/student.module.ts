import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
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
import {StudentRoutingModule} from "./student-routing.module";
import {StudentComponent} from "./student.component";
import {DeleteButtonRendererComponent} from "../../components/aggrid/deleteButtonRenderer.component";


@NgModule({
    imports: [
        StudentRoutingModule,
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
    ],
    declarations: [
        StudentComponent,
        DeleteButtonRendererComponent
    ]
})
export class StudentModule {
}
