import { TestBed } from '@angular/core/testing';

import { ProctorBatchDetailService } from './proctor-batch-detail.service';

describe('ProctorBatchDetailService', () => {
  let service: ProctorBatchDetailService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ProctorBatchDetailService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
