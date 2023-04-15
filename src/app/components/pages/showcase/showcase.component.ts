import { Component, OnInit } from '@angular/core';
import * as moment from 'moment';
import { ITimes } from 'src/app/modules/times';
import { GetTimesService } from 'src/app/services/get-times.service';

@Component({
  selector: 'app-showcase',
  templateUrl: './showcase.component.html',
  styleUrls: ['./showcase.component.scss'],
})
export class ShowcaseComponent implements OnInit {
  times!: ITimes;
  totalHours = 0;
  timeStarted: boolean = false;

  constructor(private getTimesService: GetTimesService) {}

  ngOnInit(): void {
    this.times = this.getTimesService.getTimes();
    this.timeStarted = true;
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

  /**
   * totalTime
   */
  totalTime(): void {
    // extract start time and end time
    const start = moment(JSON.parse(localStorage.getItem('startTime')!));
    const end = moment(JSON.parse(localStorage.getItem('endTime')!));

    const hours = moment(end.diff(start, 'hours', true));
    const minutes = moment(end.diff(start, 'minutes', true) % 60);

    console.log(hours, minutes);
  }
}
