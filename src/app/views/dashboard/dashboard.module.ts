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
    TabsModule, WidgetModule
} from '@coreui/angular-pro';

import {IconModule} from '@coreui/icons-angular';

import {DashboardRoutingModule} from './dashboard-routing.module';
import {DashboardComponent} from './dashboard.component';
import {HttpClientModule} from "@angular/common/http";
import {SharedModule} from "../../shared/shared.module";

@NgModule({
    imports: [
        DashboardRoutingModule,
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
        HttpClientModule,
        WidgetModule,
        SharedModule
    ],
    declarations: [DashboardComponent]
})
export class DashboardModule {
}
