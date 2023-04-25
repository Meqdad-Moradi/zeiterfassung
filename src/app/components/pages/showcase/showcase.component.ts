import { Component, OnDestroy, OnInit } from '@angular/core';
import * as moment from 'moment';
import { Subscription } from 'rxjs';
import { tap } from 'rxjs/operators';
import { ITime } from 'src/app/modules/times';
import { GetMonthsService } from 'src/app/services/get-months.service';
import { GetTimesService } from 'src/app/services/get-times.service';

@Component({
  selector: 'app-showcase',
  templateUrl: './showcase.component.html',
  styleUrls: ['./showcase.component.scss'],
})
export class ShowcaseComponent implements OnInit, OnDestroy {
  times: ITime[] = [];
  months: string[] = [];
  timeStarted: boolean = false;
  selectedMonth!: string;

  // subscription
  monthSubscription!: Subscription;

  constructor(
    private getTimesService: GetTimesService,
    private getMonthsService: GetMonthsService
  ) {}

  ngOnInit(): void {
    // Check if the times have started
    this.timeStarted = this.getTimesService.isTimeStoped() === true;

    // Set the selected month to the current month
    const currentMonth = moment().month();
    this.monthSubscription = this.getMonthsService
      .fetchMonths()
      .pipe(
        tap((months) => {
          this.months = months;
          this.selectedMonth = months[currentMonth];
          this.filterTimes(currentMonth);
        })
      )
      .subscribe();
  }

  filterTimes(month: number): void {
    const allTimes = this.getTimesService.getTimes();
    this.times = allTimes.filter((date) => date.month === month);
  }

  /**
   * startTime
   */
  startTime(): void {
    this.getTimesService.addStartTime();
    this.times = this.getTimesService.getTimes();
    this.timeStarted = true;
  }

  /**
   * endTime
   */
  endTime(): void {
    this.getTimesService.addEndTime();
    this.times = this.getTimesService.getTimes();
    this.timeStarted = !this.timeStarted;
  }

  /**
   * delete time
   * @param time
   */
  deleteTime(id: number): void {
    this.getTimesService.deleteTime(id);
    this.times = JSON.parse(localStorage.getItem('timeTracking')!);
  }

  ngOnDestroy(): void {
    this.monthSubscription.unsubscribe();
  }
}
