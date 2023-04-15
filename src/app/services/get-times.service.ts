import { Injectable } from '@angular/core';
import * as moment from 'moment';
import { ITimes } from '../modules/times';

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

  public addCurrentTime(): void {
    const now = new Date();
    this.startTimes.push(now);
    localStorage.setItem(this.startKey, JSON.stringify(this.startTimes));
  }

  public addEndTime(): void {
    const now = new Date();
    this.endTimes.push(now);
    localStorage.setItem(this.endKey, JSON.stringify(this.endTimes));
  }

  public getTimes(): ITimes {
    const allTimes = { startTimes: this.startTimes, endTimes: this.endTimes };
    return allTimes;
  }

  public getTotalHours(): any {
    const totalStartTimes = this.startTimes.map((time) => {
      const startTime = moment(time);
      let totalHours = 0;
      let totalMinutes = 0;
  
      this.endTimes.forEach((eTime) => {
        const endTime = moment(eTime);
  
        const diffInMinutes = moment.duration(endTime.diff(startTime)).asMinutes();
        totalHours += Math.floor(diffInMinutes / 60);
        totalMinutes += Math.floor(diffInMinutes % 60);
      });
  
      return { hours: totalHours, minutes: totalMinutes };
    });
  
    return totalStartTimes;
  }
  
}

// const hours = now.getHours().toString().padStart(2, '0');
// const minutes = now.getMinutes().toString().padStart(2, '0');
// const time = `${hours}:${minutes}`;

// return this.startTimes.reduce((totalHours, time) => {
//   const [hours, minutes] = time.split(':').map(Number);
//   return totalHours + hours + minutes / 60;
// }, 0);
