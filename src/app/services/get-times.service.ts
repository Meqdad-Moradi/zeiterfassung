import { Injectable } from '@angular/core';
import * as moment from 'moment';
import { ITime, ITotalHoursAndMins } from '../modules/times';

@Injectable({
  providedIn: 'root',
})
export class GetTimesService {
  private times: ITime[] = [];
  private prevtime: string = '';
  private readonly storeKey = 'timeTracking';

  constructor() {
    this.loadTimesFromStorage();
  }

  /**
   * check if the austragen button is clicked
   */
  isTimeStoped(): boolean {
    return this.times[this.times.length - 1].endTime === '';
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
    const now = moment().format();
    this.prevtime = now;
    const id = Math.random() * 10000;
    let timeData: ITime = { id, startTime: now, endTime: '' };
    this.times.push(timeData);
    localStorage.setItem(this.storeKey, JSON.stringify(this.times));
  }

  /**
   * addEndtime
   */
  addEndTime(): void {
    const now = moment().format();
    const startedTime: ITime = this.times.find(
      (time) => time.startTime === this.prevtime
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
   *  getTotalHoursMinutes
   * @returns total hours and mins
   */
  getTotalHoursMinutes(): ITotalHoursAndMins {
    const arr = this.times
      .map((date: ITime, index) => {
        // const endTime = this.endTimes[index];

        const startTime = moment(date.startTime);
        const endTime = moment(date.endTime);

        if (!moment.isMoment(date) || !moment.isMoment(endTime)) {
          return null; // handle invalid dates
        }

        const duration = moment.duration(endTime.diff(startTime));

        const hour = duration.asHours();
        const mins = duration.asMinutes() % 60;

        console.log({ hour: Math.floor(hour), mins: Math.floor(mins) });

        return { hour: Math.floor(hour), mins: Math.floor(mins) };
      })
      .filter((time) => time !== null); // filter out invalid dates

    const total = arr.reduce<ITotalHoursAndMins>(
      (acc, cur) => {
        if (cur) {
          acc.hour += cur?.hour ?? 0;
          acc.mins += cur?.mins ?? 0;
        }
        return acc;
      },
      { hour: 0, mins: 0 }
    );

    const totalHours = total.hour + Math.floor(total.mins / 60);
    const totalMins = total.mins % 60;

    return { hour: totalHours, mins: totalMins };
  }
}
