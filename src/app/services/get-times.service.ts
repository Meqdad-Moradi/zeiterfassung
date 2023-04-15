import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class GetTimesService {
  private storageKey = 'times';
  private times: string[] = [];

  constructor() {
    this.loadTimesFromStorage();
  }

  private loadTimesFromStorage(): void {
    const storedTimes = localStorage.getItem(this.storageKey);
    if (storedTimes) {
      this.times = JSON.parse(storedTimes);
    }
  }

  private saveTimesToStorage(): void {
    localStorage.setItem(this.storageKey, JSON.stringify(this.times));
  }

  public addCurrentTime(): void {
    const now = new Date();
    const time = `${now.getHours().toString().padStart(2, '0')}:${now
      .getMinutes()
      .toString()
      .padStart(2, '0')}`;
    this.times.push(time);
    this.saveTimesToStorage();
  }

  public getTimes(): string[] {
    return this.times;
  }

  public getTotalHours(): number {
    let totalHours = 0;
    for (const time of this.times) {
      const [hours, minutes] = time
        .split(':')
        .map((value) => parseInt(value, 10));
      totalHours += hours + minutes / 60;
    }
    return totalHours;
  }
}
