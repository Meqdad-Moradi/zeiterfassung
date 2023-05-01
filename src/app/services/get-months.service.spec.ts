import { TestBed } from '@angular/core/testing';

import { GetMonthsService } from './get-months.service';
import { HttpClientTestingModule } from '@angular/common/http/testing';

describe('GetMonthsService', () => {
  let service: GetMonthsService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
    });
    service = TestBed.inject(GetMonthsService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
