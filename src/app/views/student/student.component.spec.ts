import {ComponentFixture, TestBed} from '@angular/core/testing';

import {CardBodyComponent, CardComponent, CardHeaderComponent} from '@coreui/angular-pro';
import {StudentComponent} from "./student.component";

describe('StudentComponent', () => {
    let component: StudentComponent;
    let fixture: ComponentFixture<StudentComponent>;

    beforeEach(async () => {
        await TestBed.configureTestingModule({
            declarations: [StudentComponent, CardComponent, CardHeaderComponent, CardBodyComponent]
        })
            .compileComponents();
    });

    beforeEach(() => {
        fixture = TestBed.createComponent(StudentComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });
});
