import {Component, OnInit} from '@angular/core';
import {MailchimpSyncService} from "../../services/mailchimp-sync.service";
import {LOCAL_STORAGE_KEY_CENTER_CODE} from "../../constants/localStorageKeys.constant";

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

    constructor(private mailchimpoSyncService: MailchimpSyncService) {
    }

    ngOnInit(): void {
        this.centerCode = localStorage.getItem(LOCAL_STORAGE_KEY_CENTER_CODE);
    }

    handleMailchimpSync() {
        if (this.centerCode == null) {
            return;
        }
        this.isLoading = true;
        this.mailchimpoSyncService.doMailchimpSync(this.centerCode, this.selectedDate).subscribe({
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
