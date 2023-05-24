import {Component, OnInit} from '@angular/core';
import {MemberService} from "../../services/member.service";
import {CenterService} from "../../services/center.service";
import {LOCAL_STORAGE_KEY_USERNAME} from "../../constants/localStorageKeys.constant";
import {Member} from "../../interfaces/member.model";
import {switchMap} from "rxjs";
import { GridOptions } from 'ag-grid-community';

@Component({
    templateUrl: 'student.component.html',
    styleUrls: ['student.component.scss']
})
export class StudentComponent implements OnInit{

    allStudents: Member[] = [];
    rowData: Member[] = [];

    newMember: Partial<Member> = {};

    constructor(private memberService: MemberService,
                private centerService: CenterService) {
    }

    ngOnInit(): void {
        const currentUser: string | null = localStorage.getItem(LOCAL_STORAGE_KEY_USERNAME);
        if (currentUser !== null) {
            this.centerService.getCenterCodeByUsername(currentUser).pipe(
                switchMap(centerCode => this.memberService.getAllMembers(centerCode))
            ).subscribe(
                response => {
                    this.allStudents = response;
                    this.rowData = response;
                    console.table(response);
                },
                error => {
                    console.log(error);
                }
            );
        }
    }

    addMember() {
        const newMemberComplete: any = {
            center_code: 'default', // Add logic to set this correctly
            ...this.newMember
        };
        this.rowData.push(newMemberComplete);
        // @ts-ignore
        this.gridOptions.api.setRowData(this.rowData);
        this.newMember = {};
    }


    columnDefs = [
        { field: 'name', headerName: 'Név', editable: true },
        { field: 'email', headerName: 'Email', editable: true },
        { field: 'mobile', headerName: 'Telefon', editable: true },
        { field: 'notes', headerName: 'Megjegyzés', editable: true },
    ];

    defaultColDef = {
        sortable: true,
        filter: true,
        flex: 1,
        minWidth: 100,
        resizable: true,
    };

    // @ts-ignore
    gridOptions: GridOptions = {
        // Enables excel-like filtering
        enableBrowserTooltips: true,
        suppressCellSelection: false,
        domLayout: 'autoHeight',
        rowSelection: 'multiple',
        suppressRowClickSelection: false,
        // @ts-ignore
        rowDeselection: true,
        enableCellChangeFlash: true,
        pagination: true, // Enable pagination
        paginationPageSize: 10,
        onGridReady: () => {
            // @ts-ignore
            this.gridOptions.api.sizeColumnsToFit();
        },
        onCellValueChanged: (event) => {
            // handle the cell value change
            console.log(event);
        },
        onFirstDataRendered(params) {
            params.api.sizeColumnsToFit();
        },
    };



    onFirstDataRendered(params: any) {
        params.api.sizeColumnsToFit();
    }
}
