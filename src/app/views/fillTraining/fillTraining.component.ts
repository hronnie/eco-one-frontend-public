import {Component, OnInit} from '@angular/core';
import {MemberService} from "../../services/member.service";
import {TrainingService} from "../../services/training.service";
import {CompletedTrainingService} from "../../services/completed-training.service";
import {DatePipe} from "@angular/common";
import {DeleteButtonRendererComponent} from "../../components/aggrid/deleteButtonRenderer.component";
import {DatePickerInputComponent} from "../../components/aggrid/datePickerInput.component";
import {AllCommunityModules} from "@ag-grid-community/all-modules";
import {Member} from "../../interfaces/member.model";
import {Training} from "../../interfaces/training.model";
import {LOCAL_STORAGE_KEY_CENTER_CODE} from "../../constants/localStorageKeys.constant";
import {debounceTime, switchMap} from "rxjs/operators";
import {FormControl} from "@angular/forms";
import {GridOptions} from "ag-grid-community";

@Component({
    templateUrl: 'fillTraining.component.html',
    styleUrls: ['fillTraining.component.scss'],
    providers: [DatePipe]
})
export class FillTrainingComponent implements OnInit {

    public modules: any[] = [AllCommunityModules];
    searchControl = new FormControl();
    isMemberSelected = false;
    centerCode: string | null = null;
    members: Member[] = [];
    trainings: Training[] = [];
    selectedTraining: string = '';
    selectedDate: string = '';
    isSendSuccessful = false;
    isSendFailed = false;
    trainingNameMap: Map<string, string> = new Map<string, string>();

    // AG GRID START
    frameworkComponents: any;
    rowData: Member[] = [];
    columnDefs = [
        { field: 'name', headerName: 'Név', editable: false },
        { field: 'email', headerName: 'Email', editable: false },
        { field: 'mobile', headerName: 'Telefon', editable: false },
        { field: 'notes', headerName: 'Megjegyzés', editable: false },
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

        },
        onFirstDataRendered(params) {
            params.api.sizeColumnsToFit();
        },
    };
    // AG GRID END

    constructor(
        private memberService: MemberService,
        private trainingService: TrainingService,
        private completedTrainingService: CompletedTrainingService,
        private datePipe: DatePipe
    ) {
        this.frameworkComponents = {
            buttonRenderer: DeleteButtonRendererComponent,
            datePickerInput: DatePickerInputComponent,
        }
    }

    ngOnInit(): void {
        this.centerCode = localStorage.getItem(LOCAL_STORAGE_KEY_CENTER_CODE);
        this.trainingService.getAllTrainings().subscribe(trainings => {
            this.trainings = trainings;
            this.trainings.forEach(training => {
                this.trainingNameMap.set(training.name, training.code);
            });
        });
        if (this.centerCode === null) {
            return;
        }
        this.searchControl.valueChanges.pipe(
            debounceTime(500),
            switchMap((searchTerm) => this.memberService.searchMembers(this.centerCode, searchTerm))
        ).subscribe(members => {
            this.isMemberSelected = false;
            this.members = members;
        });
    }

    deleteMember(params: any): void {
        const email = params?.data?.email;
        this.rowData = this.rowData.filter(item => item.email !== email);
    }

    selectMember(member: Member): void {
        this.isMemberSelected = true;
        if (!this.rowData.every(item => item?.email !== member?.email)) {
            return;
        }
        this.rowData = [...this.rowData, member]
    }

    onFirstDataRendered(params: any): void {
        params.api.sizeColumnsToFit();
    }

    onSubmit(): void {
        if (!this.centerCode) {
            return;
        }
        const emailList = this.rowData.map(item => item.email);
        this.completedTrainingService.fillTraining(this.centerCode, this.selectedTraining, emailList, this.selectedDate).subscribe({
            next: response => {
                this.isSendSuccessful = true;
                this.selectedDate = "";
                this.selectedTraining = "";
                this.rowData = [];
            },
            error: error => {
                this.isSendFailed = true;
                console.error(error);
            }
        });
    }
}
