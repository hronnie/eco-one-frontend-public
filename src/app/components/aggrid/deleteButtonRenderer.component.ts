import { Component } from "@angular/core";
import { ICellRendererAngularComp } from "ag-grid-angular";

@Component({
    selector: 'button-renderer',
    template: `<button cButton color="danger" (click)="onClick($event)">Törlés</button>`,
    styleUrls: ['deleteButtonRenderer.component.scss']
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
            this.params.onClick(this.params);
        }
    }
}
