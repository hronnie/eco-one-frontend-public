import {NgModule} from '@angular/core';
import {SyncRoutingModule} from "./sync-routing.module";
import {SyncComponent} from "./sync.component";
import {SharedModule} from "../../shared/shared.module";
import {SpinnerModule} from "@coreui/angular-pro";


@NgModule({
    imports: [
        SyncRoutingModule,
        SharedModule,
        SpinnerModule
    ],
    declarations: [SyncComponent]
})
export class SyncModule {
}
