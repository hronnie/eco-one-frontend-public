import { Component, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import { debounceTime, switchMap } from 'rxjs/operators';
import {MemberService} from "../../services/member.service";
import {TrainingService} from "../../services/training.service";
import {CompletedTrainingService} from "../../services/completed-training.service";
import {AllCommunityModules} from "@ag-grid-community/all-modules";

import {LOCAL_STORAGE_KEY_CENTER_CODE} from "../../constants/localStorageKeys.constant";
import {Member} from "../../interfaces/member.model";
import {CompletedTraining} from "../../interfaces/completedTraining.model";
import {CompletedTrainingView} from "../../interfaces/completedTrainingView.model";
import {Training} from "../../interfaces/training.model";
import {CellValueChangedEvent, GridOptions} from "ag-grid-community";
import {DeleteButtonRendererComponent} from "../../components/aggrid/deleteButtonRenderer.component";

@Component({
    templateUrl: 'completedTraining.component.html',
    styleUrls: ['completedTraining.component.scss']
})
export class CompletedTrainingcomponent implements OnInit {
    searchControl = new FormControl();
    public modules: any[] = [AllCommunityModules];
    // modules = AllCommunityModules;
    centerCode: string | null = null;
    members: Member[] = [];
    trainings: Training[] = [];

    // AG GRID START
    frameworkComponents: any;
    rowData: CompletedTrainingView[] = [];
    // public gridApi: any;
    // public gridColumnApi: any;
    columnDefs = [
        // { field: 'trainingName', headerName: 'Tanfolyam', editable: false },
        { field: 'email', headerName: 'Email', editable: false },
        // { field: 'completionDate', headerName: 'Ideje', editable: true },
        // {
        //     headerName: '',
        //     field: 'delete',
        //     cellRenderer: 'buttonRenderer',
        //     cellRendererParams: {
        //         onClick: this.deleteCompletedTraining.bind(this),
        //         label: 'Delete'
        //     },
        //     maxWidth: 120
        // }
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
        onGridReady: (params) => {
            // @ts-ignore
            this.gridOptions.api.sizeColumnsToFit();
        },
        onCellValueChanged: (event) => {
            this.updateCompletedDate(event);
            console.log(event);
        },
        onFirstDataRendered(params) {
            params.api.sizeColumnsToFit();
        },
    };

    // AG GRID END


    constructor(
        private memberService: MemberService,
        private trainingService: TrainingService,
        private completedTrainingService: CompletedTrainingService
    ) {
        this.frameworkComponents = {
            buttonRenderer: DeleteButtonRendererComponent,
        }
    }

    ngOnInit() {
        this.centerCode = localStorage.getItem(LOCAL_STORAGE_KEY_CENTER_CODE);
        this.trainingService.getAllTrainings().subscribe(trainings => {
            this.trainings = trainings;
        });
        if (this.centerCode === null) {
            return;
        }
        this.searchControl.valueChanges.pipe(
            debounceTime(300),
            switchMap((searchTerm) => this.memberService.searchMembers(this.centerCode, searchTerm))
        ).subscribe(members => {
            this.members = members;
        });
    }

    deleteCompletedTraining() {

    }

    selectMember(member: Member) {
        if (this.centerCode === null) {
            return;
        }
        console.log('hello1')
        this.rowData = [
            {
                "center_code": "amitabha",
                "trainingName": "1. Kezdő modul",
                "email": "david.harsfalvi@gmail.com",
                "completionDate": new Date()
            },
            {
                "center_code": "amitabha",
                "trainingName": "2. Alap modul",
                "email": "david.harsfalvi@gmail.com",
                "completionDate": new Date()
            }
        ]
        console.log('hello2')
        // this.completedTrainingService.getCompletedTraining(this.centerCode, member.email)
        //     .subscribe(completedTrainings => {
        //
        //         this.rowData = this.converToView(completedTrainings);
        //         console.log(this.rowData);
        //     });
    }

    converToView(completedTrainings: CompletedTraining[]): CompletedTrainingView[] {
        const trainingMap: { [code: string]: Training } = {};
        this.trainings.forEach(training => {
            trainingMap[training.code] = training;
        });
        // const training = trainingMap[completedTraining.code];

        return completedTrainings.map(completedTraining => {
            const training = trainingMap[completedTraining.code];

            if (!training) {
                throw new Error(`Training not found for code: ${completedTraining.code}`);
            }

            return {
                center_code: completedTraining.center_code,
                trainingName: training.name,
                email: completedTraining.email,
                completionDate: completedTraining.completionDate,
            };
        });
    }

    private updateCompletedDate(event: CellValueChangedEvent<any>) {

    }

    onFirstDataRendered(params: any) {
        params.api.sizeColumnsToFit();
    }
}
