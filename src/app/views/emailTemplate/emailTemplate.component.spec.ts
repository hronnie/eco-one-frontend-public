import {ComponentFixture, TestBed} from '@angular/core/testing';

import {CardBodyComponent, CardComponent, CardHeaderComponent} from '@coreui/angular-pro';
import {EmailTemplateComponent} from "./emailTemplate.component";

describe('EmailTemplateComponent', () => {
    let component: EmailTemplateComponent;
    let fixture: ComponentFixture<EmailTemplateComponent>;

    beforeEach(async () => {
        await TestBed.configureTestingModule({
            declarations: [EmailTemplateComponent, CardComponent, CardHeaderComponent, CardBodyComponent]
        })
            .compileComponents();
    });

    beforeEach(() => {
        fixture = TestBed.createComponent(EmailTemplateComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });
});
