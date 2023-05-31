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
    selectedMembers: Set<Member> = new Set<Member>();
    trainings: Training[] = [];
    selectedTraining: string = '';
    selectedDate: string = '';
    isDeleteSuccessful = false;
    isDeleteFailed = false;
    isCreateSuccessful = false;
    isCreateFailed = false;
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

    deleteMember(params: any) {

    }
    selectMember(member: Member) {
        this.selectedMembers.add(member);
        this.rowData = Array.from(this.selectedMembers);
    }

    selectTraining() {

    }

    onFirstDataRendered(params: any) {
        params.api.sizeColumnsToFit();
    }
}
