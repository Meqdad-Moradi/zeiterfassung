import { Component, OnInit, OnDestroy } from '@angular/core';
import * as moment from 'moment';
import { Subscription } from 'rxjs';
import { tap } from 'rxjs/operators';
import { ITimes } from 'src/app/modules/times';
import { GetMonthsService } from 'src/app/services/get-months.service';
import { GetTimesService } from 'src/app/services/get-times.service';

@Component({
  selector: 'app-showcase',
  templateUrl: './showcase.component.html',
  styleUrls: ['./showcase.component.scss'],
})
export class ShowcaseComponent implements OnInit, OnDestroy {
  times!: ITimes;
  timeStarted: boolean = false;
  months: string[] = [];
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

    // check if the times is started to work
    const timeStoped = this.getTimesService.isTimeStoped();
    if (timeStoped) this.timeStarted = true;

    // manipulate the months for searching
    const monthNum = moment().month().toString();
    this.monthSubscription = this.getMonthsService
      .fetchMonths()
      .pipe(
        tap((months) => {
          this.months = months;
          this.selectedMonth = months[monthNum];
        })
      )
      .subscribe();
  }

  /**
   * startTime
   */
  startTime(): void {
    this.getTimesService.addCurrentTime();
    this.times = this.getTimesService.getTimes();
    this.timeStarted = false;
  }

  /**
   * endTime
   */
  endTime(): void {
    this.getTimesService.addEndTime();
    this.timeStarted = !this.timeStarted;
  }

  // /**
  //  * totalTime
  //  */
  // totalTime(): void {
  //   // extract start time and end time
  //   const start = moment(JSON.parse(localStorage.getItem('startTime')!));
  //   const end = moment(JSON.parse(localStorage.getItem('endTime')!));

  //   const hours = moment(end.diff(start, 'hours', true));
  //   const minutes = moment(end.diff(start, 'minutes', true) % 60);

  //   console.log(hours, minutes);
  // }

  ngOnDestroy(): void {
    this.monthSubscription.unsubscribe();
  }
}
