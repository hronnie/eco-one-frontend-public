import {Component, OnInit} from '@angular/core';
import {MemberService} from "../../services/member.service";
import {LOCAL_STORAGE_KEY_CENTER_CODE, LOCAL_STORAGE_KEY_USERNAME} from "../../constants/localStorageKeys.constant";
import {Member} from "../../interfaces/member.model";
import {CellValueChangedEvent, GridOptions} from 'ag-grid-community';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import {DeleteButtonRendererComponent} from "../../components/aggrid/deleteButtonRenderer.component";


@Component({
    templateUrl: 'student.component.html',
    styleUrls: ['student.component.scss']
})
export class StudentComponent implements OnInit{

    centerCode: string | null = null;
    isDeleteSuccessful = false;
    isDeleteFailed = false;
    isEditSuccessful = false;
    isEditFailed = false;
    isCreateSuccessful = false;
    isCreateFailed = false;

    // AG GRID START
    frameworkComponents: any;
    rowData: Member[] = [];
    columnDefs = [
        { field: 'name', headerName: 'Név', editable: true },
        { field: 'email', headerName: 'Email', editable: false },
        { field: 'mobile', headerName: 'Telefon', editable: true },
        { field: 'notes', headerName: 'Megjegyzés', editable: true },
        {
            headerName: '',
            field: 'delete',
            cellRenderer: 'buttonRenderer',
            cellRendererParams: {
                onClick: this.deleteMember.bind(this),
                label: 'Delete'
            },
            maxWidth: 120
        }
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
            this.updateMember(event);
        },
        onFirstDataRendered(params) {
            params.api.sizeColumnsToFit();
        },
    };
    // AG GRID END

    constructor(private memberService: MemberService) {
        this.frameworkComponents = {
            buttonRenderer: DeleteButtonRendererComponent,
        }
    }

    ngOnInit(): void {
        this.centerCode = localStorage.getItem(LOCAL_STORAGE_KEY_CENTER_CODE);
        this.loadMembers();
    }

    loadMembers(): void {
        const currentUser: string | null = localStorage.getItem(LOCAL_STORAGE_KEY_USERNAME);
        if (this.centerCode === null) {
            return;
        }

        if (currentUser === null) {
            return;
        }

        this.memberService.getAllMembers(this.centerCode).subscribe({
            next: (response) => {
                this.rowData = response;
            },
            error: (error) => {
                console.log(error);
            }
        });
    }


    updateMember(event: CellValueChangedEvent) {
        this.isEditSuccessful = false;
        this.isEditFailed = false;
        if (event.newValue !== event.oldValue) {
            let updatedMember = {...event.data};
            updatedMember[event.column?.getColId()] = event.newValue;
            this.memberService.updateMember(updatedMember.center_code, updatedMember.email, updatedMember).subscribe({
                next: (response) => {
                    this.isEditSuccessful = true;
                    console.log("Member updated successfully");
                },
                error: (error) => {
                    this.isEditFailed = true;
                    console.error("Error updating member: ", error);
                }
            });
        }
    }

    deleteMember(params: any) {
        this.isDeleteSuccessful = false;
        this.isDeleteFailed = false;
        const email = params.data.email;
        if (this.centerCode === null) {
            this.isDeleteFailed = true;
            return;
        }
        this.memberService.deleteMember(this.centerCode, email).subscribe({
            next: (response) => {
                this.isDeleteSuccessful = true;
                this.rowData = this.rowData.filter(member => member?.email !== email);
            },
            error: (error) => {
                this.isDeleteFailed = true;
                console.error("Error deleting member: ", error);
            }
        });
    }

    onFirstDataRendered(params: any) {
        params.api.sizeColumnsToFit();
    }

    isCreateFailedSet(value: boolean) {
        this.isCreateFailed = value;
    }

    isCreateSuccessfulSet(value: boolean) {
        this.isCreateSuccessful = value;
    }

    pushNewMemberToRowData(member: Member) {
        this.rowData.push(member);
    }
}
