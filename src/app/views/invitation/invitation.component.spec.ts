import {ComponentFixture, TestBed} from '@angular/core/testing';

import {CardBodyComponent, CardComponent, CardHeaderComponent} from '@coreui/angular-pro';
import {InvitationComponent} from "./invitation.component";

describe('InvitationComponent', () => {
    let component: InvitationComponent;
    let fixture: ComponentFixture<InvitationComponent>;

    beforeEach(async () => {
        await TestBed.configureTestingModule({
            declarations: [InvitationComponent, CardComponent, CardHeaderComponent, CardBodyComponent]
        })
            .compileComponents();
    });

    beforeEach(() => {
        fixture = TestBed.createComponent(InvitationComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });
});
