import {ComponentFixture, TestBed} from '@angular/core/testing';

import {CardBodyComponent, CardComponent, CardHeaderComponent} from '@coreui/angular-pro';
import {CompletedTrainingcomponent} from "./completedTraining.component";

describe('CompletedTrainingComponent', () => {
    let component: CompletedTrainingcomponent;
    let fixture: ComponentFixture<CompletedTrainingcomponent>;

    beforeEach(async () => {
        await TestBed.configureTestingModule({
            declarations: [CompletedTrainingcomponent, CardComponent, CardHeaderComponent, CardBodyComponent]
        })
            .compileComponents();
    });

    beforeEach(() => {
        fixture = TestBed.createComponent(CompletedTrainingcomponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });
});
