import { Injectable } from '@angular/core';
import * as moment from 'moment';
import { ITimes, ITotalHoursAndMins } from '../modules/times';

@Injectable({
  providedIn: 'root',
})
export class GetTimesService {
  private readonly startKey = 'startTimes';
  private readonly endKey = 'endTimes';
  private startTimes: any[] = [];
  private endTimes: any[] = [];

  constructor() {
    this.loadTimesFromStorage();
  }

  /**
   * loadTimesFromStorage
   */
  private loadTimesFromStorage(): void {
    const storedStartTimes = localStorage.getItem(this.startKey);
    const storedEndTimes = localStorage.getItem(this.endKey);

    if (storedStartTimes) {
      this.startTimes = JSON.parse(storedStartTimes).map(
        (time: string) => new Date(time)
      );
    }

    if (storedEndTimes) {
      this.endTimes = JSON.parse(storedEndTimes).map(
        (time: string) => new Date(time)
      );
    }
  }

  /**
   * addCurrentTime
   */
  addCurrentTime(): void {
    const now = moment(new Date());
    this.startTimes.push(now);
    localStorage.setItem(this.startKey, JSON.stringify(this.startTimes));
  }

  /**
   * addEndtime
   */
  addEndTime(): void {
    const now = moment(new Date());
    this.endTimes.push(now);
    localStorage.setItem(this.endKey, JSON.stringify(this.endTimes));
  }

  /**
   *
   * @returns getTimes
   */
  getTimes(): ITimes {
    return { startTimes: this.startTimes, endTimes: this.endTimes };
  }

  /**
   * getTotalHoursMinutes
   * @param dates dates
   * @returns sum of hours and minutes
   */
  getTotalHoursMinutes(): ITotalHoursAndMins {
    const arr = this.startTimes
      .map((date, index) => {
        const endTime = this.endTimes[index];
        if (!moment.isMoment(date) || !moment.isMoment(endTime)) {
          console.log('undefined');
          return null; // handle invalid dates
        }
        const duration = moment.duration(endTime.diff(date));
        const hour = duration.asHours();
        const mins = duration.asMinutes() % 60;
        return { hour: Math.floor(hour), mins: Math.floor(mins) };
      })
      .filter((time) => time !== null); // filter out invalid dates

    const total = arr.reduce<ITotalHoursAndMins>(
      (acc, cur) => {
        acc.hour += cur?.hour ?? 0;
        acc.mins += cur?.mins ?? 0;
        return acc;
      },
      { hour: 0, mins: 0 }
    );

    const totalHours = total.hour + Math.floor(total.mins / 60);
    const totalMins = total.mins % 60;

    return { hour: totalHours, mins: totalMins };
  }
}
