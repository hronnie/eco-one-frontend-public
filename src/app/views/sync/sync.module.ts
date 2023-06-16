import {NgModule} from '@angular/core';
import {SyncRoutingModule} from "./sync-routing.module";
import {SyncComponent} from "./sync.component";
import {SharedModule} from "../../shared/shared.module";


@NgModule({
    imports: [
        SyncRoutingModule,
        SharedModule
    ],
    declarations: [SyncComponent]
})
export class SyncModule {
}
