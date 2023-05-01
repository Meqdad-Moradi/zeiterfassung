import { Component, OnInit } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';
import { BehaviorSubject, Observable } from 'rxjs';
import { switchMap } from 'rxjs/operators';
import { IMonth } from 'src/app/modules/month';
import { ITotalTimes } from 'src/app/modules/times';
import { GetMonthsService } from 'src/app/services/get-months.service';
import { GetTimesService } from 'src/app/services/get-times.service';

@Component({
  selector: 'app-result',
  templateUrl: './result.component.html',
  styleUrls: ['./result.component.scss'],
})
export class ResultComponent implements OnInit {
  totalTime$!: Observable<ITotalTimes>;
  readResult$ = new BehaviorSubject<boolean>(false);
  months$!: Observable<IMonth[]>;
  selectedMonth = new Date().getMonth();

  constructor(
    private dialogRef: MatDialogRef<ResultComponent>,
    private monthsService: GetMonthsService,
    private timesService: GetTimesService
  ) {}

  ngOnInit() {
    // Fetch the list of months
    this.months$ = this.monthsService.fetchMonths();
    // Get the total time for the selected month whenever the user clicks the "Read Result" button
    this.totalTime$ = this.readResult$.pipe(
      switchMap(() =>
        this.timesService.getTotalHoursMinutes(this.selectedMonth)
      )
    );
  }

  /**
   * Closes the dialog
   */
  closeDialog() {
    this.dialogRef.close();
  }

  /**
   * Updates the selected month and triggers a fetch for the total time
   * @param month
   */
  onChangeMonth(month: number) {
    this.selectedMonth = month;
    this.readResult$.next(true);
  }
}
