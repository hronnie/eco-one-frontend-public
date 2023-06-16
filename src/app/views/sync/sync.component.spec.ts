import {ComponentFixture, TestBed} from '@angular/core/testing';

import {CardBodyComponent, CardComponent, CardHeaderComponent} from '@coreui/angular-pro';
import {SyncComponent} from "./sync.component";

describe('EmailTemplateComponent', () => {
    let component: SyncComponent;
    let fixture: ComponentFixture<SyncComponent>;

    beforeEach(async () => {
        await TestBed.configureTestingModule({
            declarations: [SyncComponent, CardComponent, CardHeaderComponent, CardBodyComponent]
        })
            .compileComponents();
    });

    beforeEach(() => {
        fixture = TestBed.createComponent(SyncComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });
});
