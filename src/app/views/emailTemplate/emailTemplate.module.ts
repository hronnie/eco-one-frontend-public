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
import {EmailTemplateRoutingModule} from "./emailTemplate-routing.module";
import {EmailTemplateComponent} from "./emailTemplate.component";


@NgModule({
    imports: [
        EmailTemplateRoutingModule,
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
    declarations: [EmailTemplateComponent]
})
export class EmailTemplateModule {
}
