import {ComponentFixture, TestBed} from '@angular/core/testing';

import {CardBodyComponent, CardComponent, CardHeaderComponent} from '@coreui/angular-pro';
import {CompletedTrainingComponent} from "./completed-training.component";

describe('CompletedTrainingComponent', () => {
    let component: CompletedTrainingComponent;
    let fixture: ComponentFixture<CompletedTrainingComponent>;

    beforeEach(async () => {
        await TestBed.configureTestingModule({
            declarations: [CompletedTrainingComponent, CardComponent, CardHeaderComponent, CardBodyComponent]
        })
            .compileComponents();
    });

    beforeEach(() => {
        fixture = TestBed.createComponent(CompletedTrainingComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });
});
