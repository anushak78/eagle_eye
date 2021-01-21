import { TestBed } from '@angular/core/testing';

import { ProctorDetailsService } from './proctor-details.service';

describe('ProctorDetailsService', () => {
  let service: ProctorDetailsService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ProctorDetailsService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
