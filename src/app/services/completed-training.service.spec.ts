import {TestBed} from '@angular/core/testing';

import {CompletedTrainingService} from './completed-training.service';

describe('CompletedTrainingService', () => {
    let service: CompletedTrainingService;

    beforeEach(() => {
        TestBed.configureTestingModule({});
        service = TestBed.inject(CompletedTrainingService);
    });

    it('should be created', () => {
        expect(service).toBeTruthy();
    });
});
