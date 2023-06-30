import {Component, OnInit} from '@angular/core';
import {MailchimpSyncService} from "../../services/mailchimp-sync.service";
import {LOCAL_STORAGE_KEY_CENTER_CODE} from "../../constants/localStorageKeys.constant";
import {TrainingService} from "../../services/training.service";
import {Training} from "../../interfaces/training.model";

@Component({
    templateUrl: 'sync.component.html',
    styleUrls: ['sync.component.scss']
})
export class SyncComponent implements OnInit {

    centerCode: string | null = null;
    isSyncSuccessful = false;
    isSyncFailed = false;
    isLoading = false;
    selectedDate: string = '';
    selectedTraining: string = '';
    trainings: Training[] = [];
    trainingNameMap: Map<string, string> = new Map<string, string>();

    constructor(private mailchimpoSyncService: MailchimpSyncService,
                private trainingService: TrainingService) {
    }

    ngOnInit(): void {
        this.centerCode = localStorage.getItem(LOCAL_STORAGE_KEY_CENTER_CODE);
        this.trainingService.getAllTrainings().subscribe(trainings => {
            this.trainings = trainings.sort((a: any, b: any) => a.id - b.id);
            this.trainings.forEach(training => {
                this.trainingNameMap.set(training.name, training.code);
            });
        });
    }

    handleMailchimpSync() {
        if (this.centerCode == null) {
            return;
        }
        this.isLoading = true;
        this.mailchimpoSyncService.doMailchimpSync(this.centerCode, this.selectedDate, this.selectedTraining).subscribe({
            next: response => {
                this.isSyncSuccessful = true;
                this.isLoading = false;
            },
            error: err => {
                this.isLoading = false;
                this.isSyncFailed = true;
                console.error(err);
            }
        });
    }
}
