// button-renderer.component.ts
import { Component } from "@angular/core";
import { ICellRendererAngularComp } from "ag-grid-angular";
import { ICellRendererParams, IAfterGuiAttachedParams } from "ag-grid-community";

@Component({
    selector: 'button-renderer',
    template: `<button cButton color="danger" (click)="onClick($event)">Törlés</button>`
})
export class DeleteButtonRendererComponent implements ICellRendererAngularComp {
    params: any;
    label: string | undefined;

    agInit(params: any): void {
        this.params = params;
        this.label = this.params.label || null;
    }

    refresh(params: any): boolean {
        return true;
    }

    onClick($event: any) {
        if (this.params.onClick instanceof Function) {
            // Put anything into params you need to pass on to the parent component
            this.params.onClick(this.params);
        }
    }
}
