import {NgModule} from '@angular/core';
import {StudentRoutingModule} from "./student-routing.module";
import {StudentComponent} from "./student.component";
import {SharedModule} from "../../shared/shared.module";


@NgModule({
    imports: [
        StudentRoutingModule,
        SharedModule
    ],
    declarations: [
        StudentComponent,
    ]
})
export class StudentModule {
}
