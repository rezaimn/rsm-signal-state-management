import { TestBed } from '@angular/core/testing';

import { RsmLibService } from './rsm-lib.service';

describe('RsmLibService', () => {
  let service: RsmLibService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(RsmLibService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
