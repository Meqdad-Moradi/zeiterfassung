import { Component, OnInit } from '@angular/core';
import * as moment from 'moment';
import { GetTimesService } from 'src/app/services/get-times.service';

@Component({
  selector: 'app-showcase',
  templateUrl: './showcase.component.html',
  styleUrls: ['./showcase.component.scss'],
})
export class ShowcaseComponent implements OnInit {
  panelOpenState = false;
  startTime!: any;
  endTime!: any;
  timeWorked!: any;
  hours: any;
  minutes: any;

  timeStarted: boolean = false;

  // times: Date[] = [];

  public times: string[] = [];
  public totalHours = 0;

  constructor(private getTimesService: GetTimesService) {}

  ngOnInit(): void {
    this.times = this.getTimesService.getTimes();
    this.totalHours = this.getTimesService.getTotalHours();

    this.totalTime();
  }

  public addTime(): void {
    this.getTimesService.addCurrentTime();
    this.times = this.getTimesService.getTimes();
    this.totalHours = this.getTimesService.getTotalHours();
  }

  /**
   * startTimer
   */
  startTimer() {
    this.startTime = new Date().toString();
    localStorage.setItem('startTime', JSON.stringify(this.startTime));
    this.timeStarted = true;
  }

  /**
   * stopTimer
   */
  stopTimer() {
    this.endTime = new Date().toString();
    this.times = [...this.times, this.endTime];

    localStorage.setItem('endTime', JSON.stringify(this.endTime));
    localStorage.setItem('times', JSON.stringify(this.times));

    this.timeStarted = false;
  }

  /**
   * totalTime
   */
  totalTime(): void {
    // extract start time and end time
    const start = moment(JSON.parse(localStorage.getItem('startTime')!));
    const end = moment(JSON.parse(localStorage.getItem('endTime')!));

    this.hours = moment(end.diff(start, 'hours', true));
    this.minutes = moment(end.diff(start, 'minutes', true) % 60);

    this.timeWorked =
      this.hours.toString().padStart(2, '0') + ':' + this.minutes;

    // array manipulation
    const now = new Date();
    const hour = now.getHours().toString().padStart(2, '0');
    const min = now.getMinutes().toString().padStart(2, '0');

    const result = `${hour}:${min}`;
    console.log(result);
  }
}
