import { Component, AfterViewInit, ViewChild, ElementRef } from '@angular/core';
import { ICellEditorAngularComp } from 'ag-grid-angular';

@Component({
    selector: 'date-picker-input',
    template: `<input #input type="date" class="form-control" (keydown)="onKeyDown($event)">`
})
export class DatePickerInputComponent implements ICellEditorAngularComp, AfterViewInit {
    private params: any;

    @ViewChild('input') inputElement: ElementRef | undefined;

    agInit(params: any): void {
        this.params = params;
    }

    ngAfterViewInit() {
        // @ts-ignore
        this.inputElement.nativeElement.focus();
        // @ts-ignore
        this.inputElement.nativeElement.select();
    }

    getValue(): any {
        // @ts-ignore
        return this.inputElement.nativeElement.value;
    }

    isPopup(): boolean {
        return false;
    }

    onKeyDown(event: any): void {
        if (!this.isKeyPressedNumeric(event)) {
            if (event.preventDefault) event.preventDefault();
        }
    }

    private isKeyPressedNumeric(event: any): boolean {
        switch (event.keyCode) {
            case 32: // space
            case 27: // escape
            case 37: // left
            case 39: // right
            case 38: // up
            case 40: // down
                return false;
            default:
                return true;
        }
    }
}
