import { Injectable } from '@angular/core';
import * as moment from 'moment';
import { ITime, ITotalTimes } from '../modules/times';
import { Observable, of } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class GetTimesService {
  private times: ITime[] = [];
  private readonly storeKey = 'timeTracking';

  /**
   * constructor
   */
  constructor() {
    this.loadTimesFromStorage();
  }

  /**
   * check if the stop tracking button is clicked
   */
  isTimeStoped(): boolean {
    const endTime =
      this.times.length && this.times[this.times.length - 1].endTime;
    return endTime ? true : false;
  }

  /**
   * loadTimesFromStorage
   */
  private loadTimesFromStorage(): void {
    const storedTimes = localStorage.getItem(this.storeKey);
    if (storedTimes) {
      this.times = JSON.parse(storedTimes);
    }
  }

  /**
   * addCurrentTime
   */
  addStartTime(): void {
    const now = moment();
    const id = Math.random() * 10000;
    let timeData: ITime = {
      id,
      startTime: now.format(),
      month: now.month(),
      endTime: '',
    };
    this.times.push(timeData);
    localStorage.setItem('prevTime', JSON.stringify(now.format()));
    localStorage.setItem(this.storeKey, JSON.stringify(this.times));
  }

  /**
   * addEndtime
   */
  addEndTime(): void {
    const now = moment().format();
    const prevTime = JSON.parse(localStorage.getItem('prevTime')!);

    const startedTime: ITime = this.times.find(
      (time: ITime) => time.startTime === prevTime
    )!;

    startedTime && (startedTime.endTime = now);
    localStorage.setItem(this.storeKey, JSON.stringify(this.times));
  }

  /**
   * getTimes
   * @returns all times
   */
  getTimes(): ITime[] {
    return this.times;
  }

  /**
   * Returns total hours and minutes of stored times
   * @returns hours and minutes
   */
  getTotalHoursMinutes(): Observable<ITotalTimes> {
    // Retrieve stored times from local storage
    const storedTimes = JSON.parse(localStorage.getItem(this.storeKey)!);

    // Calculate hours and minutes for each stored time
    const arr = storedTimes
      .filter((item: ITime) => item.endTime !== '' && item.startTime !== '')
      .map((date: ITime) => {
        // Convert start and end times to moment objects
        const startTime = moment(date.startTime);
        const endTime = moment(date.endTime);

        // Handle invalid dates
        if (!moment.isMoment(startTime) || !moment.isMoment(endTime)) {
          return;
        }

        // Calculate hours and minutes for current time
        const hour = endTime.diff(startTime, 'hours');
        const mins = endTime.diff(startTime, 'minutes') % 60;

        return { hour, mins };
      });

    // Calculate total hours and minutes by reducing the array of stored times
    const total = arr.reduce(
      (acc: any, cur: any) => {
        if (cur) {
          // Add hours and minutes of current time to accumulator
          acc.hour += cur?.hour ?? 0;
          acc.mins += cur?.mins ?? 0;
        }
        return acc;
      },
      { hour: 0, mins: 0 }
    );

    // Convert total minutes to hours and minutes
    const totalHours = total.hour + Math.floor(total.mins / 60);
    const totalMins = total.mins % 60;

    // Return total hours and minutes as an object
    return of({ hour: totalHours, mins: totalMins });
  }

  /**
   * delete time
   * @param time
   */
  deleteTime(id: number): void {
    const filterTimes = this.times.filter((date: ITime) => date.id !== id);
    this.times = filterTimes;
    localStorage.setItem(this.storeKey, JSON.stringify(this.times));
  }
}
