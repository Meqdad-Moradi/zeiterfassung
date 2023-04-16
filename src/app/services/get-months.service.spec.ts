import { TestBed } from '@angular/core/testing';

import { GetMonthsService } from './get-months.service';

describe('GetMonthsService', () => {
  let service: GetMonthsService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(GetMonthsService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
