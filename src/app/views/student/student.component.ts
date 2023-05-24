import {Component, OnInit} from '@angular/core';
import {MemberService} from "../../services/member.service";
import {CenterService} from "../../services/center.service";
import {LOCAL_STORAGE_KEY_USERNAME} from "../../constants/localStorageKeys.constant";
import {Member} from "../../interfaces/member.model";
import {switchMap} from "rxjs";
import { GridOptions } from 'ag-grid-community';
import { FormGroup, FormControl, Validators } from '@angular/forms';


@Component({
    templateUrl: 'student.component.html',
    styleUrls: ['student.component.scss']
})
export class StudentComponent implements OnInit{

    allStudents: Member[] = [];
    rowData: Member[] = [];
    newMemberForm: FormGroup | undefined;

    newMember: Partial<Member> = {};

    constructor(private memberService: MemberService,
                private centerService: CenterService) {
    }

    ngOnInit(): void {
        this.newMemberForm = new FormGroup({
            'name': new FormControl(null, [Validators.required, Validators.minLength(5), Validators.maxLength(100)]),
            'email': new FormControl(null, [Validators.required, Validators.email, Validators.maxLength(100)]),
            'mobile': new FormControl(null, [Validators.required, Validators.pattern('^[0-9+]+$')]),
            'notes': new FormControl(null, [Validators.maxLength(200)]),
        });

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

    onSubmit() {
        if (this.newMemberForm === undefined) {
            return;
        }
        // Add member to the rowData and reset form here
        this.rowData.push(this.newMemberForm.value);
        this.newMemberForm.reset();
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
