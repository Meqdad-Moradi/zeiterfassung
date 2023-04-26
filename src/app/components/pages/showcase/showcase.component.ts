import { Component, OnDestroy, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import * as moment from 'moment';
import { Subscription } from 'rxjs';
import { tap } from 'rxjs/operators';
import { ITime } from 'src/app/modules/times';
import { GetMonthsService } from 'src/app/services/get-months.service';
import { GetTimesService } from 'src/app/services/get-times.service';
import { EditTimeComponent } from '../../dialogs/edit-time/edit-time.component';
import { IMonth } from 'src/app/modules/month';

@Component({
  selector: 'app-showcase',
  templateUrl: './showcase.component.html',
  styleUrls: ['./showcase.component.scss'],
})
export class ShowcaseComponent implements OnInit, OnDestroy {
  times: ITime[] = [];
  months: IMonth[] = [];
  timeStarted: boolean = false;
  selectedMonth!: string;

  // subscription
  monthSubscription!: Subscription;

  constructor(
    private getTimesService: GetTimesService,
    private getMonthsService: GetMonthsService,
    private dialog: MatDialog
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
          this.selectedMonth = months[currentMonth].id;
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
    this.times = JSON.parse(
      localStorage.getItem(this.getTimesService.storeKey)!
    );
  }

  /**
   * edit time
   * @param id time id
   */
  editTime(id: number): void {
    // find the current time to update
    const currentTime = this.times.filter((item: ITime) => item.id === id);

    // open dialog and pass times to update
    const dialogRef = this.dialog.open(EditTimeComponent, {
      data: currentTime,
    });

    // recive new updated times from dialog
    dialogRef.afterClosed().subscribe((newTime) => {
      if (!newTime && newTime === undefined) return;

      // return if times array is empty
      if (this.times.length) {
        const time: ITime = this.times.find((item) => item.id === newTime.id)!;

        // find old start & end times
        const currentStartTime = time?.startTime.split('T')[1].slice(0, 5);
        const currentEndTime = time?.endTime.split('T')[1].slice(0, 5);

        // replace old with new times
        const updatedStartTime =
          time && time.startTime.replace(currentStartTime!, newTime.startTime);
        const updatedEndTime =
          time && time.endTime.replace(currentEndTime!, newTime.endTime);

        // create a new object from new times
        const updatedTime = {
          ...time,
          startTime: updatedStartTime,
          endTime: updatedEndTime,
        };

        // update the times array with new value (start and new times)
        const findIndex = this.times.indexOf(time);
        this.times[findIndex] = updatedTime;

        // store again new times array in to local storage
        localStorage.setItem(
          this.getTimesService.storeKey,
          JSON.stringify(this.times)
        );
      }
    });
  }

  ngOnDestroy(): void {
    this.monthSubscription.unsubscribe();
  }
}
