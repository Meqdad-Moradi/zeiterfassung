import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class GetTimesService {
  private timeWorkedToday = 0;
  private timeWorkedThisMonth = 0;

  constructor(private http: HttpClient) {
    this.timeWorkedToday =
      parseInt(localStorage.getItem('timeWorkedToday')!) || 0;
    this.timeWorkedThisMonth =
      parseInt(localStorage.getItem('timeWorkedThisMonth')!) || 0;
  }

  fetchTime(): Observable<any> {
    return this.http.get('./assets/data.json');
  }

  addTime(time: number): void {
    this.timeWorkedToday += time;
    this.timeWorkedThisMonth += time;
    localStorage.setItem('timeWorkedToday', this.timeWorkedToday.toString());
    localStorage.setItem(
      'timeWorkedThisMonth',
      this.timeWorkedThisMonth.toString()
    );
  }

  getTimeToday(): number {
    return this.timeWorkedToday;
  }

  getTimeThisMonth(): number {
    return this.timeWorkedThisMonth;
  }
}
