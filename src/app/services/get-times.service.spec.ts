import { TestBed } from '@angular/core/testing';

import { GetTimesService } from './get-times.service';

describe('GetTimesService', () => {
  let service: GetTimesService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(GetTimesService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
