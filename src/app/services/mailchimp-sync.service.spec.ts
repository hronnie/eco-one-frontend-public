import {TestBed} from '@angular/core/testing';

import {MailchimpSyncService} from './mailchimp-sync.service';

describe('MailchimpSyncService', () => {
    let service: MailchimpSyncService;

    beforeEach(() => {
        TestBed.configureTestingModule({});
        service = TestBed.inject(MailchimpSyncService);
    });

    it('should be created', () => {
        expect(service).toBeTruthy();
    });
});
