import {Component, OnInit} from '@angular/core';
import {MemberService} from "../../services/member.service";
import {CenterService} from "../../services/center.service";
import {LOCAL_STORAGE_KEY_CENTER_CODE, LOCAL_STORAGE_KEY_USERNAME} from "../../constants/localStorageKeys.constant";
import {Member} from "../../interfaces/member.model";
import { GridOptions } from 'ag-grid-community';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import {DeleteButtonRendererComponent} from "../../components/aggrid/deleteButtonRenderer.component";


@Component({
    templateUrl: 'student.component.html',
    styleUrls: ['student.component.scss']
})
export class StudentComponent implements OnInit{

    allStudents: Member[] = [];
    rowData: Member[] = [];
    newMemberForm: FormGroup | undefined;

    newMember: Partial<Member> = {};
    frameworkComponents: any;

    constructor(private memberService: MemberService,
                private centerService: CenterService) {
        this.frameworkComponents = {
            buttonRenderer: DeleteButtonRendererComponent, // specify your ButtonRendererComponent
        }
    }

    ngOnInit(): void {
        this.newMemberForm = new FormGroup({
            'name': new FormControl(null, [Validators.required, Validators.minLength(5), Validators.maxLength(100)]),
            'email': new FormControl(null, [Validators.required, Validators.email, Validators.maxLength(100)]),
            'mobile': new FormControl(null, [Validators.required, Validators.pattern('^[0-9+]+$')]),
            'notes': new FormControl(null, [Validators.maxLength(200)]),
        });

        const currentUser: string | null = localStorage.getItem(LOCAL_STORAGE_KEY_USERNAME);
        const centerCode: string | null = localStorage.getItem(LOCAL_STORAGE_KEY_CENTER_CODE);
        if (centerCode === null) {
            return;
        }
        if (currentUser !== null) {
            this.memberService.getAllMembers(centerCode).subscribe(
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

    addNewMember() {
        if (this.newMemberForm === undefined) {
            return;
        }
        this.rowData.push(this.newMemberForm.value);
        this.newMemberForm.reset();
    }

    columnDefs = [
        { field: 'name', headerName: 'Név', editable: true },
        { field: 'email', headerName: 'Email', editable: true },
        { field: 'mobile', headerName: 'Telefon', editable: true },
        { field: 'notes', headerName: 'Megjegyzés', editable: true },
        {
            headerName: '',
            field: 'delete',
            cellRenderer: 'buttonRenderer',  // use the name (alias) you specified in frameworkComponents
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
            // handle the cell value change
            console.log(event);
        },
        onFirstDataRendered(params) {
            params.api.sizeColumnsToFit();
        },
    };

    deleteMember(params: any) {
        const idToDelete = params.data.id;

        // call your service method to delete the member on the server
        this.memberService.deleteMember('amitabha', idToDelete).subscribe(
            response => {
                // on success, remove the member from the local array
                this.rowData = this.rowData.filter(member => member?.email !== idToDelete);
            },
            error => {
                console.error("Error deleting member: ", error);
            }
        );
    }


    onFirstDataRendered(params: any) {
        params.api.sizeColumnsToFit();
    }
}
