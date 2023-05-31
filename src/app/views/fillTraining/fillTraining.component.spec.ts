import {ComponentFixture, TestBed} from '@angular/core/testing';

import {CardBodyComponent, CardComponent, CardHeaderComponent} from '@coreui/angular-pro';
import {FillTrainingComponent} from "./fillTraining.component";

describe('EmailTemplateComponent', () => {
    let component: FillTrainingComponent;
    let fixture: ComponentFixture<FillTrainingComponent>;

    beforeEach(async () => {
        await TestBed.configureTestingModule({
            declarations: [FillTrainingComponent, CardComponent, CardHeaderComponent, CardBodyComponent]
        })
            .compileComponents();
    });

    beforeEach(() => {
        fixture = TestBed.createComponent(FillTrainingComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });
});
