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
    // get all times from get time service
    this.times = this.getTimesService.getTimes();

    // Check if the times have started
    // this.timeStarted = this.getTimesService.isTimeStoped() === true;

    // Set the selected month to the current month
    const currentMonthNum = moment().month().toString();
    this.monthSubscription = this.getMonthsService
      .fetchMonths()
      .pipe(
        tap((months) => {
          this.months = months;
          this.selectedMonth = months[currentMonthNum];
        })
      )
      .subscribe();
  }

  /**
   * startTime
   */
  startTime(): void {
    this.getTimesService.addStartTime();
    this.times = this.getTimesService.getTimes();
    this.timeStarted = false;
  }

  /**
   * endTime
   */
  endTime(): void {
    this.getTimesService.addEndTime();
    this.times = this.getTimesService.getTimes();
    this.timeStarted = !this.timeStarted;
  }

  // calculateAllTimes(allTimes: any) {
  //   const endTimesArr = allTimes.endTimes.map((item: string) => ({
  //     endTime: item,
  //   }));
  //   const startTimesArr = allTimes.startTimes.map((item: string) => ({
  //     startTime: item,
  //   }));

  //   this.allTimes = [...startTimesArr, ...endTimesArr];
  // }

  ngOnDestroy(): void {
    this.monthSubscription.unsubscribe();
  }
}
