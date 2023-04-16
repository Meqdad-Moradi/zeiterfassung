import { Component, OnInit } from '@angular/core';
import * as moment from 'moment';
import { GetTimesService } from 'src/app/services/get-times.service';

@Component({
  selector: 'app-result',
  templateUrl: './result.component.html',
  styleUrls: ['./result.component.scss'],
})
export class ResultComponent implements OnInit {
  totalTimes!: any;
  constructor(private getTimesService: GetTimesService) {}

  ngOnInit(): void {
    this.getTimesService.getTotalHoursMinutes();

    /////////////////////////////////////////////////////

    // const date1 = [
    //   moment('2023-04-16T08:30:45'),
    //   moment('2023-04-16T12:30:45'),
    //   moment('2023-04-16T08:30:45'),
    //   moment('2023-04-16T12:30:45'),
    //   moment('2023-04-16T08:30:45'),
    //   moment('2023-04-16T12:30:45'),
    //   moment('2023-04-16T08:30:45'),
    //   moment('2023-04-16T12:30:45'),
    //   moment('2023-04-16T08:30:45'),
    // ];

    // const date2 = [
    //   moment('2023-04-16T12:00:45'),
    //   moment('2023-04-16T17:30:45'),
    //   moment('2023-04-16T12:00:45'),
    //   moment('2023-04-16T17:30:45'),
    //   moment('2023-04-16T12:00:45'),
    //   moment('2023-04-16T17:30:45'),
    //   moment('2023-04-16T12:00:45'),
    //   moment('2023-04-16T17:30:45'),
    //   moment('2023-04-16T13:00:45'),
    // ];

    // const arr = date1.map((date, index) => {
    //   const duration = moment.duration(date2[index].diff(date));
    //   const hour = duration.asHours();
    //   const mins = duration.asMinutes() % 60;
    //   return { hour: Math.floor(hour), mins: Math.floor(mins) };
    // });

    // const total = arr.reduce(
    //   (acc, cur) => {
    //     acc.hour += cur.hour;
    //     acc.mins += cur.mins;
    //     return acc;
    //   },
    //   { hour: 0, mins: 0 }
    // );

    // const totalHour = total.hour + Math.floor(total.mins / 60);
    // const totalMins = total.mins % 60;
  }
}
