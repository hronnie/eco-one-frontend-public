import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {StudentComponent} from "./student.component";


const routes: Routes = [
    {
        path: '',
        component: StudentComponent,
        data: {
            title: $localize`Kezdőlap`
        }
    }
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class StudentRoutingModule {
}
