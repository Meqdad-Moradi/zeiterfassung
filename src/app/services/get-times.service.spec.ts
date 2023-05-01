import { TestBed } from '@angular/core/testing';

import { GetTimesService } from './get-times.service';
import {
  MAT_SNACK_BAR_DATA,
  MatSnackBarModule,
  MatSnackBarRef,
} from '@angular/material/snack-bar';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';

describe('GetTimesService', () => {
  let service: GetTimesService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [MatSnackBarModule],
      providers: [
        { provide: MatSnackBarRef, useValue: {} },
        { provide: MAT_DIALOG_DATA, useValue: {} },
        { provide: MatSnackBarRef, useValue: {} },
        { provide: MAT_SNACK_BAR_DATA, useValue: {} },
      ],
    });
    service = TestBed.inject(GetTimesService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
