import {NgModule} from '@angular/core';
import {StudentRoutingModule} from "./student-routing.module";
import {StudentComponent} from "./student.component";
import {SharedModule} from "../../shared/shared.module";
import {ModalModule} from "@coreui/angular-pro";


@NgModule({
    imports: [
        StudentRoutingModule,
        SharedModule,
        ModalModule
    ],
    declarations: [
        StudentComponent,
    ]
})
export class StudentModule {
}
