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
import {DatePickerInputComponent} from "../../components/aggrid/datePickerInput.component";
import {DatePipe} from "@angular/common";

@Component({
    templateUrl: 'completed-training.component.html',
    styleUrls: ['completed-training.component.scss']
})
export class CompletedTrainingComponent implements OnInit {
    searchControl = new FormControl();
    public modules: any[] = [AllCommunityModules];
    centerCode: string | null = null;
    members: Member[] = [];
    trainings: Training[] = [];
    isMemberSelected = false;
    selectedMemberName = '';
    selectedMemberEmail = '';
    selectedTraining: string = '';
    selectedDate: string = '';

    isDeleteSuccessful = false;
    isDeleteFailed = false;
    isEditSuccessful = false;
    isEditFailed = false;
    isCreateSuccessful = false;
    isCreateFailed = false;

    trainingNameMap: Map<string, string> = new Map<string, string>();


    // AG GRID START
    frameworkComponents: any;
    rowData: CompletedTrainingView[] = [];
    public gridApi: any;
    columnDefs = [
        { field: 'trainingName', headerName: 'Tanfolyam', editable: false },
        {
            headerName: 'Ideje',
            field: 'completionDate',
            cellRenderer: (data: any) => {
                return this.datePipe.transform(data.value, 'yyyy-MM-dd');
            },
            cellEditor: 'datePickerInput',
            editable: true
        },
        {
            headerName: '',
            field: 'delete',
            cellRenderer: 'buttonRenderer',
            cellRendererParams: {
                onClick: this.deleteCompletedTraining.bind(this),
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
        onGridReady: (params) => {
            // @ts-ignore
            this.gridOptions.api.sizeColumnsToFit();
        },
        onCellValueChanged: (event) => {
            this.updateCompletedDate(event);
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

    ngOnInit() {
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

    selectMember(member: Member) {
        this.isMemberSelected = true;
        this.selectedMemberName = member.name;
        this.selectedMemberEmail = member.email;
        this.loadCompletedTrainings();
    }

    loadCompletedTrainings(): void {
        if (this.centerCode === null) {
            return;
        }
        this.completedTrainingService.getCompletedTraining(this.centerCode, this.selectedMemberEmail)
            .subscribe(completedTrainings => {
                this.rowData = this.convertToView(completedTrainings);
            });
    }

    convertToView(completedTrainings: CompletedTraining[]): CompletedTrainingView[] {
        const trainingMap: { [code: string]: Training } = {};
        this.trainings.forEach(training => {
            trainingMap[training.code] = training;
        });

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

    onFirstDataRendered(params: any) {
        params.api.sizeColumnsToFit();
    }

    addTraining() {
        this.isCreateSuccessful = false;
        this.isCreateFailed = false;
        if (this.selectedTraining && this.selectedDate && this.centerCode) {
            const formattedDate = this.datePipe.transform(this.selectedDate, 'yyyy-MM-dd');
            if (!formattedDate) {
                return;
            }
            this.completedTrainingService.addTraining(this.centerCode, this.selectedTraining, this.selectedMemberEmail, formattedDate).subscribe({
                next: response => {
                        this.loadCompletedTrainings();
                        this.isCreateSuccessful = true;
                    },
                error: error => {
                    this.isCreateFailed = true;
                }
        });
        } else {
            this.isCreateFailed = true;
        }
    }

    updateCompletedDate(event: CellValueChangedEvent<any>) {
        this.isEditSuccessful = false;
        this.isEditFailed = false;
        if (!this.centerCode) {
            return;
        }
        if (event.newValue !== event.oldValue) {
            let updatedCompletedTraining = {...event.data};
            updatedCompletedTraining[event.column?.getColId()] = event.newValue;
            this.completedTrainingService.updateTraining(this.centerCode, this.trainingNameMap.get(updatedCompletedTraining?.trainingName) || '', updatedCompletedTraining.email, updatedCompletedTraining.completionDate).subscribe({
                next: (response) => {
                    this.isEditSuccessful = true;
                    console.log("Completed training updated successfully");
                },
                error: (error) => {
                    this.isEditFailed = true;
                    console.error("Error updating Completed training: ", error);
                }
            });
        }
    }

    deleteCompletedTraining(params: any) {
        this.isDeleteSuccessful = false;
        this.isDeleteFailed = false;
        if (this.centerCode === null) {
            this.isDeleteFailed = true;
            return;
        }
        this.completedTrainingService.deleteTraining(this.centerCode, this.trainingNameMap.get(params?.data?.trainingName) || '', this.selectedMemberEmail).subscribe({
            next: (response) => {
                this.isDeleteSuccessful = true;
                this.rowData = this.rowData.filter(training => training?.trainingName !== params?.data?.trainingName);
            },
            error: (error) => {
                this.isDeleteFailed = true;
                console.error("Error deleting member: ", error);
            }
        });
    }
}
